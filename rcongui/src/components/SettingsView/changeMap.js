import React from 'react';
import { Grid, Button, Menu, MenuItem, Container } from '@mui/material';
import { Box } from '@mui/system';

const ChangeMap = ({ availableMaps, changeMap }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOnBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
        <Button
          variant="outlined"
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOnBtnClick}
        >
          Change Map Now
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleOnMenuClose}
        >
          {availableMaps.map((mapName) => (
            <MenuItem
              key={mapName}
              onClick={() => {
                changeMap(mapName).then(handleOnMenuClose);
              }}
            >
              {mapName}
            </MenuItem>
          ))}
        </Menu>
    </Box>
  );
};

export default ChangeMap;
