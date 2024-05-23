import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  List,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { difference } from 'lodash';

const FormCard = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const FormCardTitle = styled((props) => (
  <Typography variant={'h6'} {...props} />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FormDivider = styled((props) => (
  <Divider textAlign="left" flexItem {...props} />
))(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const VotemapMapOptions = ({ maps, whitelist }) => {
  const options = difference(maps, whitelist);
  const allOptionsUsed = !options.length;

  return (
    <Stack gap={1}>
      <FormCard style={{ maxWidth: 500 }}>
        <Stack direction="row" gap={1} alignItems={'center'} flexWrap={'wrap'}>
        <Typography variant='h6'>Allowed Map Options</Typography>
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
      <FormCard style={{ maxWidth: 500 }}>
        
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
