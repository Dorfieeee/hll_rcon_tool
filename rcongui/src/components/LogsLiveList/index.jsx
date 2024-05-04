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

import RefreshIcon from '@mui/icons-material/Refresh';
import Log, { Line } from './Log';
import ProgressBar from '../ProgressBar';
import recentLogsResult from '../../dev/test_data/get_recent_logs.json';
import { useInterval } from '../../hooks/useInterval';

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

const getLogs = (filters) =>
  postData(`${process.env.REACT_APP_API_URL}get_recent_logs`, filters);

// TODO
// Separate logs loading and filtering
// Let the app refresh the logs every x seconds
// and handle the filters in the browser
// There is a new request each time any filter value changes
const LiveLogs = () => {
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

  const fetchLogs = React.useCallback(
    () =>
      getLogs({
        end: logsLimit,
        filter_action: actionsFilter,
        filter_player: playersFilter,
        inclusive_filter: inclusiveFilter,
      }),
    [playersFilter, actionsFilter, inclusiveFilter, logsLimit]
  );

  const { data, loading, refresh } = useInterval(fetchLogs, interval * 1000);

  React.useEffect(refresh, [
    playersFilter,
    actionsFilter,
    inclusiveFilter,
    logsLimit,
  ]);

  const logsResult = React.useMemo(() => {
    let result;
    if (!import.meta.env.DEV) {
      result = data?.result;
    } else {
      result = recentLogsResult?.result;
    }

    if (!result) return {};

    const { logs, actions, players } = result;

    return {
      players,
      actions,
      logs,
    };
  }, [data]);

  const { players = [], actions = [], logs = [] } = logsResult;

  return (
    <Stack>
      {/* FILTERS & CONTROLS */}
      <Grid container columnSpacing={1} alignItems={'center'}>
        <Grid xs={12} lg={2}>
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
        <Grid xs={12} lg={3}>
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
        <Grid xs={12} lg={2}>
          <FormControlLabel
            control={
              <Switch
                checked={highlighted}
                onChange={(event) => setHighlighted(event.target.checked)}
              />
            }
            label="Highlight"
            labelPlacement="top"
          />
        </Grid>
      </Grid>
      {/* LOGS */}
      {logs.length ? (
        <Paper sx={{ p: 1, my: 1 }} className={highlighted && 'highlighted'}>
          <Line
            sx={{
              display: 'inline-flex',
              borderBottom: '1px solid inherit',
              width: '100%',
            }}
            tabIndex={0}
          >
            <Box sx={{ flexBasis: '9.5em' }}>Time</Box>
            <Box sx={{ flexBasis: '16.5em' }}>Action</Box>
            <Box sx={{ flexGrow: 1 }}>Content</Box>
          </Line>
          {logs.map((log, index) => (
            <Log log={log} key={log.raw} />
          ))}
        </Paper>
      ) : (
        <Skeleton variant="rectangular" sx={{ height: '100vh' }} />
      )}
    </Stack>
  );
};

export default LiveLogs;
