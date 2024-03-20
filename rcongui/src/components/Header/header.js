import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import ServerStatus from './serverStatus';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginBox from './login';
import { Stack } from '@mui/material';

const MenuSelection = (props) => {
  return (
    <Stack>
      <Button
        style={{ textTransform: 'capitalize' }}
        id={`${props.name}-button`}
        onClick={props.handleClick}
        color="inherit"
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
        {props.routes.map((route) => {
          return (
            <MenuItem key={route.path} onClick={props.handleClose}>
              <RouterLink to={route.path}>{route.name}</RouterLink>
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
};

const menuConfigs = [
  {
    name: 'live',
    routes: [
      {
        name: 'Live',
        path: '/',
      },
      {
        name: 'Game view',
        path: '/gameview',
      },
    ],
  },
  {
    name: 'history',
    routes: [
      {
        name: 'Players',
        path: '/history',
      },
      {
        name: 'Logs',
        path: '/logs',
      },
      {
        name: 'Combined',
        path: '/combined_history',
      },
      {
        name: 'Audit Logs',
        path: '/auditlogs',
      },
    ],
  },
  {
    name: 'Settings',
    routes: [
      {
        name: 'Settings',
        path: '/settings/settings',
      },
      {
        name: 'Audit Webhooks',
        path: '/settings/audit-webhooks',
      },
      {
        name: 'Admin Ping Webhooks',
        path: '/settings/admin-webhooks',
      },
      {
        name: 'Watchlist Webhooks',
        path: '/settings/watchlist-webhooks',
      },
      {
        name: 'Camera Webhooks',
        path: '/settings/camera-webhooks',
      },
      {
        name: 'Chat Webhooks',
        path: '/settings/chat-webhooks',
      },
      {
        name: 'Kill/Teamkills Webhooks',
        path: '/settings/kill-webhooks',
      },
      {
        name: 'Level Auto Mod',
        path: '/settings/automod-level',
      },
      {
        name: 'No Leader Auto Mod',
        path: '/settings/automod-no-leader',
      },
      {
        name: 'Seeding Auto Mod',
        path: '/settings/automod-seeding',
      },
      {
        name: 'No Solo Tank Auto Mod',
        path: '/settings/automod-solo-tank',
      },
      {
        name: 'RCON Game Server Connection',
        path: '/settings/rcon-gameserver',
      },
      {
        name: 'CRCON Settings',
        path: '/settings/rcon-server',
      },
      {
        name: 'Chat Commands',
        path: '/settings/chatcommands',
      },
      {
        name: 'Scorebot',
        path: '/settings/scorebot',
      },
      {
        name: 'Steam API',
        path: '/settings/steam',
      },
      {
        name: 'VAC/Game Bans',
        path: '/settings/vac-gamebans',
      },
      {
        name: 'TK Ban On Connect',
        path: '/settings/tk-ban',
      },
      {
        name: 'Name Kicks',
        path: '/settings/name-kicks',
      },
      {
        name: 'Log Line Webhooks',
        path: '/settings/log-lines',
      },
      {
        name: 'Expired VIP',
        path: '/settings/expired-vip',
      },
      {
        name: 'GTX Server Name Change',
        path: '/settings/gtx-server-name-change',
      },
    ],
  },
  {
    name: 'Stats',
    routes: [
      {
        name: 'Live Sessions',
        path: '/livescore',
      },
      {
        name: 'Live Game',
        path: '/livegamescore',
      },
      {
        name: 'Games',
        path: '/gamescoreboard',
      },
    ],
  },
];

// TODO: Make this reactive, it's causing the view on mobile to be bigger then it should
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openedMenu, setOpenedMenu] = React.useState('');

  const handleClick = (event, name) => {
    setAnchorEl(event.currentTarget);
    setOpenedMenu(name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedMenu('');
  };

  const createMenu = (menu) => {
    return (
      <MenuSelection
        key={menu.name}
        name={menu.name}
        routes={menu.routes}
        anchorEl={anchorEl}
        open={menu.name === openedMenu}
        handleClose={handleClose}
        handleClick={(e) => handleClick(e, menu.name)}
      />
    );
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <ServerStatus />
        <Stack direction={'row'} sx={{ flexGrow: 1 }}>
          {menuConfigs.map(createMenu)}
        </Stack>
        <LoginBox />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
