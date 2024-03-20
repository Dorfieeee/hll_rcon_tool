import { Grid, Typography } from '@mui/material';
import PlayersHistory from '../PlayersHistory';
import LogsHistory from '../LogsHistory';

const CombinedHistory = () => (
  <Grid container spacing={2}>
    <Grid item sm={12}>
      <Typography variant="h4">Players</Typography>
    </Grid>
    <Grid item sm={12}>
      <PlayersHistory />
    </Grid>
    <Grid item sm={12}>
      <Typography variant="h4">Historical Logs</Typography>
    </Grid>
    <Grid item sm={12}>
      <LogsHistory />
    </Grid>
  </Grid>
);

export default CombinedHistory;
