import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WebhookIcon from '@mui/icons-material/Webhook';
import SettingsIcon from '@mui/icons-material/Settings';
import DnsIcon from '@mui/icons-material/Dns';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NoTransferIcon from '@mui/icons-material/NoTransfer';
import SpaIcon from '@mui/icons-material/Spa';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChatIcon from '@mui/icons-material/Chat';
import VideocamIcon from '@mui/icons-material/Videocam';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import CableIcon from '@mui/icons-material/Cable';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import NoStrollerIcon from '@mui/icons-material/NoStroller';
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLink = ({ to: path, icon: Icon, text }) => {
  return (
    <ListItemButton component={Link} to={path}>
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const Group = ({ groupName, icon: Icon, level = 1, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={groupName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={'auto'} unmountOnExit>
        <List
          sx={{ '& .MuiListItemButton-root': { pl: 2 + 2 * level } }}
          disablePadding
        >
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const Navigation = () => {
  return (
    <List component="nav">
      <NavigationLink to={'/'} text={'Dashboard'} icon={DashboardIcon} />
      <Divider />
      <NavigationLink to={'/live-view'} text={'Live'} icon={BoltIcon} />
      <NavigationLink to={'/team-view'} text={'Team'} icon={GroupsIcon} />
      <Divider />
      <NavigationLink
        to={'/settings/server'}
        text={'Server'}
        icon={SettingsIcon}
      />
      <NavigationLink to={'/settings/rcon'} text={'RCON'} icon={DnsIcon} />
      <Group groupName={'Automods'} icon={SmartToyIcon}>
        <NavigationLink
          to={'/settings/automods/seeding'}
          text={'Seeding'}
          icon={SpaIcon}
        />
        <NavigationLink
          to={'/settings/automods/no-leader'}
          text={'No Leader'}
          icon={PersonOffIcon}
        />
        <NavigationLink
          to={'/settings/automods/no-solotank'}
          text={'No Solotank'}
          icon={NoTransferIcon}
        />
        <NavigationLink
          to={'/settings/automods/player-level'}
          text={'Player level'}
          icon={NoStrollerIcon}
        />
      </Group>
      <Group groupName={'Webhooks'} icon={WebhookIcon}>
        <NavigationLink
          to={'/settings/webhooks/admin-ping'}
          text={'Admin Ping'}
          icon={PrivacyTipIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/audit'}
          text={'Audit'}
          icon={SimCardAlertIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/ingame-camera'}
          text={'Camera'}
          icon={VideocamIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/ingame-chat'}
          text={'Chat'}
          icon={ChatIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/kills'}
          text={'Kills'}
          icon={RestaurantIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/logs'}
          text={'Logs'}
          icon={TextSnippetIcon}
        />
        <NavigationLink
          to={'/settings/webhooks/watchlist'}
          text={'Watchlist'}
          icon={RemoveRedEyeIcon}
        />{' '}
      </Group>
      <Group groupName={'Miscelanous'} icon={MiscellaneousServicesIcon}>
        <NavigationLink
          to={'/settings/miscelanous/chat-commands'}
          text={'Chat Commands'}
          icon={RateReviewIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/expired-vip'}
          text={'Expired VIP'}
          icon={TimerOffIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/gtx-name-change'}
          text={'GTX Name Change'}
          icon={DriveFileRenameOutlineIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/name-kicks'}
          text={'Name Kicks'}
          icon={SportsMartialArtsIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/rcon-connection'}
          text={'RCON Connection'}
          icon={CableIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/rcon-server'}
          text={'RCON Server'}
          icon={DnsIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/scorebot'}
          text={'Scorebot'}
          icon={ScoreboardIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/steam-api'}
          text={'Steam API'}
          icon={RemoveRedEyeIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/tk-ban-connect'}
          text={'TK Ban Connect'}
          icon={GavelIcon}
        />
        <NavigationLink
          to={'/settings/miscelanous/vac-bans'}
          text={'VAC Bans'}
          icon={AccountBalanceIcon}
        />
      </Group>
      <Divider />
      <NavigationLink to={'/players'} text={'Players'} icon={PeopleIcon} />
      <NavigationLink to={'/logs'} text={'Logs'} icon={TextSnippetIcon} />
      <NavigationLink
        to={'/audit-logs'}
        text={'Audit Logs'}
        icon={SimCardAlertIcon}
      />
      <Divider />
      <NavigationLink to={'/live-sessions'} text={'Sessions'} icon={BrowseGalleryIcon} />
      <NavigationLink to={'/live-game'} text={'Game'} icon={SportsEsportsIcon} />
      <NavigationLink to={'/game-history'} text={'Game Histoy'} icon={HourglassBottomIcon} />
    </List>
  );
};

export default Navigation;
