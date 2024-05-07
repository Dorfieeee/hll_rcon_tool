import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Alert, Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmDialogProvider } from '../../hooks/useConfirmDialog';

const RUNNING = 'RUNNING';
const STOPPED = 'STOPPED';
const AUTO_SETTINGS = 'auto_settings';

export default function Root() {
  const { services } = useLoaderData();
  const autoSettingsService = services.find(
    (service) => service.name === AUTO_SETTINGS
  );
  const isAutoSettingsRunning =
    autoSettingsService && autoSettingsService.statename === RUNNING;

  return (
    <>
      {isAutoSettingsRunning && (
        <Alert
          severity="warning"
          onClose={() => {}}
          action={
            <Button color="inherit" size="small">
              STOP SERVICE
            </Button>
          }
          sx={{ mb: 2 }}
        >
          Auto settings service is ON. Any changes you make here can be
          overriden.
        </Alert>
      )}
      <ConfirmDialogProvider>
        <Outlet />
      </ConfirmDialogProvider>
    </>
  );
}
