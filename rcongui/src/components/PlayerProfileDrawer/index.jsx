import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  Toolbar,
  Divider,
  Avatar,
  Tabs,
  Tab,
  Stack,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { styled } from '@mui/system';
import ActionMenu from '../ActionMenu';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import GavelIcon from '@mui/icons-material/Gavel';
import { green, red } from '@mui/material/colors';
import { useActionDialog } from '../../hooks/useActionDialog';
import {
  playerGameActions,
  playerProfileActions,
} from '../../features/playerActions';
import { usePlayerSidebar } from '../../hooks/usePlayerSidebar';

const OnlineStatusBadge = styled(Badge, {
  shouldForwardProp: (props) => props !== 'isOnline',
})(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isOnline ? green['500'] : red['500'],
    color: isOnline ? green['500'] : red['500'],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: isOnline ? 'ripple 1.2s infinite ease-in-out' : 'none',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ResponsiveDrawer = styled(Drawer)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20rem',
  },
}));

const ProfileWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '20rem',
  },
}));

const ProfileHeader = styled(Stack)(({ theme }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
}));

export const PlayerDetailDrawer = () => {
  const [value, setValue] = React.useState('1');

  const {
    setOpen: setActionDialogOpen,
    setAction,
    setRecipients,
  } = useActionDialog();

  const { open, setOpen, player } = usePlayerSidebar();

  const handleActionClick = (recipients) => (action) => {
    setAction(action);
    setRecipients(recipients);
    setActionDialogOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isOnline = player?.profile.sessions?.[0]?.end === null ?? false;
  const actionList = isOnline ? playerGameActions : playerProfileActions;

  return (
    <ResponsiveDrawer
      variant="persistent"
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
    >
      <Toolbar />
      {player && (
        <ProfileWrapper
          component={'article'}
        >
          <ProfileHeader rowGap={1}>
            <OnlineStatusBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              isOnline={isOnline}
            >
              <Avatar src={player.profile?.steaminfo?.profile?.avatar}>
                {player.name[0]}
              </Avatar>
            </OnlineStatusBadge>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component={'h1'}
                variant="h6"
                sx={{ textOverflow: 'ellipsis' }}
              >
                {player.name}
              </Typography>
              <Typography variant="subtitle2">
                ID: {player.steam_id_64}
              </Typography>
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                top: (theme) => theme.spacing(0.5),
                right: (theme) => theme.spacing(0.5),
              }}
              size="small"
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
            <ActionMenu
              handleActionClick={handleActionClick([player])}
              actionList={actionList}
              sx={{
                position: 'absolute',
                top: (theme) => theme.spacing(0.5),
                left: (theme) => theme.spacing(0.5),
              }}
            />
          </ProfileHeader>
          <Divider />
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent={'center'}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ p: 1 }}
          >
            {player.is_vip && <StarIcon />}
            {player.profile.watchlist &&
              player.profile.watchlist.is_watched && <VisibilityIcon />}
            {/* <NoAccountsIcon />
            <GavelIcon /> */}
          </Stack>
          <Divider />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Player details"
              >
                <Tab label="Profile" value="1" />
                <Tab label="Admin" value="2" />
                <Tab label="Comments" value="3" />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <dl>
                <dt>Country</dt>
                <dd>
                  {player.country && player.country !== 'private' ? (
                    <>
                      <img
                        src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                        width={20}
                        height={10}
                        alt={player.country}
                      />
                      <span style={{ marginLeft: 4 }}>{player.country}</span>
                    </>
                  ) : (
                    'Unknown'
                  )}
                </dd>
                <dt>First Seen</dt>
                <dd>
                  {player.profile.created
                    ? dayjs(player.profile.created).format('MMM DD, YYYY')
                    : 'N/A'}
                </dd>
                <dt>Last Seen</dt>
                <dd>
                  {player.profile.names[0]
                    ? dayjs(player.profile.names[0].last_seen).format(
                        'MMM DD, YYYY'
                      )
                    : 'N/A'}
                </dd>
                <dt>VIP</dt>
                <dd>{player.is_vip ? 'Yes' : 'No'}</dd>
                {player.is_vip && (
                  <>
                    <dt>VIP Expires</dt>
                    <dd>TODO - based on viewed server</dd>
                  </>
                )}
                <dt>Visits</dt>
                <dd>{player.profile.sessions_count}</dd>
                <dt>Playtime in hours</dt>
                <dd>
                  {Math.round(player.profile.total_playtime_seconds / 3600)}
                </dd>
                {player.profile.flags.length > 0 && (
                  <>
                    <dt>Flags</dt>
                    {player.profile.flags.map((flag) => (
                      <span>{flag.flag}</span>
                    ))}
                  </>
                )}
              </dl>
            </TabPanel>
            <TabPanel value="2">
              <Box component={'section'}>
                <Typography variant="h6" component={'h2'}>
                  Penalties
                </Typography>
                <dl>
                  <dt>Punish</dt>
                  <dd>{player.profile?.penalty_count['PUNISH'] ?? 0}</dd>
                  <dt>Kick</dt>
                  <dd>{player.profile?.penalty_count['KICK'] ?? 0}</dd>
                  <dt>Temporary ban</dt>
                  <dd>{player.profile?.penalty_count['TEMPBAN'] ?? 0}</dd>
                  <dt>Permanent ban</dt>
                  <dd>{player.profile?.penalty_count['PERMABAN'] ?? 0}</dd>
                </dl>
              </Box>
              <Box component={'section'}>
                <Typography variant="h6" component={'h2'}>
                  Received actions
                </Typography>
                {player.profile.received_actions
                  .slice(0, 2)
                  .map((action, i) => (
                    <Accordion square={true} key={action.action_type + i}>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls={`panel${i}-content`}
                        id={`panel${i}-header`}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="subtitle2">
                            {action.action_type}
                          </Typography>
                          <Typography
                            component={'span'}
                            sx={{ fontSize: '0.7rem' }}
                          >
                            {action.by} |{' '}
                            {dayjs(action.time).format('HH:MM DD.MM.YY')}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{action.reason}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-action-content"
                    id="panel-action-header"
                  >
                    Show all
                  </AccordionSummary>
                  <AccordionDetails>
                    {`This player received ${player.profile.received_actions.length} actions in total.`}
                  </AccordionDetails>
                  <AccordionActions>
                    <Button>Expand</Button>
                  </AccordionActions>
                </Accordion>
              </Box>
            </TabPanel>
            <TabPanel value="3">Comments</TabPanel>
          </TabContext>
        </ProfileWrapper>
      )}
    </ResponsiveDrawer>
  );
};
