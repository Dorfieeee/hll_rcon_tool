import React from 'react';
import { IconButton, Typography, Tooltip, Divider } from '@mui/material';
import {
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { playerGameActions } from '../../features/playerActions';
import { useActionDialog } from '../../hooks/useActionDialog';

export const TableToolbar = () => {
  const apiRef = useGridApiContext();
  const selectedRows = apiRef.current.getSelectedRows();
  const { setOpen, setAction, setRecipients } = useActionDialog();

  if (selectedRows.size) {
    const players = Array.of(...selectedRows.values());

    return (
      <GridToolbarContainer sx={{ height: '60px', px: 2, gap: 0.5 }}>
        <Typography>Apply action to all selected</Typography>
        {playerGameActions.map((action) => (
          <React.Fragment key={action.name}>
            <Divider orientation="vertical" />
            <Tooltip
              title={action.name[0].toUpperCase() + action.name.substring(1)}
            >
              <IconButton
                onClick={() => {
                  setAction(action);
                  setRecipients(players);
                  setOpen(true);
                }}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ))}
      </GridToolbarContainer>
    );
  }

  return (
    <GridToolbarContainer sx={{ height: '60px', px: 2 }}>
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
