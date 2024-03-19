import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerView from "./components/PlayerView";
import useStyles from "./components/useStyles";
import Grid from "@material-ui/core/Grid";
import Logs from "./components/LogsView/logs";
import CssBaseline from "@material-ui/core/CssBaseline";
import HLLSettings from "./components/SettingsView/hllSettings";
import { ThemeProvider } from "@material-ui/styles";
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import LogsHistory from "./components/LogsHistory";
import PlayersHistory from "./components/PlayersHistory";
import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import RconSettings from "./components/RconSettings";
import ServicesList from "./components/Services";
import { Typography } from "@material-ui/core";
import ScoreMenu from "./components/Scoreboard/ScoreMenu";
import GamesScore from "./components/Scoreboard/GamesScore";
import PlayerInfo from "./components/PlayerInfo";
import {
  LiveGameScore,
  LiveSessionScore,
} from "./components/Scoreboard/LiveScore";
import ServerInfo from "./components/Embeds/ServerInfo";
import ServerStatsPage from "./components/ServerStats";
import GameView from "./components/GameView";
import AuditLog from "./components/AuditLog";
import {
  AdminPingWebhooks,
  AuditWebhooks,
  WatchlistWebhooks,
  CameraWebhooks,
  ChatWebhooks,
  KillWebhooks,
  LogLineWebhooks,
} from "./components/UserSettings/webHooks";
import {
  LevelAutoMod,
  NoLeaderAutoMod,
  SeedingAutoMod,
  NoSoloTankAutoMod,
} from "./components/UserSettings/autoMods";
import {
  RconConnectionSettings,
  RconServerSettings,
  Scorebot,
  SteamAPI,
  VacGameBans,
  TeamKillBanOnConnect,
  NameKicks,
  ExpiredVIP,
  GTXNameChange,
  ChatCommands,
} from "./components/UserSettings/miscellaneous";
import themes from "./themes";

