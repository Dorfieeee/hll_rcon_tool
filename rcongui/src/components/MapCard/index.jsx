import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getMapImageUrl } from '../Scoreboard/utils';
import dayjs from 'dayjs';

export default function MapCard({ map }) {
    const hasStared = !!map.start;
    const date = hasStared ? dayjs(map.start * 1000).format('dddd, MMM D') : 'In queue';
    const time = hasStared ? dayjs(map.start * 1000).format('HH:mm') : '';

  return (
    <Card
      sx={{ maxWidth: 200 }}
      variant={map.start && !map.end && 'outlined'}
    >
      <CardMedia
        component="img"
        height="100"
        image={getMapImageUrl(map.name)}
        alt={map.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {map.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
