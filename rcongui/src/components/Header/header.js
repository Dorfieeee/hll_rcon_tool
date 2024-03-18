import React from "react";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ServerStatus from "./serverStatus";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, makeStyles } from "@material-ui/core";
import LoginBox from "./login";

const useStyles = makeStyles((theme) => ({
  appbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexDirection: "row",
    gap: "0.25rem"
  },
  navigation: {
    display: "flex",
    flexGrow: 1,
  }
}))

const MenuSelection = (props) => {
  return (
    <Box>
      <Button
        style={{ textTransform: "capitalize" }}
        id={`${props.name}-button`}
        onClick={props.handleClick}
      >
        {props.name}
      </Button>
      <Menu
        id={`${props.name}-menu`}
        keepMounted
        onClose={props.handleClose}
        open={props.open}
        anchorEl={props.anchorEl}
      >
        {props.routes.map(route => {
          return (
            <MenuItem key={route.path} onClick={props.handleClose}>
              <RouterLink to={route.path}>
                {route.name}
              </RouterLink>
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

const menuConfigs = [
  {
    name: "live",
    routes: [
      {
        name: "Live",
        path: "/"
      },
      {
        name: "Game view",
        path: "/gameview"
      },
    ]
  },
  {
    name: "history",
    routes: [
      {
        name: "Players",
        path: "/history"
      },
      {
        name: "Logs",
        path: "/logs"
      },
      {
        name: "Combined",
        path: "/combined_history"
      },
      {
        name: "Audit Logs",
        path: "/auditlogs"
      },
    ]
  },
  {
    name: "Settings",
    routes: [
      {
        name: "Settings",
        path: "/settings"
      },
      {
        name: "Audit Webhooks",
        path: "/audit-webhooks"
      },
      {
        name: "Admin Ping Webhooks",
        path: "/admin-webhooks"
      },
      {
        name: "Watchlist Webhooks",
        path: "/watchlist-webhooks"
      },
      {
        name: "Camera Webhooks",
        path: "/camera-webhooks"
      },
      {
        name: "Chat Webhooks",
        path: "/chat-webhooks"
      },
      {
        name: "Kill/Teamkills Webhooks",
        path: "/kill-webhooks"
      },
      {
        name: "Level Auto Mod",
        path: "/automod-level"
      },
      {
        name: "No Leader Auto Mod",
        path: "/automod-no-leader"
      },
      {
        name: "Seeding Auto Mod",
        path: "/automod-seeding"
      },
      {
        name: "No Solo Tank Auto Mod",
        path: "/automod-solo-tank"
      },
      {
        name: "RCON Game Server Connection",
        path: "/rcon-gameserver"
      },
      {
        name: "CRCON Settings",
        path: "/rcon-server"
      },
      {
        name: "Chat Commands",
        path: "/chatcommands"
      },
      {
        name: "Scorebot",
        path: "/scorebot"
      },
      {
        name: "Steam API",
        path: "/steam"
      },
      {
        name: "VAC/Game Bans",
        path: "/vac-gamebans"
      },
      {
        name: "TK Ban On Connect",
        path: "/tk-ban"
      },
      {
        name: "Name Kicks",
        path: "/name-kicks"
      },
      {
        name: "Log Line Webhooks",
        path: "/log-lines"
      },
      {
        name: "Expired VIP",
        path: "/expired-vip"
      },
      {
        name: "GTX Server Name Change",
        path: "/gtx-server-name-change"
      },
    ]
  },
  {
    name: "Stats",
    routes: [
      {
        name: "Live Sessions",
        path: "/livescore"
      },
      {
        name: "Live Game",
        path: "/livegamescore"
      },
      {
        name: "Games",
        path: "/gamescoreboard"
      },
    ]
  },
]

// TODO: Make this reactive, it's causing the view on mobile to be bigger then it should
const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openedMenu, setOpenedMenu] = React.useState("");

  const handleClick = (event, name) => {
    setAnchorEl(event.currentTarget);
    setOpenedMenu(name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedMenu("")
  };

  const createMenu = (menu) => {
    return <MenuSelection name={menu.name} routes={menu.routes} anchorEl={anchorEl} open={menu.name === openedMenu} handleClose={handleClose} handleClick={(e) => handleClick(e, menu.name)} />
  }

  return (
    <AppBar position="static" elevation={0} className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <ServerStatus />
        <Box className={classes.navigation}>
          {menuConfigs.map(createMenu)}
        </Box>
        <LoginBox />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
