import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import {
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { getMapName, getMapImageUrl } from '../Scoreboard/utils';

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)',
  },
  noDot: {
    listStyleType: 'none',
  },
});

const DraggableListItem = ({ item, index, onRemove }) => {
  const getLabels = (fullName) => {
    const labels = [];

    if (
      fullName.toLowerCase().includes('offensive') ||
      fullName.toLowerCase().includes('off')
    ) {
      labels.push('offensive');
    } else if (fullName.toLowerCase().includes('skirmish')) {
      labels.push('skirmish');
    } else {
      labels.push('warfare');
    }
    if (
      fullName.toLowerCase().endsWith('us') ||
      fullName.toLowerCase().endsWith('rus')
    ) {
      labels.push('allies');
    }
    if (fullName.toLowerCase().endsWith('ger')) {
      labels.push('axis');
    }
    if (fullName.toLowerCase().includes('night')) {
      labels.push('night');
    }
    return labels;
  };

  const labelsColors = {
    offensive: 'primary',
    night: 'secondary',
    warfare: 'default',
    allies: 'primary',
    axis: 'secondary',
    skirmish: 'secondary',
  };

  const labelsVariant = {
    offensive: 'default',
    night: 'default',
    warfare: 'default',
    axis: 'outlined',
    allies: 'outlined',
    skirmish: 'default',
  };

  const classes = useStyles();
  return (
    <Draggable draggableId={item + index} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            snapshot.isDragging
              ? classes.draggingListItem + ' ' + classes.noDot
              : classes.noDot
          }
        >
          <ListItemAvatar>
            <Avatar src={getMapImageUrl(item)} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography display="inline" variant="h6">
                  {getMapName(item)}{' '}
                  {getLabels(item).map((e) => (
                    <Chip
                      size="small"
                      variant={labelsVariant[e]}
                      color={labelsColors[e]}
                      label={e}
                      key={e}
                    />
                  ))}
                </Typography>
              </>
            }
            secondary={<>{item}</>}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onRemove(index)}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
