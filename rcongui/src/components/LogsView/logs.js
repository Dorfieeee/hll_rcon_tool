import React from 'react';
import {
  handle_http_errors,
  postData,
  showResponse,
} from '../../utils/fetchUtils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Box, IconButton, Stack, Switch, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import RefreshIcon from '@mui/icons-material/Refresh';
import Paper from '@mui/material/Paper';
import AutoRefreshLine from '../autoRefreshLine';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Log from './log';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      'logs_action_type',
      JSON.parse(localStorage.getItem('logs_action_type'))
    );
    this.state = {
      logs: [],
      actions: [],
      players: [],
      playersFilter: localStorage.getItem('logs_player_filters')
        ? JSON.parse(localStorage.getItem('logs_player_filters'))
        : [],
      actionsFilter: localStorage.getItem('logs_action_filters')
        ? JSON.parse(localStorage.getItem('logs_action_filters'))
        : [],
      inclusiveFilter:
        localStorage.getItem('logs_action_type') !== null
          ? JSON.parse(localStorage.getItem('logs_action_type'))
          : true,
      limit: localStorage.getItem('logs_limit')
        ? localStorage.getItem('logs_limit')
        : 500,
      limitOptions: [
        100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000,
      ],
      highlightLogs: localStorage.getItem('logs_highlight_logs')
        ? localStorage.getItem('logs_highlight_logs') === 'true'
        : false,
    };

    this.loadLogs = this.loadLogs.bind(this);
    this.setActionFilter = this.setActionFilter.bind(this);
    this.setActionsFilterInclusivity =
      this.setActionsFilterInclusivity.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.setHighlightLogs = this.setHighlightLogs.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.loadLogs();
    }, 1000);
  }

  loadLogs() {
    const { actionsFilter, playersFilter, limit, inclusiveFilter } = this.state;

    return postData(`${process.env.REACT_APP_API_URL}get_recent_logs`, {
      end: limit,
      filter_action: actionsFilter,
      filter_player: playersFilter,
      inclusive_filter: inclusiveFilter,
    })
      .then((response) => showResponse(response, 'get_logs'))
      .then((data) => {
        this.setState({
          logs: data.result.logs,
          actions: data.result.actions,
          players: !data.result.players ? [] : data.result.players,
        });
      })
      .catch(handle_http_errors);
  }

  setActionFilter(actionsFilter) {
    this.setState({ actionsFilter }, this.loadLogs);
    localStorage.setItem('logs_action_filters', JSON.stringify(actionsFilter));
  }

  setActionsFilterInclusivity(e) {
    this.setState({ inclusiveFilter: e.target.checked }, this.loadLogs);
    localStorage.setItem('logs_action_type', JSON.stringify(e.target.value));
  }

  setLimit(limit) {
    this.setState({ limit }, this.loadLogs);
    localStorage.setItem('logs_limit', limit);
  }

  setHighlightLogs(highlightLogs) {
    this.setState({ highlightLogs });
    localStorage.setItem('logs_highlight_logs', highlightLogs);
  }

  render() {
    const { isFullScreen, onFullScreen } = this.props;
    const {
      logs,
      players,
      actions,
      actionsFilter,
      limit,
      limitOptions,
      inclusiveFilter,
      playersFilter,
      highlightLogs,
    } = this.state;

    return (
      <Stack>
        {/* HEADER */}
        <Box sx={{ mb: 2 }}>
          <Stack direction={'row'}>
            <Typography variant='h2'>Logs view</Typography>
            <IconButton onClick={onFullScreen} size="large">
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
            <FormControlLabel
              control={
                <Switch
                  checked={highlightLogs}
                  onChange={(e) => this.setHighlightLogs(e.target.checked)}
                  color="primary"
                />
              }
              label="Highlight Logs"
              labelPlacement="top"
            />
            <IconButton
              aria-label='refresh'
              variant="outlined"
              size='large'
              onClick={this.loadLogs}
            >
              <RefreshIcon />
            </IconButton>
          </Stack>
          <Typography variant='subtitle1'>30s auto refresh</Typography>
          <AutoRefreshLine
            intervalFunction={this.loadLogs}
            execEveryMs={30000}
            statusRefreshIntervalMs={500}
          />
        </Box>
        {/* FILTERS & CONTROLS */}
        <Grid container columnSpacing={1} alignItems={'center'}>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id='lines-limit-label'>Lines limit</InputLabel>
              <Select
                labelId='lines-limit-label'
                id='lines-limit-select'
                label='Lines limit'
                value={limit}
                onChange={(e) => this.setLimit(e.target.value)}
                displayEmpty
              >
                {limitOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Autocomplete
              id="filter-by-type"
              multiple
              options={actions}
              value={actionsFilter}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={(e, value) => this.setActionFilter(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter by type"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Autocomplete
              id="filter-by-player"
              multiple
              options={players.sort()}
              value={playersFilter}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={(e, value) => {
                this.setState(
                  { playersFilter: value ? value : '' },
                  this.loadLogs
                );
                if (value) {
                  localStorage.setItem(
                    'logs_player_filters',
                    JSON.stringify(value)
                  );
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter by player"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <FormControlLabel control={<Switch checked={inclusiveFilter} onChange={this.setActionsFilterInclusivity} />} label="Inclusive" labelPlacement='top' />
          </Grid>
        </Grid>
        {/* LOGS */}
        <Paper>
          {logs.map((log) => <Log log={log} />)}
        </Paper>
      </Stack>
    );
  }
}

export default Logs;
