import * as React from 'react';
import { Divider, ListItemButton, Snackbar } from '@mui/material';
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
import Switch from '@mui/material/Switch';
import RedoIcon from '@mui/icons-material/Redo';
import RefreshIcon from '@mui/icons-material/Refresh';
import PollIcon from '@mui/icons-material/Poll';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useConfirmDialog } from '../../../../hooks/useConfirmDialog';
import { MapSelection } from '../../../../components/settings/maps';

export default function QuickSettings() {
  const { gameState, maps, votemapConfig } = useLoaderData();

  const actionData = useActionData();

  const [open, setOpen] = React.useState(false);

  const { openConfirmDialog } = useConfirmDialog();

  const submit = useSubmit();

  const handleChangeMapClick = () => {
    setOpen(!open);
  };

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

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
        <Form
          method="post"
          onChange={(e) => {
            const formData = new FormData();
            const config = {
              ...votemapConfig,
              enabled: !votemapConfig.enabled,
              intent: 'set_votemap',
            };
            Object.entries(config).forEach((entry) => {
              formData.append(entry[0], entry[1]);
            });
            submit(formData, {
              method: 'post',
              action: '/settings/maps',
            });
          }}
        >
          <ListItem>
            <ListItemIcon>
              <PollIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-mapvote" primary="Map vote" />
            <Switch
              name="enabled"
              edge="end"
              checked={votemapConfig.enabled}
              inputProps={{
                'aria-labelledby': 'switch-list-label-mapvote',
              }}
            />
            <input type="hidden" name="intent" value={'set_votemap'} />
          </ListItem>
        </Form>
        <ListItemButton onClick={handleChangeMapClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Change map" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <MapSelection maps={maps} open={open} onClick={handleSubmit} />
      </List>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!actionData}
        message={actionData?.message}
        autoHideDuration={3000}
      />
    </>
  );
}
