import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Form } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, Stack } from '@mui/material';
import ThemeMenu from './ThemeMenu';
import { useGlobalState } from '../../hooks/useGlobalState';
import { ServerStatus } from './ServerStatus';

const sidebarWidth = 280;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Separator = styled(Box)(() => ({
  flexGrow: 1,
}))

const AppBar = ({ sidebarOpen, toggleSidebar, theme, setTheme }) => {
  const { state } = useGlobalState();

  return (
    <StyledAppBar position="absolute" open={sidebarOpen}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          sx={{
            marginRight: '36px',
            ...(sidebarOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <ServerStatus server={state.server} />
        <Separator />
        <Stack direction={'row'} spacing={2}>
          <ThemeMenu theme={theme} setTheme={setTheme} />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Form method={'POST'}>
            <IconButton
              color="inherit"
              type="submit"
              name="intent"
              value="logout"
            >
              <LogoutIcon />
            </IconButton>
          </Form>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};
export default AppBar;
