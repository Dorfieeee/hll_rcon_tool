import React from 'react';
import { useStorageState } from '../../hooks/useStorageState';
import { handle_http_errors, postData } from '../../utils/fetchUtils';

import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
  Unstable_Grid2 as Grid,
  Autocomplete,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from '@mui/material';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import RefreshIcon from '@mui/icons-material/Refresh';
import Log from './Log';
import ProgressBar from '../ProgressBar';
import recentLogsResult from '../../dev/test_data/get_recent_logs.json'

const PLAYERS_FILTER = 'logs_player_filters';
const ACTIONS_FILTER = 'logs_action_filters';
const INCLUSIVE_FILTER = 'logs_action_type';
const LOGS_LIMIT = 'logs_limit';
const HIGHLIGHT_LOGS = 'logs_highlight_logs';

const limitOptions = [
  100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000,
];

const interval = 30;
const delay = 3;

// TODO
// Separate logs loading and filtering
// Let the app refresh the logs every x seconds
// and handle the filters in the browser
// There is a new request each time any filter value changes
const LiveLogs = () => {
  const [logs, setLogs] = React.useState([]);
  const [actions, setActions] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const intervalRef = React.useRef(null);
  const delayRef = React.useRef(null);

  // Using custom hook that synchronizes the components state
  // and the browser's local storage
  const [playersFilter, setPlayersFilter] = useStorageState(PLAYERS_FILTER, []);
  const [actionsFilter, setActionsFilter] = useStorageState(ACTIONS_FILTER, []);
  const [inclusiveFilter, setInclusiveFilter] = useStorageState(
    INCLUSIVE_FILTER,
    true
  );
  const [logsLimit, setLogsLimit] = useStorageState(LOGS_LIMIT, 500);
  const [highlighted, setHighlighted] = useStorageState(HIGHLIGHT_LOGS, false);

  const loadLogs = async () => {
    // if anything else apart from the `setInterval` calls this function
    // eg. refresh button, filters change, ...
    // it is necessary to stop the running interval
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    // Clear timeout for the delay
    clearTimeout(delayRef.current);
    delayRef.current = null;

    setLoading(true);
    try {
      const response = await postData(
        `${process.env.REACT_APP_API_URL}get_recent_logs`,
        {
          end: logsLimit,
          filter_action: actionsFilter,
          filter_player: playersFilter,
          inclusive_filter: inclusiveFilter,
        }
      );

      const { logs, actions, players } = recentLogsResult.result;
      // const { logs, actions, players } = (await response.json()).result;

      // UI delay
      await new Promise((res) => setTimeout(res, 750));

      setLogs(logs?.slice(0, logsLimit) ?? []);
      setActions(actions ?? []);
      setPlayers(players ?? []);

      // now the data have been loaded and new interval can be set
      intervalRef.current = setInterval(loadLogs, interval * 1000);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handle_http_errors(error);
    }
  };

  // This runs once the component loads and each time one of the
  // states variables in the dependency array changes
  // The timeout is also cleared inside the `loadLogs` so
  // it does not run twice on the initial render
  React.useEffect(() => {
    clearTimeout(delayRef.current);
    delayRef.current = setTimeout(loadLogs, delay * 1000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(delayRef.current);
    };
  }, [playersFilter, actionsFilter, inclusiveFilter, logsLimit]);

  // Run only and only once
  React.useEffect(loadLogs, []);

  return (
    <Stack>
      {/* HEADER */}
      <Box sx={{ mb: 2 }}>
        <Stack direction={'row'}>
          <Typography variant="h2" sx={{ flexGrow: 1 }}>
            Logs live
          </Typography>
          {/* <FormControlLabel
            control={
              <Switch
                checked={highlighted}
                onChange={(event) => setHighlighted(event.target.checked)}
                color="primary"
              />
            }
            label="Highlight Logs"
            labelPlacement="top"
          /> */}
          <Box>
            <IconButton
              aria-label="refresh"
              variant="outlined"
              size="large"
              onClick={loadLogs}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Stack>
        <Typography variant="subtitle1">{interval}s auto refresh</Typography>
        <ProgressBar interval={interval} loading={loading} />
      </Box>
      {/* FILTERS & CONTROLS */}
      <Grid container columnSpacing={1} alignItems={'center'}>
        <Grid xs={12} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="lines-limit-label">Lines limit</InputLabel>
            <Select
              labelId="lines-limit-label"
              id="lines-limit-select"
              label="Lines limit"
              value={logsLimit}
              onChange={(event) => setLogsLimit(event.target.value)}
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
        <Grid xs={12} lg={3}>
          <Autocomplete
            id="filter-by-type"
            multiple
            options={actions}
            value={actionsFilter}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={(event, value) => setActionsFilter(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Filter by type"
              />
            )}
          />
        </Grid>
        <Grid xs={12} lg={4}>
          <Autocomplete
            id="filter-by-player"
            multiple
            options={players}
            value={playersFilter}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={(event, value) => {
              setPlayersFilter(value ?? '');
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
        <Grid xs={12} lg={2}>
          <FormControlLabel
            control={
              <Switch
                checked={inclusiveFilter}
                onChange={(event) => setInclusiveFilter(event.target.checked)}
              />
            }
            label="Inclusive"
            labelPlacement="top"
          />
        </Grid>
      </Grid>
      {/* LOGS */}
      {logs.length ? (
        <Paper sx={{ p: 1, my: 1 }}>
          {logs.map((log) => (
            <Log log={log} key={log.raw} />
          ))}
        </Paper>
      ) : (
      <Skeleton variant="rectangular" sx={{ height: '100vh' }} />
    )
    }
    </Stack>
  );
};

export default LiveLogs;
