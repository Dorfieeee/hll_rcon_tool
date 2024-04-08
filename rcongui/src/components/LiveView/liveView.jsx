import { Grid } from '@mui/material';
import React from 'react';
import PlayerView from '../PlayerView';
import LogsView from '../LogsView'
import Logs from '../LogsView/logs';
import { PlayerViewV2 } from '../PlayerView/playerViewV2';

const LiveView = () => {
  const [mdSize, setMdSize] = React.useState(6);
  const [direction, setDirection] = React.useState('row');
  const isFullScreen = () => mdSize !== 6;
  const toggleMdSize = () => (isFullScreen() ? setMdSize(6) : setMdSize(12));

  return (
    <Grid container spacing={1} direction={direction}>
      <Grid item sm={12}>
        <PlayerViewV2 />
      </Grid>
      {/* <Grid item sm={12} md={mdSize}>
        <LogsView />
      </Grid> */}
    </Grid>
  );
};

export default LiveView;
