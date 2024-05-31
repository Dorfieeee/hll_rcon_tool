import * as React from 'react';
import {
  Autocomplete,
  Divider,
  ListItemButton,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RedoIcon from '@mui/icons-material/Redo';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useConfirmDialog } from '../../../../hooks/useConfirmDialog';
import { MapRotation } from '../../../../components/settings/MapRotation';

export default function QuickSettings() {
  const { maps, rotation, shuffleEnabled, gameState } = useLoaderData();

  const actionData = useActionData();

  const [changeMapValue, setChangeMapValue] = React.useState();

  const { openConfirmDialog } = useConfirmDialog();

  const submit = useSubmit();

  const handleSubmit =
    ({ action, message }) =>
    (e) => {
      const form = e.currentTarget.parentElement;
      openConfirmDialog('Confirm ' + action, message, (confirm) => {
        if (confirm) {
          submit(form);
        }
      });
      e.preventDefault();
    };

    const handleMapChange = (event, map) => {
      openConfirmDialog(
        'Confirm map chagnge.',
        `Are you sure you want to change map to ${map}?`,
        (confirm) => {
          if (confirm) {
            const formData = new FormData();
            formData.append('intent', 'change_map');
            formData.append('map_name', map);
            submit(formData, { method: 'post' });
          }
        }
      );
    }

  return (
    <Stack direction={'row'} gap={1} sx={{ height: '100%' }}>
      <List
        sx={{
          width: 350,
          bgcolor: 'background.paper',
        }}
      >
        <Form method="post">
          <ListItemButton
            onClick={handleSubmit({
              action: 'map change',
              message: `Are you sure you want to change map to ${gameState.next_map}?`,
            })}
          >
            <ListItemIcon>
              <RedoIcon />
            </ListItemIcon>
            <ListItemText primary="Next map" />
            <input type="hidden" name="intent" value={'next_map'} />
            <input type="hidden" name="map_name" value={gameState.next_map} />
          </ListItemButton>
        </Form>
        <Form method="post">
          <ListItemButton
            onClick={handleSubmit({
              action: 'map reset',
              message: `Are you sure you want to reset ${gameState.current_map}?`,
            })}
          >
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            <ListItemText primary="Restart map" />
            <input type="hidden" name="intent" value={'reset_map'} />
            <input
              type="hidden"
              name="map_name"
              value={gameState.current_map}
            />
          </ListItemButton>
        </Form>
        <Divider />
        <Form method="post"></Form>
        <ListItem>
          <Autocomplete
            onChange={handleMapChange}
            id="change-map"
            options={maps}
            disableClearable
            fullWidth
            clearOnBlur
            renderInput={(params) => (
              <TextField margin="normal" label="Change Map" {...params} />
            )}
          />
        </ListItem>
      </List>
      <MapRotation maps={maps} rotation={rotation} shuffleEnabled={shuffleEnabled} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!actionData}
        message={actionData?.message}
        autoHideDuration={3000}
      />
    </Stack>
  );
}
