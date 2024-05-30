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
      start: 'TODO',
      isCurrent: true,
    },
    {
      start: null,
      name: gameState.next_map,
    },
  ];

  return (
    <Box sx={{ mt: -4, mx: -3, height: '100%' }}>
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
            <Tab
              label="Fixed Rotation Config"
              value={pathRoot}
              to={pathRoot}
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
              disabled
            />
          </Tabs>
        </Box>
        <Outlet />
    </Box>
  );
}
