import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import themes from '../themes';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from '../components/SidebarNavigation';
import { ActionDialogProvider } from '../providers/ActionDialogProvider';
import { useStorageState } from '../hooks/useStorageState';
import AppBar from '../components/AppBar';
import { ActionDialog } from '../components/ActionDialog';
import { PlayerSidebarProvider } from '../providers/PlayerSidebarProvider';
import { PlayerDetailDrawer } from '../components/PlayerProfileDrawer';
import { GlobalStateProvider } from '../hooks/useGlobalState';

const AppWrapper = styled('div')(() => ({ display: 'flex' }));

const Main = styled('main')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'clip',
  position: 'relative',
}));

export default function Root() {
  const [theme, setTheme] = useStorageState('crconTheme', 'Light');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const defaultTheme = themes[theme];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStateProvider>
        <ActionDialogProvider>
          <PlayerSidebarProvider>
            <AppWrapper>
              <CssBaseline />
              <AppBar
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                theme={theme}
                setTheme={setTheme}
              />
              <SidebarNavigation
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              <Main>
                <Toolbar /> {/* To offset from the top  */}
                <Container maxWidth={'xl'} sx={{ mt: 2, mb: 4, flexGrow: 1 }}>
                  <Outlet />
                </Container>
              </Main>
            </AppWrapper>
            <PlayerDetailDrawer />
          </PlayerSidebarProvider>
          <ActionDialog />
        </ActionDialogProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  );
}
