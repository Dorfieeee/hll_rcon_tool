import { Typography } from '@mui/material';
import { styled, width } from '@mui/system';
import moment from 'moment';

export const Line = styled(Typography)(({ theme }) => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  tabSize: 2,
  fontFamily: 'monospace',
  fontSize: '0.8em',
  margin: 0,
  '&:hover, &:focus': {
    background: theme.palette.action.hover,
    textOverflow: 'none',
    whiteSpace: 'pre-wrap',
  },
}));

const actionToEmoji = {
  ADMIN: '🚨',
  'ADMIN MISC': '🚨',
  'ADMIN IDLE': '💤',
  'ADMIN ANTI-CHEAT': '🚷',
  'ADMIN BANNED': '⌛',
  'ADMIN PERMA BANNED': '⛔',
  'ADMIN KICKED': '🚷',
  CHAT: '💬',
  CAMERA: '👀',
  'CHAT[Allies]': '🟦',
  'CHAT[Allies][Team]': '🟦',
  'CHAT[Allies][Unit]': '🟦',
  'CHAT[Axis]': '🟥',
  'CHAT[Axis][Team]': '🟥',
  'CHAT[Axis][Unit]': '🟥',
  CONNECTED: '🛬',
  DISCONNECTED: '🛫',
  KILL: '💀',
  MATCH: '🏁',
  'MATCH ENDED': '🏁',
  'MATCH START': '🏁',
  MESSAGE: '📢',
  'TEAM KILL': '⚠️',
  TEAMSWITCH: '♻️',
  'TK AUTO': '🚷',
  'TK AUTO BANNED': '⌛',
  'TK AUTO KICKED': '🚷',
  VOTE: '🙋',
  'VOTE COMPLETED': '🙋',
  'VOTE EXPIRED': '🙋',
  'VOTE PASSED': '🙋',
  'VOTE STARTED': '🙋',
  UNKNOWN: '❓',
};

const Action = styled('span', {
  shouldForwardProp: (props) => props !== 'type',
})(({ theme, type }) => ({
  width: '16em',
  display: 'inline-block',
  '&::before': {
    content: `"${actionToEmoji[type] ?? actionToEmoji['UNKNOWN']}"`,
    display: 'inline-block',
    paddingRight: theme.spacing(1),
  },
}));

const Log = ({ log }) => {
  const timestamp = moment(new Date(log.timestamp_ms)).format(
    'HH:mm:ss, MMM DD'
  );

  return (
    <Line component={'pre'} tabIndex={-1}>
      {timestamp}
      {`\t`}
      <Action type={log.action}>{log.action}</Action>
      {`\t`}
      {log.message}
    </Line>
  );
};

export default Log;
