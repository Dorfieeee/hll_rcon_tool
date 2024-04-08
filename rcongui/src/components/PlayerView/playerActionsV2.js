import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import GavelIcon from '@mui/icons-material/Gavel';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import SyncIcon from '@mui/icons-material/Sync';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MessageIcon from '@mui/icons-material/Message';
import StarIcon from '@mui/icons-material/Star';
import { postData } from '../../utils/fetchUtils';

/* 
    These parameters represents the fields of the payload object
    that is sent to the server with each action request.
    Each action requires a different set of fields but they all
    share these `defaultParams`.
*/
const defaultParams = [
    {
        name: 'steam_id_64',
        type: 'hidden',
        getValue: (player) => player.steam_id_64,
    },
    {
        name: 'player',
        type: 'hidden',
        getValue: (player) => player.name,
    }
]

const message = { name: 'message', type: 'text', label: 'Message', description: 'The message that will be displayed to the player.' }

const reason = { name: 'reason', type: 'text', label: 'Reason', description: 'The message that will be displayed to the player.' }

const duration = { name: 'duration', type: 'number', label: 'Duration', description: 'The duration for this action.' }

const expiration = { name: 'expiration', type: 'datetime', label: 'Expiration', description: 'The date the VIP will expire.' }

// In the UI, it does not make sense to ask for a reason and message
// at the same time as they are the same thing. However, the API
// expects both in the payload.
const executeAction = (endpoint) => async (payload) => {
    if ('reason' in payload) {
        payload.message = payload.reason
    }
    return await postData(
        process.env.REACT_APP_API_URL + endpoint,
        payload
    )
}

// The order of action objects here determins the order in the UI
export const playerActionsV2 = [
    {
        name: 'message',
        description: 'Show message in top right corner of game interface.',
        type: 'do_message_player',
        params: [
            ...defaultParams,
            message,
        ],
        icon: <MessageIcon />,
        execute: executeAction('do_message_player'),
    },
    {
        name: 'watch',
        description: 'Send Discord message upon player connection (using webhook config).',
        type: 'watch_player',
        params: [
            ...defaultParams,
        ],
        icon: <RemoveRedEyeIcon />,
        execute: executeAction('watch_player'),
    },
    {
        name: 'vip',
        description: 'Manage VIP.',
        type: 'do_add_vip',
        params: [
            ...defaultParams,
            expiration,
        ],
        icon: <StarIcon />,
        execute: executeAction('do_add_vip'),
    },
    {
        name: 'switch',
        description: 'Move player to opposite team.',
        type: 'do_switch_player_now',
        params: [
            ...defaultParams,
        ],
        icon: <SyncIcon />,
        execute: executeAction('do_switch_player_now'),
    },
    {
        name: 'switch on death',
        description: 'Move player to opposite team upon death.',
        type: 'switch_player_on_death',
        params: [
            ...defaultParams,
        ],
        icon: <SyncLockIcon />,
        execute: executeAction('switch_player_on_death'),
    },
    {
        name: 'punish',
        description: 'Kill player in-game if alive.',
        type: 'do_punish',
        params: [
            ...defaultParams,
            reason,
        ],
        icon: <WarningIcon />,
        execute: executeAction('do_punish'),
    },
    {
        name: 'kick',
        description: 'Remove player from server.',
        type: 'kick',
        params: [
            ...defaultParams,
            reason,
        ],
        icon: <SportsMartialArtsIcon />,
        execute: executeAction('kick'),
    },
    {
        name: 'tempBan',
        description: 'Issue immediate temporary ban to player.',
        type: 'temp_ban',
        params: [
            ...defaultParams,
            reason,
            duration,
        ],
        icon: <GavelIcon />,
        execute: executeAction('temp_ban'),
    },
    {
        name: 'permaBan',
        description: 'Initiate indefinite ban upon player\'s next connection.',
        type: 'perma_ban',
        params: [
            ...defaultParams,
            reason,
        ],
        icon: <BlockIcon />,
        execute: executeAction('perma_ban'),
    },

]
