import * as React from 'react';
import {
  Alert,
  Box,
} from '@mui/material';
import {
  useActionData,
  useLoaderData,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MapHistory } from '../../../components/settings/maps';


export default function Root() {
  const actionData = useActionData();

  const pathRoot = '/settings/maps';

  const location = useLocation();

  const currentTab = location?.pathname ?? '';

  const {
    gameState,
    mapHistory,
    maps,
    mapRotation,
    votemapConfig,
    votemapStatus,
    mapShuffleEnabled,
  } = useLoaderData();

  console.log({
    gameState,
    mapHistory,
    maps,
    mapRotation,
    votemapConfig,
    votemapStatus,
    mapShuffleEnabled,
  });

  const lastThreeMaps = mapHistory.slice(0, 3);
  lastThreeMaps.reverse();
  const mapHistoryList = [
    ...lastThreeMaps,
    {
      name: gameState.current_map,
      start: 123456789,
      isCurrent: true,
    },
    {
      start: null,
      name: gameState.next_map,
    },
  ];

  return (
    <Box sx={{ mt: -2, mx: -3 }}>
      {actionData && (
        <Alert severity={actionData.ok ? 'info' : 'error'} onClose={() => {}}>
          {actionData.message}
        </Alert>
      )}
        <MapHistory maps={mapHistoryList} />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Votemap settings tabs"
            sx={{
              bgcolor: 'background.paper',
            }}
          >
            <Tab label="Quick settings" value={pathRoot} to={pathRoot} component={Link} />
            <Tab
              label="Fixed Rotation Config"
              value={pathRoot + '/map-rotation-config'}
              to={pathRoot + '/map-rotation-config'}
              component={Link}
            />
            <Tab
              label="Vote System Config"
              value={pathRoot + '/votemap-config'}
              to={pathRoot + '/votemap-config'}
              component={Link}
            />
            <Tab
              label="Map History"
              value={pathRoot + '/map-history'}
              to={pathRoot + '/map-history'}
              component={Link}
            />
          </Tabs>
        </Box>
        <Outlet />
    </Box>
  );
}
