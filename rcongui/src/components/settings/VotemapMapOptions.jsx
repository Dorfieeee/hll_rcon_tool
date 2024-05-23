import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import {
  Autocomplete,
  Box,
  Button,
  List,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { difference } from 'lodash';
import { FormCard, FormDivider } from './cards';

export const VotemapMapOptions = ({ maps, whitelist }) => {
  const options = difference(maps, whitelist);
  const allOptionsUsed = !options.length;

  return (
    <Stack gap={1} sx={{ width: '100%' }}>
      <FormCard fullWidth>
        <Stack direction="row" gap={1} alignItems={'center'} flexWrap={'wrap'}>
          <Typography variant="h6">Allowed Map Options</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            name="intent"
            value="do_set_map_whitelist"
            variant="contained"
            type="submit"
            size="small"
            color="warning"
          >
            Reset
          </Button>
          <Button
            name="intent"
            value="do_set_map_whitelist"
            variant="contained"
            type="submit"
            size="small"
          >
            Save
          </Button>
        </Stack>
      </FormCard>
      <FormCard fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ flexGrow: 1 }}
          options={options}
          disabled={allOptionsUsed}
          renderInput={(params) => (
            <TextField
              helperText={allOptionsUsed && 'All maps already selected.'}
              margin="normal"
              {...params}
              label="Add Map"
            />
          )}
        />
        <FormDivider />
        <List dense={true}>
          {whitelist.map((mapName) => {
            return (
              <ListItem
                divider
                key={mapName}
                secondaryAction={
                  <IconButton size="small" edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={mapName} />
              </ListItem>
            );
          })}
        </List>
      </FormCard>
    </Stack>
  );
};
