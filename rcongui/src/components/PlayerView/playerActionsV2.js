import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import GavelIcon from '@mui/icons-material/Gavel';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import SyncIcon from '@mui/icons-material/Sync';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MessageIcon from '@mui/icons-material/Message';
import StarIcon from '@mui/icons-material/Star';
import FlagIcon from '@mui/icons-material/Flag';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { postData } from '../../utils/fetchUtils';
import { MessageFormFields } from './actionFields/MessageFormFields';
import { PunishFormFields } from './actionFields/PunishFormFields';
import { WatchFormFields } from './actionFields/WatchFormFields';
import { ConfirmationOnly } from './actionFields/ConfirmationOnly';
import { AddVipFormFields } from './actionFields/AddVipFormFields';
import { TempBanFormFields } from './actionFields/TempBanFormFields';
import { PermaBanFormFields } from './actionFields/PermaBanFormFields';
import { AddFlagFormFields } from './actionFields/AddFlagFormFields';
import { AddCommentFormFields } from './actionFields/AddCommentFormFields';

// In the UI, it does not make sense to ask for a reason and message
// at the same time as they are the same thing. However, the API
// expects both in the payload.
const executeAction = (endpoint) => async (payload) => {
    if ('reason' in payload) {
        payload.message = payload.reason
    }
    if ('player' in payload) {
        payload.name = payload.player
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
        component: MessageFormFields,
        icon: <MessageIcon />,
        execute: executeAction('do_message_player'),
    },
    {
        name: 'watch',
        description: 'Send Discord message upon player connection (using webhook config).',
        component: WatchFormFields,
        icon: <RemoveRedEyeIcon />,
        execute: executeAction('watch_player'),
    },
    {
        name: 'vip',
        description: 'Manage VIP.',
        component: AddVipFormFields,
        icon: <StarIcon />,
        execute: executeAction('do_add_vip'),
    },
    {
        name: 'switch',
        description: 'Move player to opposite team.',
        component: ConfirmationOnly,
        icon: <SyncIcon />,
        execute: executeAction('do_switch_player_now'),
    },
    {
        name: 'switch on death',
        description: 'Move player to opposite team upon death.',
        component: ConfirmationOnly,
        icon: <SyncLockIcon />,
        execute: executeAction('switch_player_on_death'),
    },
    {
        name: 'punish',
        description: 'Kill player in-game if alive.',
        component: PunishFormFields,
        icon: <WarningIcon />,
        execute: executeAction('do_punish'),
    },
    {
        name: 'kick',
        description: 'Remove player from server.',
        component: PunishFormFields,
        icon: <SportsMartialArtsIcon />,
        execute: executeAction('do_kick'),
    },
    {
        name: 'tempBan',
        description: 'Issue immediate temporary ban to player.',
        component: TempBanFormFields,
        icon: <GavelIcon />,
        execute: executeAction('do_temp_ban'),
    },
    {
        name: 'permaBan',
        description: 'Initiate immediate indefinite ban to player.',
        component: PermaBanFormFields,
        icon: <BlockIcon />,
        execute: executeAction('do_perma_ban'),
    },
    {
        name: 'flag',
        description: 'Assign a flag to the player.',
        component: AddFlagFormFields,
        icon: <FlagIcon />,
        execute: executeAction('flag_player'),
    },
    {
        name: 'comment',
        description: 'Add a comment to the player profile.',
        component: AddCommentFormFields,
        icon: <AddCommentIcon />,
        execute: executeAction('post_player_comment'),
    },

]
