import React from 'react';
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  LinearProgress,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
  ImageListItemBar,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';
import { get, handle_http_errors, showResponse } from '../../utils/fetchUtils';
import { List as iList, Map, fromJS } from 'immutable';
import { getMapImageUrl } from '../Scoreboard/utils';

const useStyles = makeStyles((theme) => ({
  padRight: {
    paddingRight: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  transparentPaper: {
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
    borderRadius: '0px',
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  titleBarTop: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridList: {
    maxWidth: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

const ServerInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [serverState, setServerState] = React.useState(new Map());
  const [isLoading, setIsLoading] = React.useState(true);
  const isXs = useMediaQuery(theme.breakpoints.down('xl'));
  const [mapName, setMapName] = React.useState('');

  const getData = () => {
    setIsLoading(true);

    get('public_info')
      .then((res) => showResponse(res, 'public_info', false))
      .then((data) => setServerState(fromJS(data.result)))
      .then(() => setIsLoading(false))
      .catch(handle_http_errors);
  };

  React.useEffect(getData, []);

  React.useEffect(() => {
    const interval = setInterval(getData, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (serverState.get('current_map') !== undefined) {
      setMapName(serverState.get('current_map').get('name'));
    }
  }, [serverState]);

  let started = serverState.get('current_map', new Map()).get('start');
  started = started
    ? new Date(Date.now() - new Date(started * 1000))
        .toISOString()
        .substr(11, 8)
    : 'N/A';

  const nextMapString = React.useMemo(() => {
    const [map, nbVotes] = serverState
      .get('vote_status')
      ?.get('winning_maps')
      ?.get(0) || ['', 0];
    const totalVotes = serverState.get('vote_status')?.get('total_votes');
    const nextMap = serverState.get('next_map')?.get('name');

    if (map === nextMap) {
      return `Nextmap ${nextMap} ${nbVotes}/${totalVotes} votes`;
    }
    return `Nextmap: ${nextMap}`;
  }, [serverState]);

  return (
    <ImageList cols={1} className={classes.gridList}>
      <ImageListItem>
        <img alt="Map" src={getMapImageUrl(mapName)} />
        <ImageListItemBar
          className={classes.titleBarTop}
          title={serverState.get('name')}
          subtitle={serverState
            .get('current_map', new Map())
            .get('human_name', 'N/A')}
          titlePosition="top"
        />
        <ImageListItemBar
          className={classes.titleBarBottom}
          title={`Time: ${started} - Players: ${serverState.get(
            'player_count'
          )}/${serverState.get('max_player_count')}`}
          subtitle={nextMapString}
          titlePosition="bottom"
        />
      </ImageListItem>
    </ImageList>
  );
};

export default ServerInfo;
