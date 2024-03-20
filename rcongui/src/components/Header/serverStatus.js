import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import { get, handle_http_errors, showResponse } from "../../utils/fetchUtils";
import debounce from "lodash/debounce";
import makeStyles from '@mui/styles/makeStyles';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { fromJS, List } from "immutable";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  truncatedBtn: {
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      whiteSpace: "break-spaces",
      overflowWrap: "anywhere",
      overflow: "visible",
    },
  }
})

const Status = ({
  name,
  nbPlayers,
  map,
  serverList,
  timeRemaining,
  balance,
  score,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid>
      <Grid item>
        <Button className={classes.truncatedBtn} color="inherit" onClick={handleClick}>
          {name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {serverList.map((s) => {
            let link = ""
            if (s.get("link")) {
              link = new URL(`${s.get('link')}${window.location.hash}`)
            } else {
              // Everyone should be setting their server URL, but for locally hosted instances just swap out the port
              const regex = /:(\d+)/gm;
              link = new URL(window.location.href.replace(regex, `:${s.get('port')}`))
            }
            return (
              <MenuItem onClick={handleClose}>
                <Link color="inherit" href={link}>
                  {s.get("name")}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
        <small style={{ display: "block" }}>
          {nbPlayers} ({balance}) - {map} - {timeRemaining} - {score}
        </small>
      </Grid>
    </Grid>
  );
};

class ServerStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nbPlayers: "",
      map: "",
      serverList: List(),
      refreshIntervalSec: 10,
      listRefreshIntervalSec: 30,
      interval: null,
      intervalLoadList: null,
      numAlliedPlayers: 0,
      numAxisPlayers: 0,
      alliedScore: 0,
      axisScore: 0,
      timeRemaining: "0:00:00",
      rawTimeRemaining: "0:00:00",
      currentMap: "",
      nextMap: "",
    };

    this.debouncedLoad = debounce(
      this.load.bind(this),
      this.state.refreshIntervalSec
    );
    this.debouncedLoadList = debounce(
      this.loadServerList.bind(this),
      this.state.listRefreshIntervalSec
    );
    this.debouncedLoadInfo = debounce(
      this.loadInfo.bind(this),
      this.state.listRefreshIntervalSec
    );
  }

  componentDidMount() {
    this.load();
    this.setState({
      interval: setInterval(
        this.debouncedLoad,
        this.state.refreshIntervalSec * 1000
      ),
    });
    this.setState({
      intervalLoadList: setInterval(() => {
        this.debouncedLoadList();
        this.debouncedLoadInfo();
      }, this.state.listRefreshIntervalSec * 1000),
    });
    this.loadServerList();
    this.loadInfo();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    clearInterval(this.state.intervalLoadList);
  }

  async load() {
    return get(`get_status`)
      .then((response) => showResponse(response, "get_status", false))
      .then((data) => {
        this.setState({
          name: data?.result.name,
          map: data?.result.map,
          nbPlayers: data.result.nb_players,
        });
        document.title = `(${data?.result.player_count}) ${data?.result.short_name}`;
      })
      .catch(handle_http_errors);
  }

  async loadInfo() {
    return get(`get_gamestate`)
      .then((response) => showResponse(response, "get_gamestate", false))
      .then((data) => {
        this.setState({
          numAlliedPlayers: data.result.num_allied_players,
          numAxisPlayers: data.result.num_axis_players,
          alliedScore: data.result.allied_score,
          axisScore: data.result.axis_score,
          timeRemaining: data.result.time_remaining,
          rawTimeRemaining: data.result.raw_time_remaining,
          currentMap: data.result.current_map,
          nextMap: data.result.next_map,
        });
      })
      .catch(handle_http_errors);
  }

  async loadServerList() {
    return get(`server_list`)
      .then((response) => showResponse(response, "server_list", false))
      .then((data) => {
        this.setState({
          serverList: fromJS(data.result || []),
        });
      })
      .catch(handle_http_errors);
  }

  render() {
    const {
      map,
      name,
      nbPlayers,
      serverList,
      rawTimeRemaining,
      axisScore,
      alliedScore,
      numAxisPlayers,
      numAlliedPlayers,
    } = this.state;

    return (
      <Status
        name={name}
        nbPlayers={nbPlayers}
        map={map}
        serverList={serverList}
        timeRemaining={rawTimeRemaining}
        score={`${alliedScore}:${axisScore}`}
        balance={`${numAlliedPlayers}vs${numAxisPlayers}`}
      />
    );
  }
}

export default ServerStatus;
