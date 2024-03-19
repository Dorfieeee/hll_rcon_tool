import { LevelAutoMod, NoLeaderAutoMod, NoSoloTankAutoMod, SeedingAutoMod } from "../components/UserSettings/autoMods";
import { ChatCommands, ExpiredVIP, GTXNameChange, NameKicks, RconConnectionSettings, RconServerSettings, Scorebot, SteamAPI, TeamKillBanOnConnect, VacGameBans } from "../components/UserSettings/miscellaneous";
import { AdminPingWebhooks, AuditWebhooks, CameraWebhooks, ChatWebhooks, KillWebhooks, LogLineWebhooks, WatchlistWebhooks } from "../components/UserSettings/webHooks";

export default [
    {
        path: "/settings/audit-webhooks",
        name: "Audit Webhooks",
        description: "audit_discord_webhooks_config",
        component: AuditWebhooks,
    },
    {
        path: "/settings/admin-webhooks",
        name: "admin_pings_discord_webhooks_config",
        description: "Admin Ping Webhooks",
        component: AdminPingWebhooks,
    },
    {
        path: "/settings/watchlist-webhooks",
        name: "watchlist_discord_webhooks_config",
        description: "Watchlist Webhooks",
        component: WatchlistWebhooks,
    },
    {
        path: "/settings/camera-webhooks",
        name: "camera_discord_webhooks_config",
        description: "Camera Webhooks",
        component: CameraWebhooks,
    },
    {
        path: "/settings/chat-webhooks",
        name: "chat_discord_webhooks_config",
        description: "Chat Webhooks",
        component: ChatWebhooks,
    },
    {
        path: "/settings/kill-webhooks",
        name: "kills_discord_webhooks_config",
        description: "Kill/Team Kill Webhooks",
        component: KillWebhooks,
    },
    {
        path: "/settings/log-lines",
        name: "log_line_webhooks_config",
        description: "Log Line Webhooks",
        component: LogLineWebhooks,
    },
    {
        path: "/settings/automod-level",
        name: "auto_mod_level_config",
        description: "Level Auto Mod",
        component: LevelAutoMod,
    },
    {
        path: "/settings/automod-no-leader",
        name: "auto_mod_no_leader_config",
        description: "No Leader Auto Mod",
        component: NoLeaderAutoMod,
    },
    {
        path: "/settings/automod-seeding",
        name: "auto_mod_seeding_config",
        description: "Seeding Auto Mod",
        component: SeedingAutoMod,
    },
    {
        path: "/settings/automod-solo-tank",
        name: "auto_mod_solo_tank_config",
        description: "No Solo Tank Auto Mod",
        component: NoSoloTankAutoMod,
    },
    {
        path: "/settings/rcon-gameserver",
        name: "rcon_connection_settings_config",
        description: "Game Server Connection Settings",
        component: RconConnectionSettings,
    },
    {
        path: "/settings/rcon-server",
        name: "rcon_server_settings_config",
        description: "General CRCON Settings",
        component: RconServerSettings,
    },
    {
        path: "/settings/chat-commands",
        name: "chat_commands_config",
        description: "Chat Commands Settings",
        component: ChatCommands,
    },
    {
        path: "/settings/scorebot",
        name: "scorebot_config",
        description: "Scorebot",
        component: Scorebot,
    },
    {
        path: "/settings/steam",
        name: "steam_config",
        description: "Steam API",
        component: SteamAPI,
    },
    {
        path: "/settings/vac-gamebans",
        name: "vac_game_bans_config",
        description: "VAC/Game Bans",
        component: VacGameBans,
    },
    {
        path: "/settings/tk-ban",
        name: "tk_ban_on_connect_config",
        description: "TK Ban On Connect",
        component: TeamKillBanOnConnect,
    },
    {
        path: "/settings/name-kicks",
        name: "name_kick_config",
        description: "Name Kicks",
        component: NameKicks,
    },
    {
        path: "/settings/expired-vip",
        name: "expired_vip_config",
        description: "Expired VIP",
        component: ExpiredVIP,
    },
    {
        path: "/settings/gtx-server-name-change",
        name: "server_name_change_config",
        description: "GTX Server Name Change",
        component: GTXNameChange,
    }
];