import React from "react";
import { AppBar, Link, Toolbar } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nav: {
      flexGrow: 1,
      display: "block",
      textAlign: "left",
    },
  link: {
    margin: theme.spacing(1, 1.5),
    marginLeft: 0,
  }
}))

const ScoreMenu = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar component={"nav"}>
        <Link
          color="inherit"
          className={classes.link}
          component={RouterLink}
          to="/"
        >
          Live game
        </Link>
        <Link
          color="inherit"
          className={classes.link}
          component={RouterLink}
          to="/livescore"
        >
          Live sessions
        </Link>
        <Link
          color="inherit"
          className={classes.link}
          component={RouterLink}
          to="/gamescoreboard"
        >
          Last games
        </Link>
    </Toolbar>
    </AppBar>
  )
};

export default ScoreMenu;
