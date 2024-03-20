import React from 'react';
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AdminRole = ({ role, setRole, roles }) => (
  <FormControl>
    <InputLabel shrink>Role</InputLabel>
    <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty>
      {roles.map((r) => (
        <MenuItem value={r}>{r}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

const AddAdminItem = ({
  name,
  setName,
  steamID64,
  setSteamID64,
  role,
  setRole,
  roles,
  onAdd,
}) => (
  <ListItem>
    <Grid container>
      <Grid item xs={4}>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="SteamID64"
          value={steamID64}
          onChange={(e) => setSteamID64(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <AdminRole role={role} setRole={setRole} roles={roles} />
      </Grid>
    </Grid>
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() =>
          onAdd(name, steamID64, role).then(() => {
            setName('');
            setSteamID64('');
            setRole('');
          })
        }
        size="large"
      >
        <AddIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const AdminsEditableList = ({ peopleList, roles, onDelete, onAdd }) => {
  const [name, setName] = React.useState('');
  const [steamID64, setSteamID64] = React.useState('');
  const [role, setRole] = React.useState('');

  return (
    <React.Fragment>
      <List dense>
        <AddAdminItem
          name={name}
          setName={setName}
          steamID64={steamID64}
          setSteamID64={setSteamID64}
          roles={roles}
          role={role}
          setRole={setRole}
          onAdd={onAdd}
        />
        {peopleList.map((obj) => (
          <ListItem key={obj.steam_id_64}>
            <ListItemText
              primary={'[' + obj.role + '] ' + obj.name}
              secondary={obj.steam_id_64}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(obj.name, obj.steam_id_64, obj.role)}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <AddAdminItem
          name={name}
          setName={setName}
          steamID64={steamID64}
          setSteamID64={setSteamID64}
          roles={roles}
          role={role}
          setRole={setRole}
          onAdd={onAdd}
        />
      </List>
    </React.Fragment>
  );
};

export default AdminsEditableList;
