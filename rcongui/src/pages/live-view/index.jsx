import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import LogsLiveList from '../../components/LogsLiveList';
import PlayersTable from '../../components/PlayersTable';
import teamViewResult from '../../dev/test_data/get_team_view.json';
import { get } from '../../utils/fetchUtils';
import { useInterval } from '../../hooks/useInterval';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProgressBar from '../../components/ProgressBar';

const interval = 30;

let getTeamView = () => get('get_team_view');

if (import.meta.env.DEV) {
  getTeamView = () =>
    new Promise((res) =>
      setTimeout(() => res(new Response(JSON.stringify(teamViewResult))), 1000)
    );
}

const LiveView = () => {
  const { data, loading, refresh, error } = useInterval(
    getTeamView,
    interval * 1000
  );

  return (
    <Grid container spacing={1}>
      <Grid sm={12} md={7}>
        <Box sx={{ mb: 2 }}>
          <Stack direction={'row'}>
            <Typography variant="h2" sx={{ flexGrow: 1 }}>
              Players online
            </Typography>
            <Box>
              <IconButton
                aria-label="refresh"
                variant="outlined"
                size="large"
                onClick={refresh}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography variant="subtitle1">{30}s auto refresh</Typography>
          <ProgressBar interval={30} loading={loading} />
        </Box>
        <PlayersTable data={data} loading={loading} />
      </Grid>
      <Grid sm={12} md={5}>
        <LogsLiveList />
      </Grid>
    </Grid>
  );
};

export default LiveView;
