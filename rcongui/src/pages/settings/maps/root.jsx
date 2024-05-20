import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Alert,
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
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
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
import { VotemapConfigForm } from '../../../components/settings/VotemapConfigForm';
import { VotemapStatus } from '../../../components/settings/VotemapStatus';

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
        <VotemapStatus />
        <VotemapConfigForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Simple table of maps including details as n-times played, average
        length... Based on map_history Maps with length over 90 do NOT discard
        but consider as server killers
      </CustomTabPanel>
    </Box>
  );
}

// TODO
// Abstract away some logic into FormWithCofirmation ?

const Section = styled((props) => <Box component={'section'} {...props} />)(
  () => {}
);

const MapHistory = ({ maps }) => {
  return (
    <ImageList
      cols={5}
      rowHeight={100}
      gap={0}
      sx={{ overflowY: 'clip', width: '100%', mb: 0 }}
      variant="quilted"
    >
      {maps.map((map, i) => {
        return (
          <ImageListItem
            key={map.start + i}
            sx={{
              '& .MuiImageListItem-img': {
                filter: `brightness(${map.isCurrent ? 0.9 : 0.3})`,
              },
              '&.MuiImageListItem-root': {
                border: (theme) =>
                  `${map.isCurrent && '1px solid ' + theme.palette.success.main}`,
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

const MapSelectionItem = ({ map, onClick }) => {
  return (
    <ListItemButton onClick={onClick} sx={{ pl: 6 }}>
      <ListItemText primary={map} />
    </ListItemButton>
  );
};

const MapSelectionGroup = ({ name, list, onClick }) => {
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
          {list.map((map, i) => (
            <Form method="post" key={map + i}>
              <MapSelectionItem
                map={map}
                onClick={onClick({
                  action: 'map change',
                  message: `Are you sure you want to change map to ${map}?`,
                })}
              />
              <input type="hidden" name="intent" value={'change_map'} />
              <input type="hidden" name="map_name" value={map} />
            </Form>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const MapSelection = ({ open, maps, onClick }) => {
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
                onClick={onClick}
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

  const actionData = useActionData();

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

  const lastThreeMaps = mapHistory.slice(0, 3);
  lastThreeMaps.reverse();
  const mapHistoryList = [
    ...lastThreeMaps,
    {
      ...publicInfo.current_map,
      isCurrent: true,
    },
    publicInfo.next_map,
  ];

  return (
    <Box>
      {actionData && (
        <Alert severity={actionData.ok ? 'info' : 'error'} onClose={() => {}}>
          {actionData.message}
        </Alert>
      )}
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
          <Form method="post" onChange={(e) => {
            const formData = new FormData();
            const config = {
              ...votemapConfig,
              enabled: !votemapConfig.enabled,
              intent: 'set_votemap',
            }
            Object.entries(config).forEach(entry => { formData.append(entry[0], entry[1]); })
            submit(formData, { method: 'post', action: '/settings/maps' })
          }}>
            <ListItem>
              <ListItemIcon>
                <PollIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary="Map vote" />
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
        <BasicTabs />
      </Stack>
    </Box>
  );
}
