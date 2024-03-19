import { Grid, GridListTile, makeStyles } from "@material-ui/core";
import React from "react";
import { ActionButton } from "./ActionButton";
import { PlayerHeader } from "./PlayerHeader";
import { PlayerFlags } from "./PlayerFlags";
import { PlayerSighthings } from "./PlayerSighthings";
import { PlayerPenalties } from "./PlayerPenalties";

const useStyles = makeStyles((theme) => ({
  paperTile: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100%",
    padding: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
}));

export default ({ onDeleteFlag, player }) => {
  const classes = useStyles();

  return (
    <GridListTile style={{ minHeight: "100%" }}>
      <Grid
        container
        className={classes.paperTile}
        direction="column"
        justify="space-between"
      >
        <PlayerHeader  player={player} />
        <PlayerFlags
          player={player}
          
          onDeleteFlag={onDeleteFlag}
        />
        <PlayerSighthings  player={player} />
        <PlayerPenalties  player={player} />
        <Grid container justify="center">
          <Grid item>
            <ActionButton
              blacklisted={false}
              onUnBlacklist={() => null}
              onBlacklist={() => null}
              onTempBan={() => null}
              onUnban={() => null}
              onflag={() => null}
              isVip={false}
              onAddVip={() => null}
              onDeleteVip={() => null}
              isWatched={false}
              onAddToWatchList={() => null}
              onRemoveFromWatchList={() => null}
            />
          </Grid>
        </Grid>
      </Grid>
    </GridListTile>
  );
};
