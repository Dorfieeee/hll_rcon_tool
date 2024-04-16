import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../pages/root";
import ErrorPage from "../pages/error";
import IndexPage from "../pages/index"
import LiveView from "../pages/live-view";
import TeamView from "../components/GameViewV2";
import Login from "../pages/login/login";
import loginAction from "../pages/login/action";
import rootAction from "../pages/action";
import rootLoader from "../pages/loader"
import HLLSettings from "../components/SettingsView/hllSettings";
import RconSettings from "../components/RconSettings/rconSettings";
import {
    LevelAutoMod,
    NoLeaderAutoMod,
    NoSoloTankAutoMod,
    SeedingAutoMod,
  } from '../components/UserSettings/autoMods';
  import {
    ChatCommands,
    ExpiredVIP,
    GTXNameChange,
    NameKicks,
    RconConnectionSettings,
    RconServerSettings,
    Scorebot,
    SteamAPI,
    TeamKillBanOnConnect,
    VacGameBans,
  } from '../components/UserSettings/miscellaneous';
  import {
    AdminPingWebhooks,
    AuditWebhooks,
    CameraWebhooks,
    ChatWebhooks,
    KillWebhooks,
    LogLineWebhooks,
    WatchlistWebhooks,
  } from '../components/UserSettings/webHooks';
import { LiveGameScore, LiveSessionScore } from "../components/Scoreboard/LiveScore";
import GamesScore from "../components/Scoreboard/GamesScore";
import PlayersHistory from "../components/PlayersHistory";
import LogsHistory from "../components/LogsHistory";
import AuditLog from "../components/AuditLog"
import PlayerInfo from "../components/PlayerInfo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: '',
                element: <IndexPage />,
            },
            {
                path: 'live-view',
                element: <LiveView />,
            },
            {
                path: 'team-view',
                element: <TeamView />,
            },
            {
                path: 'settings',
                children: [
                    {
                        path: 'server',
                        element: <HLLSettings />,
                    },
                    {
                        path: 'rcon',
                        element: <RconSettings />
                    },
                    {
                        path: 'automods',
                        children: [
                            {
                                path: 'player-level',
                                element: <LevelAutoMod />
                            },
                            {
                                path: 'no-leader',
                                element: <NoLeaderAutoMod />
                            },
                            {
                                path: 'no-solotank',
                                element: <NoSoloTankAutoMod />
                            },
                            {
                                path: 'seeding',
                                element: <SeedingAutoMod />
                            },
                        ]
                    },
                    {
                        path: 'webhooks',
                        children: [
                            {
                                path: 'admin-ping',
                                element: <AdminPingWebhooks />
                            },
                            {
                                path: 'audit',
                                element: <AuditWebhooks />
                            },
                            {
                                path: 'ingame-camera',
                                element: <CameraWebhooks />
                            },
                            {
                                path: 'ingame-chat',
                                element: <ChatWebhooks />
                            },
                            {
                                path: 'kills',
                                element: <KillWebhooks />
                            },
                            {
                                path: 'logs',
                                element: <LogLineWebhooks />
                            },
                            {
                                path: 'watchlist',
                                element: <WatchlistWebhooks />
                            },
                        ]
                    },
                    {
                        path: 'miscelanous',
                        children: [
                            {
                                path: 'chat-commands',
                                element: <ChatCommands />
                            },
                            {
                                path: 'expired-vip',
                                element: <ExpiredVIP />
                            },
                            {
                                path: 'gtx-name-change',
                                element: <GTXNameChange />
                            },
                            {
                                path: 'name-kicks',
                                element: <NameKicks />
                            },
                            {
                                path: 'rcon-connection',
                                element: <RconConnectionSettings />
                            },
                            {
                                path: 'rcon-server',
                                element: <RconServerSettings />
                            },
                            {
                                path: 'scorebot',
                                element: <Scorebot />
                            },
                            {
                                path: 'steam-api',
                                element: <SteamAPI />
                            },
                            {
                                path: 'tk-ban-connect',
                                element: <TeamKillBanOnConnect />
                            },
                            {
                                path: 'vac-bans',
                                element: <VacGameBans />
                            },
                        ]
                    },
                ]
            },
            {
                path: 'players',
                element: <PlayersHistory />
            },
            {
                path: 'players/:steamId64',
                element: <PlayerInfo />
            },
            {
                path: 'logs',
                element: <LogsHistory />
            },
            {
                path: 'audit-logs',
                element: <AuditLog />
            },
            {
                path: 'live-sessions',
                element: <LiveSessionScore />
            },
            {
                path: 'live-game',
                element: <LiveGameScore />
            },
            {
                path: 'game-history',
                element: <GamesScore />
            },
            {
                path: 'game-history/:id',
                element: <GamesScore />
            }
        ]
    },
    {
        path: 'login',
        element: <Login />,
        action: loginAction,
    },
])

export default router;