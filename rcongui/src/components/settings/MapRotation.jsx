import {
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  Autocomplete,
  Box,
  Button,
  List,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormCard, FormDivider } from './cards';
import React from 'react';
import { Form, useSubmit } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const MapRotation = ({ maps, rotation: originalRotation }) => {
  const [rotation, setRotation] = React.useState(originalRotation);
  const submit = useSubmit();

  const removeFromRotation = (index) => {
    setRotation((rotation) => rotation.filter((item, i) => i !== index));
  };

  const addToRotation = (event, mapName) => {
    setRotation((rotation) => [mapName, ...rotation]);
  };

  const resetChanges = () => {
    setRotation(originalRotation);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('rotation', JSON.stringify(rotation));
    formData.append('intent', 'do_set_map_rotation');
    submit(formData, { method: 'post' });
  };

  const options = maps;

  const handleOrderUp = (index) => {
    if (index === 0) return;
    setRotation(prev => {
        const rotation = [...prev]
        const lower = rotation[index];
        const higher = rotation[index - 1];
        rotation[index] = higher;
        rotation[index - 1] = lower;
        return rotation;
    })
  }

  const handleOrderDown = (index) => {
    if (index === rotation.length - 1) return;
    setRotation(prev => {
        const rotation = [...prev]
        const higher = rotation[index];
        const lower = rotation[index + 1];
        rotation[index] = lower;
        rotation[index + 1] = higher;
        return rotation;
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Form onSubmit={onSubmit}>
        <Stack gap={1}>
          <FormCard fullWidth>
            <Stack
              direction="row"
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Typography variant="h6">Map Rotation</Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={resetChanges}
              >
                Reset
              </Button>
              <Button
                name="intent"
                value="do_set_map_rotation"
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
            disableCloseOnSelect
              onChange={addToRotation}
              disablePortal
              id="combo-box-demo"
              sx={{ flexGrow: 1 }}
              options={options}
              disableClearable
              renderInput={(params) => (
                <TextField margin="normal" {...params} label="Add Map" />
              )}
            />
            <FormDivider />
            <List dense={true}>
              {rotation.map((mapName, index) => {
                return (
                  <ListItem
                    divider
                    key={mapName + index}
                    secondaryAction={
                      <IconButton
                        size="small"
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFromRotation(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="Vertical button group"
                      >
                        <IconButton size='small' onClick={() => handleOrderUp(index)} disabled={index === 0}>
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleOrderDown(index)} disabled={index === rotation.length - 1}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </ButtonGroup>
                    </ListItemIcon>
                    <ListItemText primary={mapName} />
                  </ListItem>
                );
              })}
            </List>
          </FormCard>
        </Stack>
      </Form>
    </Box>
  );
};
