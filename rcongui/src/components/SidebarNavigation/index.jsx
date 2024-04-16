import { styled } from '@mui/system';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Divider, IconButton, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Navigation from './navigationList';

const sidebarWidth = 280;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: sidebarWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SidebarNavigation = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ overflowY: 'auto', height: '100vh' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ width: sidebarWidth - 24 }}>
        <Navigation />
      </Box>
    </Drawer>
  );
};

export default SidebarNavigation;
