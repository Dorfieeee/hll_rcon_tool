import React from 'react';
import {
  IconButton,
  Typography,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { playerActionsV2 } from './playerActionsV2';

export const ActionToolbar = ({ dispatch }) => {
  const apiRef = useGridApiContext();
  const selectedRows = apiRef.current.getSelectedRows();

  if (selectedRows.size) {
    const players = Array.of(...selectedRows.values());

    return (
      <GridToolbarContainer sx={{ height: '50px', px: 2 }}>
        <Typography>Apply action to all selected</Typography>
        {playerActionsV2.map((action) => (
          <React.Fragment key={action.name}>
            <Divider orientation="vertical" />
            <Tooltip
              title={action.name[0].toUpperCase() + action.name.substring(1)}
            >
              <IconButton onClick={() => dispatch({ action, selectedPlayers: players })}>
                {action.icon}
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ))}
      </GridToolbarContainer>
    );
  }

  return (
    <GridToolbarContainer sx={{ height: '50px', px: 2 }}>
      <Typography>Table settings</Typography>
      <Divider orientation="vertical" />
      <GridToolbarColumnsButton />
      <Divider orientation="vertical" />
      <GridToolbarFilterButton />
      <Divider orientation="vertical" />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};