// This will take further refactoring :]
const Settings = () => (
  <Switch>
    <Route path="/settings/settings">
      <Grid container>
        <Grid item sm={12} lg={6}>
          <HLLSettings />
        </Grid>
        <Grid item sm={12} lg={6}>
          <RconSettings />
        </Grid>
      </Grid>
    </Route>
    <Route path="/settings/audit-webhooks">
      <Grid container spacing={2}>
        <AuditWebhooks
          description="Audit Webhooks"
          getEndpoint="get_audit_discord_webhooks_config"
          setEndpoint="set_audit_discord_webhooks_config"
          validateEndpoint="validate_audit_discord_webhooks_config"
          describeEndpoint="describe_audit_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/admin-webhooks">
      <Grid container spacing={2}>
        <AdminPingWebhooks
          description="Admin Ping Webhooks"
          getEndpoint="get_admin_pings_discord_webhooks_config"
          setEndpoint="set_admin_pings_discord_webhooks_config"
          validateEndpoint="validate_admin_pings_discord_webhooks_config"
          describeEndpoint="describe_admin_pings_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/watchlist-webhooks">
      <Grid container spacing={2}>
        <WatchlistWebhooks
          description="Watchlist Webhooks"
          getEndpoint="get_watchlist_discord_webhooks_config"
          setEndpoint="set_watchlist_discord_webhooks_config"
          validateEndpoint="validate_watchlist_discord_webhooks_config"
          describeEndpoint="describe_watchlist_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/camera-webhooks">
      <Grid container spacing={2}>
        <CameraWebhooks
          description="Camera Webhooks"
          getEndpoint="get_camera_discord_webhooks_config"
          setEndpoint="set_camera_discord_webhooks_config"
          validateEndpoint="validate_camera_discord_webhooks_config"
          describeEndpoint="describe_camera_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/chat-webhooks">
      <Grid container spacing={2}>
        <ChatWebhooks
          description="Chat Webhooks"
          getEndpoint="get_chat_discord_webhooks_config"
          setEndpoint="set_chat_discord_webhooks_config"
          validateEndpoint="validate_chat_discord_webhooks_config"
          describeEndpoint="describe_chat_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/kill-webhooks">
      <Grid container spacing={2}>
        <KillWebhooks
          description="Kill/Team Kill Webhooks"
          getEndpoint="get_kills_discord_webhooks_config"
          setEndpoint="set_kills_discord_webhooks_config"
          validateEndpoint="validate_kills_discord_webhooks_config"
          describeEndpoint="describe_kills_discord_webhooks_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/log-lines">
      <Grid container spacing={2}>
        <LogLineWebhooks
          description="Log Line Webhooks"
          getEndpoint="get_log_line_webhook_config"
          setEndpoint="set_log_line_webhook_config"
          validateEndpoint="validate_log_line_webhook_config"
          describeEndpoint="describe_log_line_webhook_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/automod-level">
      <Grid container spacing={2}>
        <LevelAutoMod
          description="Level Auto Mod"
          getEndpoint="get_auto_mod_level_config"
          setEndpoint="set_auto_mod_level_config"
          validateEndpoint="validate_auto_mod_level_config"
          describeEndpoint="describe_auto_mod_level_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/automod-no-leader">
      <Grid container spacing={2}>
        <NoLeaderAutoMod
          description="No Leader Auto Mod"
          getEndpoint="get_auto_mod_no_leader_config"
          setEndpoint="set_auto_mod_no_leader_config"
          validateEndpoint="validate_auto_mod_no_leader_config"
          describeEndpoint="describe_auto_mod_no_leader_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/automod-seeding">
      <Grid container spacing={2}>
        <SeedingAutoMod
          description="Seeding Auto Mod"
          getEndpoint="get_auto_mod_seeding_config"
          setEndpoint="set_auto_mod_seeding_config"
          validateEndpoint="validate_auto_mod_seeding_config"
          describeEndpoint="describe_auto_mod_seeding_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/automod-solo-tank">
      <Grid container spacing={2}>
        <NoSoloTankAutoMod
          description="No Solo Tank Auto Mod"
          getEndpoint="get_auto_mod_solo_tank_config"
          setEndpoint="set_auto_mod_solo_tank_config"
          validateEndpoint="validate_auto_mod_solo_tank_config"
          describeEndpoint="describe_auto_mod_solo_tank_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/rcon-gameserver">
      <Grid container spacing={2}>
        <RconConnectionSettings
          description="Game Server Connection Settings"
          getEndpoint="get_rcon_connection_settings_config"
          setEndpoint="set_rcon_connection_settings_config"
          validateEndpoint="validate_rcon_connection_settings_config"
          describeEndpoint="describe_rcon_connection_settings_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/rcon-server">
      <Grid container spacing={2}>
        <RconServerSettings
          description="General CRCON Settings"
          getEndpoint="get_rcon_server_settings_config"
          setEndpoint="set_rcon_server_settings_config"
          validateEndpoint="validate_rcon_server_settings_config"
          describeEndpoint="describe_rcon_server_settings_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/chat-commands">
      <Grid container spacing={2}>
        <ChatCommands
          description="Chat Commands Settings"
          getEndpoint="get_chat_commands_config"
          setEndpoint="set_chat_commands_config"
          validateEndpoint="validate_chat_commands_config"
          describeEndpoint="describe_chat_commands_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/scorebot">
      <Grid container spacing={2}>
        <Scorebot
          description="Scorebot"
          getEndpoint="get_scorebot_config"
          setEndpoint="set_scorebot_config"
          validateEndpoint="validate_scorebot_config"
          describeEndpoint="describe_scorebot_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/steam">
      <Grid container spacing={2}>
        <SteamAPI
          description="Steam API"
          getEndpoint="get_steam_config"
          setEndpoint="set_steam_config"
          validateEndpoint="validate_steam_config"
          describeEndpoint="describe_steam_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/vac-gamebans">
      <Grid container spacing={2}>
        <VacGameBans
          description="VAC/Game Bans"
          getEndpoint="get_vac_game_bans_config"
          setEndpoint="set_vac_game_bans_config"
          validateEndpoint="validate_vac_game_bans_config"
          describeEndpoint="describe_vac_game_bans_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/tk-ban">
      <Grid container spacing={2}>
        <TeamKillBanOnConnect
          description="TK Ban On Connect"
          getEndpoint="get_tk_ban_on_connect_config"
          setEndpoint="set_tk_ban_on_connect_config"
          validateEndpoint="validate_tk_ban_on_connect_config"
          describeEndpoint="describe_tk_ban_on_connect_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/name-kicks">
      <Grid container spacing={2}>
        <NameKicks
          description="Name Kicks"
          getEndpoint="get_name_kick_config"
          setEndpoint="set_name_kick_config"
          validateEndpoint="validate_name_kick_config"
          describeEndpoint="describe_name_kick_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/expired-vip">
      <Grid container spacing={2}>
        <ExpiredVIP
          description="Expired VIP"
          getEndpoint="get_expired_vip_config"
          setEndpoint="set_expired_vip_config"
          validateEndpoint="validate_expired_vip_config"
          describeEndpoint="describe_expired_vip_config"
        />
      </Grid>
    </Route>
    <Route path="/settings/gtx-server-name-change">
      <Grid container spacing={2}>
        <GTXNameChange
          description="GTX Server Name Change"
          getEndpoint="get_server_name_change_config"
          setEndpoint="set_server_name_change_config"
          validateEndpoint="validate_server_name_change_config"
          describeEndpoint="describe_server_name_change_config"
        />
      </Grid>
    </Route>
  </Switch>
)

