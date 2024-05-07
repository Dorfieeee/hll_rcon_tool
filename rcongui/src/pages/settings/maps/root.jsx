import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Collapse,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { getMapImageUrl } from '../../../components/Scoreboard/utils';
import dayjs from 'dayjs';
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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <Tab label="Fixed Rotation Config" {...a11yProps(0)} />
          <Tab label="Vote System Config" {...a11yProps(1)} />
          <Tab label="Map History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Simple table of maps including details as n-times played, average length...
        Based on map_history
        Maps with length over 90 do NOT discard but consider as server killers
      </CustomTabPanel>
    </Box>
  );
}

// TODO
// Abstract away some logic into FormWithCofirmation ?

const Section = styled((props) => <Box component={'section'} {...props} />)(() => {});

const MapHistory = ({ maps }) => {
  return (
    <ImageList
      cols={5}
      rowHeight={100}
      gap={0}
      sx={{ overflowY: 'clip', width: '100%', mb: 0 }}
      variant="quilted"
    >
      {maps.map((map) => {
        const isCurrent = !!map.start && map.end == null;
        return (
          <ImageListItem
            key={map.start}
            sx={{
              '& .MuiImageListItem-img': {
                filter: `brightness(${isCurrent ? 0.9 : 0.3})`,
              },
              '&.MuiImageListItem-root': {
                border: (theme) =>
                  `${isCurrent && '1px solid ' + theme.palette.success.main}`,
              },
            }}
          >
            <img alt={map.name} src={getMapImageUrl(map.name)} />
            <ImageListItemBar
              title={map.name}
              subtitle={
                map.start
                  ? dayjs(map.start * 1000).format('dddd, MMM D HH:mm')
                  : 'In queue'
              }
              position="bottom"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

const MapSelectionItem = ({ map, handleClick }) => {
  return (
    <ListItemButton onClick={handleClick} sx={{ pl: 6 }}>
      <ListItemText primary={map} />
    </ListItemButton>
  );
};

const MapSelectionGroup = ({ name, list, handleClick }) => {
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleExpandClick} sx={{ pl: 4 }}>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ maxHeight: 300, overflow: 'auto' }}
        >
          {list.map((item) => (
            <MapSelectionItem map={item} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

const MapSelection = ({ open, maps }) => {
  const modes = ['Warfare', 'Offensive', 'Skirmish', 'Unknown'];

  const mapGroups = React.useMemo(
    () =>
      maps.reduce(
        (groups, map) => {
          let mode = ['warfare', 'offensive', '_off_', 'skirmish'].find(
            (mode) => map.toLowerCase().includes(mode)
          );
          if (!mode) {
            mode = 'unknown';
          }
          if (mode === '_off_') {
            mode = 'offensive';
          }
          groups[mode].push(map);
          return groups;
        },
        {
          warfare: [],
          offensive: [],
          skirmish: [],
          unknown: [],
        }
      ),
    [maps]
  );

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {modes.map(
          (name) =>
            mapGroups[name.toLowerCase()].length > 0 && (
              <MapSelectionGroup
                key={name}
                name={name}
                list={mapGroups[name.toLowerCase()]}
              />
            )
        )}
      </List>
    </Collapse>
  );
};

export default function Root() {
  const [open, setOpen] = React.useState(false);

  const { openConfirmDialog } = useConfirmDialog();

  const submit = useSubmit();

  const {
    gameState,
    publicInfo,
    mapHistory,
    maps,
    mapRotation,
    votemapConfig,
    votemapStatus,
    mapShuffleEnabled,
  } = useLoaderData();

  console.log({
    gameState,
    publicInfo,
    mapHistory,
    maps,
    mapRotation,
    votemapConfig,
    votemapStatus,
    mapShuffleEnabled,
  });

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

  const lastFourMaps = mapHistory.slice(0, 4);
  lastFourMaps.reverse();
  const mapHistoryList = [...lastFourMaps, publicInfo.next_map];

  return (
    <Box>
      <Section>
        <MapHistory maps={mapHistoryList} />
      </Section>
      <Stack direction={'row'}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
              <input type="hidden" name="next_map" value={gameState.next_map} />
            </ListItemButton>
          </Form>
          <Form method="post">
            <ListItemButton
              onClick={handleSubmit({
                action: 'map reset',
                message: `Are you sure you want to reset ${gameState.next_map}?`,
              })}
            >
              <ListItemIcon>
                <RefreshIcon />
              </ListItemIcon>
              <ListItemText primary="Restart map" />
              <input type="hidden" name="intent" value={'reset_map'} />
              <input
                type="hidden"
                name="current_map"
                value={gameState.current_map}
              />
            </ListItemButton>
          </Form>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <PollIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Map vote" />
            <Switch
              edge="end"
              onChange={() => {}}
              checked={votemapConfig.enabled}
              inputProps={{
                'aria-labelledby': 'switch-list-label-mapvote',
              }}
            />
          </ListItem>
          <ListItemButton onClick={handleChangeMapClick}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Change map" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <MapSelection maps={maps} open={open} />
        </List>
        <BasicTabs />
      </Stack>
    </Box>
  );
}
