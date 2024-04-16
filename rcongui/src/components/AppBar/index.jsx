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
import { Stack } from '@mui/material';
import ThemeMenu from './ThemeMenu';

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

const AppBar = ({ sidebarOpen, toggleSidebar, theme, setTheme }) => (
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
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Dashboard
      </Typography>
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

export default AppBar;