const CombinedHistory = () => (
  <Grid container spacing={2}>
    <Grid item sm={12}>
      <Typography variant="h4">Players</Typography>
    </Grid>
    <Grid item sm={12}>
      <PlayersHistory />
    </Grid>
    <Grid item sm={12}>
      <Typography variant="h4">Historical Logs</Typography>
    </Grid>
    <Grid item sm={12}>
      <LogsHistory />
    </Grid>
  </Grid>
)

const Live = () => {
  const [mdSize, setMdSize] = React.useState(6);
  const [direction, setDirection] = React.useState("row");
  const isFullScreen = () => mdSize !== 6;
  const toggleMdSize = () => (isFullScreen() ? setMdSize(6) : setMdSize(12));

  return (
    <Grid container spacing={1} direction={direction}>
      <Grid item sm={12} md={mdSize}>
        <PlayerView
          onFullScreen={() => {
            setDirection("row");
            toggleMdSize();
          }}
          isFullScreen={isFullScreen()}
        />
      </Grid>
      <Grid item sm={12} md={mdSize}>
        <Logs
          onFullScreen={() => {
            direction === "column-reverse"
              ? setDirection("row")
              : setDirection("column-reverse");
            toggleMdSize();
          }}
          isFullScreen={isFullScreen()}
        />
      </Grid>
    </Grid>
  );
};

const publicRoutes = [
  {
    path: "/gameview",
    exact: true,
    component: GameView,
  },
  {
    path: "/serverInfo",
    exact: true,
    component: ServerInfo,
  },
  {
    path: "/auditlogs",
    exact: true,
    component: AuditLog,
  },
  {
    path: "/livescore",
    exact: true,
    component: LiveSessionScore,
  },
  {
    path: process.env.REACT_APP_PUBLIC_BUILD ? "/" : "/livegamescore",
    exact: true,
    component: LiveGameScore,
  },
  {
    path: "/gamescoreboard/:slug",
    exact: false,
    component: GamesScore,
  },
  {
    path: "/gamescoreboard",
    exact: false,
    component: GamesScore,
  },
];

const adminRoutes = [
  {
    path: "/",
    exact: true,
    component: Live,
  },
  {
    path: "/history",
    exact: false,
    component: PlayersHistory,
  },
  {
    path: "/player/:steamId64",
    exact: false,
    component: PlayerInfo,
  },
  {
    path: "/settings",
    exact: false,
    component: Settings,
  },
  {
    path: "/",
    exact: false,
    component: Live,
  },
  {
    path: "/services",
    exact: false,
    component: ServicesList,
  },
  {
    path: "/logs",
    exact: false,
    component: LogsHistory,
  },
  {
    path: "/combined_history",
    exact: false,
    component: CombinedHistory,
  },
  {
    path: "/server",
    exact: false,
    component: ServerStatsPage,
  },
]

const generateRoutes = (routes) => {
  return routes.map(route => {
    const ChildComponent = route.component;
    return (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <ChildComponent />
      </Route>
    )
  })
}

const EmbedApp = () => {

  return (
    <ThemeProvider theme={themes.HLL_No_Background}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          {generateRoutes(publicRoutes)}
          {!process.env.REACT_APP_PUBLIC_BUILD ? generateRoutes(adminRoutes) : null}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const PublicBuildApp = () => (
  <ThemeProvider theme={themes.HLL}>
    <ToastContainer />
    <CssBaseline />
    <ScoreMenu />
    <HashRouter>
      <Switch>
        {generateRoutes(publicRoutes)}
      </Switch>
    </HashRouter>
    <Footer />
  </ThemeProvider>
)

// Add theme toggle to appbar
const DefaultApp = () => {
  const userTheme = localStorage.getItem("crconTheme")

  return (
    <ThemeProvider theme={themes[userTheme] ?? themes.Light}>
      <CssBaseline />
      <ToastContainer />
      <HashRouter>
        <Header />
        <Switch>
          {generateRoutes(publicRoutes)}
          {!process.env.REACT_APP_PUBLIC_BUILD ? generateRoutes(adminRoutes) : null}
        </Switch>
        <Footer />
      </HashRouter>
    </ThemeProvider>
  )
}

function App() {
  const isPublicBuild = process.env.REACT_APP_PUBLIC_BUILD;
  const [isEmbed, setIsEmbed] = React.useState(false);

  React.useEffect(() => {
    const serarchParams = new URLSearchParams(window.location.search);

    setIsEmbed(serarchParams.has("embed"));
  }, [window.location.search]);


  if (isEmbed) {
    return <EmbedApp />
  }

  if (isPublicBuild) {
    return <PublicBuildApp />
  }

  return <DefaultApp />

}

export default App;
