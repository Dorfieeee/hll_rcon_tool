import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import LogsLiveList from '../../components/LogsLiveList'
import PlayersTable from '../../components/PlayersTable';

const LiveView = () => {
  return (
    <Grid container spacing={1}>
      <Grid sm={12} md={7}>
        <PlayersTable />
      </Grid>
      <Grid sm={12} md={5}>
        <LogsLiveList />
      </Grid>
    </Grid>
  );
};

export default LiveView;
