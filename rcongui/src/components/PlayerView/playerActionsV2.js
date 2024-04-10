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
import { MessageFormFields } from './actionFields/MessageFormFields';
import { PunishFormFields } from './actionFields/PunishFormFields';
import { WatchFormFields } from './actionFields/WatchFormFields';
import { ConfirmationOnly } from './actionFields/ConfirmationOnly';
import { AddVipFormFields } from './actionFields/AddVipFormFields';

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
        component: MessageFormFields,
        icon: <MessageIcon />,
        execute: executeAction('do_message_player'),
    },
    {
        name: 'watch',
        description: 'Send Discord message upon player connection (using webhook config).',
        type: 'watch_player',
        component: WatchFormFields,
        icon: <RemoveRedEyeIcon />,
        execute: executeAction('watch_player'),
    },
    {
        name: 'vip',
        description: 'Manage VIP.',
        type: 'do_add_vip',
        component: AddVipFormFields,
        icon: <StarIcon />,
        execute: executeAction('do_add_vip'),
    },
    {
        name: 'switch',
        description: 'Move player to opposite team.',
        type: 'do_switch_player_now',
        component: ConfirmationOnly,
        icon: <SyncIcon />,
        execute: executeAction('do_switch_player_now'),
    },
    {
        name: 'switch on death',
        description: 'Move player to opposite team upon death.',
        type: 'switch_player_on_death',
        component: ConfirmationOnly,
        icon: <SyncLockIcon />,
        execute: executeAction('switch_player_on_death'),
    },
    {
        name: 'punish',
        description: 'Kill player in-game if alive.',
        type: 'do_punish',
        component: PunishFormFields,
        icon: <WarningIcon />,
        execute: executeAction('do_punish'),
    },
    {
        name: 'kick',
        description: 'Remove player from server.',
        type: 'kick',
        component: PunishFormFields,
        icon: <SportsMartialArtsIcon />,
        execute: executeAction('kick'),
    },
    // {
    //     name: 'tempBan',
    //     description: 'Issue immediate temporary ban to player.',
    //     type: 'temp_ban',
    //     params: [
    //         ...defaultParams,
    //         reason,
    //         duration,
    //     ],
    //     icon: <GavelIcon />,
    //     execute: executeAction('temp_ban'),
    // },
    {
        name: 'permaBan',
        description: 'Initiate indefinite ban upon player\'s next connection.',
        type: 'perma_ban',
        component: PunishFormFields,
        icon: <BlockIcon />,
        execute: executeAction('perma_ban'),
    },

]
