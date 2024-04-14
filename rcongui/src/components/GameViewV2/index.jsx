import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export default function CollapsibleTable() {
  return (
    <Grid container columnSpacing={2}>
      <Grid xs={6}>
        <Header>
          <Summary />
        </Header>
        <Team>
          <Commander />
          <Unassigned />
          <InfantrySquads />
          <TankSquads />
          <ReconSquads />
        </Team>
      </Grid>
      <Grid xs={6}>
        <Header>
          <Summary />
        </Header>
        <Team>
          <Commander />
          <Unassigned />
          <InfantrySquads />
          <TankSquads />
          <ReconSquads />
        </Team>
      </Grid>
    </Grid>
  );
}
