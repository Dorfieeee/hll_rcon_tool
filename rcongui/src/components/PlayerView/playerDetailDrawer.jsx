import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export const playerDetailDrawer = ({ open, setOpen, player }) => (
  <Drawer
    variant="persistent"
    open={open}
    anchor="right"
    onClose={() => setOpen(false)}
  >
    <Toolbar />
    {player && (
      <Box sx={{ width: '20rem', height: '100%', marginTop: 1, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {player.name}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="subtitle1">ID: {player.steam_id_64}</Typography>
        <List dense>
          {player.profile.received_actions.map((action, index) => (
            <ListItem key={action.action_type + index}>
              <ListItemText>{`${action.time}: ${action.action_type}`}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    )}
  </Drawer>
);
