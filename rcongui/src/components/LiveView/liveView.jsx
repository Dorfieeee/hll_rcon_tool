import { Grid } from '@mui/material';
import React from 'react';
import PlayerView from '../PlayerView';
import Logs from '../LogsView/logs';

const LiveView = () => {
  const [mdSize, setMdSize] = React.useState(6);
  const [direction, setDirection] = React.useState('row');
  const isFullScreen = () => mdSize !== 6;
  const toggleMdSize = () => (isFullScreen() ? setMdSize(6) : setMdSize(12));

  return (
    <Grid container spacing={1} direction={direction}>
      <Grid item sm={12} md={mdSize}>
        <PlayerView
          onFullScreen={() => {
            setDirection('row');
            toggleMdSize();
          }}
          isFullScreen={isFullScreen()}
        />
      </Grid>
      <Grid item sm={12} md={mdSize}>
        <Logs
          onFullScreen={() => {
            direction === 'column-reverse'
              ? setDirection('row')
              : setDirection('column-reverse');
            toggleMdSize();
          }}
          isFullScreen={isFullScreen()}
        />
      </Grid>
    </Grid>
  );
};

export default LiveView;
