import React from 'react';
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
import MapIcon from '@mui/icons-material/Map';
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
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const NavItem = styled(ListItemButton)(({ theme }) => ({
  paddingTop: theme.spacing(0.35),
  paddingBottom: theme.spacing(0.35),
}))

const NavigationLink = ({ to: path, icon: Icon, text }) => {
  return (
    <NavItem component={Link} to={path} >
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={text} />
    </NavItem>
  );
};

const Group = ({ groupName, icon: Icon, level = 1, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <NavItem onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={groupName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </NavItem>
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
        <NavigationLink
        to={'/settings/maps'}
        text={'Maps'}
        icon={MapIcon}
      />
      <NavigationLink to={'/settings/rcon'} text={'RCON'} icon={DnsIcon} />
      <Group groupName={'Automods'} icon={SmartToyIcon}>
        <NavigationLink
          to={'/features/automods/seeding'}
          text={'Seeding'}
          icon={SpaIcon}
        />
        <NavigationLink
          to={'/features/automods/no-leader'}
          text={'No Leader'}
          icon={PersonOffIcon}
        />
        <NavigationLink
          to={'/features/automods/no-solotank'}
          text={'No Solotank'}
          icon={NoTransferIcon}
        />
        <NavigationLink
          to={'/features/automods/player-level'}
          text={'Player level'}
          icon={NoStrollerIcon}
        />
      </Group>
      <Group groupName={'Webhooks'} icon={WebhookIcon}>
        <NavigationLink
          to={'/features/webhooks/admin-ping'}
          text={'Admin Ping'}
          icon={PrivacyTipIcon}
        />
        <NavigationLink
          to={'/features/webhooks/audit'}
          text={'Audit'}
          icon={SimCardAlertIcon}
        />
        <NavigationLink
          to={'/features/webhooks/ingame-camera'}
          text={'Camera'}
          icon={VideocamIcon}
        />
        <NavigationLink
          to={'/features/webhooks/ingame-chat'}
          text={'Chat'}
          icon={ChatIcon}
        />
        <NavigationLink
          to={'/features/webhooks/kills'}
          text={'Kills'}
          icon={RestaurantIcon}
        />
        <NavigationLink
          to={'/features/webhooks/logs'}
          text={'Logs'}
          icon={TextSnippetIcon}
        />
        <NavigationLink
          to={'/features/webhooks/watchlist'}
          text={'Watchlist'}
          icon={RemoveRedEyeIcon}
        />{' '}
      </Group>
      <Group groupName={'Miscelanous'} icon={MiscellaneousServicesIcon}>
        <NavigationLink
          to={'/features/miscelanous/chat-commands'}
          text={'Chat Commands'}
          icon={RateReviewIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/expired-vip'}
          text={'Expired VIP'}
          icon={TimerOffIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/gtx-name-change'}
          text={'GTX Name Change'}
          icon={DriveFileRenameOutlineIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/name-kicks'}
          text={'Name Kicks'}
          icon={SportsMartialArtsIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/rcon-connection'}
          text={'RCON Connection'}
          icon={CableIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/rcon-server'}
          text={'RCON Server'}
          icon={DnsIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/scorebot'}
          text={'Scorebot'}
          icon={ScoreboardIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/steam-api'}
          text={'Steam API'}
          icon={RemoveRedEyeIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/tk-ban-connect'}
          text={'TK Ban Connect'}
          icon={GavelIcon}
        />
        <NavigationLink
          to={'/features/miscelanous/vac-bans'}
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
