import AuditLog from "../components/AuditLog";
import ServerInfo from "../components/Embeds/ServerInfo";
import GameView from "../components/GameView";
import GamesScore from "../components/Scoreboard/GamesScore";
import { LiveGameScore, LiveSessionScore } from "../components/Scoreboard/LiveScore";

export default [
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
