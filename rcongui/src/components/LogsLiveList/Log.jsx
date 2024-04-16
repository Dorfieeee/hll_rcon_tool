import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import moment from 'moment';

const Line = styled(Typography)(({ theme }) => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  tabSize: 2,
  fontFamily: 'monospace',
  fontSize: '14px',
  margin: 0,
  '&:hover': {
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
})(({ type }) => ({
  '&::before': {
    content: `"${actionToEmoji[type] ?? actionToEmoji['UNKNOWN']}"`,
    display: 'inline-block',
    paddingRight: '4px',
  },
}));

const Log = ({ log }) => {
  const timestamp = moment(new Date(log.timestamp_ms)).format(
    'HH:mm:ss, MMM DD'
  );
  const actionName = log.action.padEnd(16);

  return (
    <Line component={'pre'}>
      <Action type={log.action}></Action>
      {`\t`}
      {timestamp}
      {`\t`}
      {log.message}
    </Line>
  );
};

export default Log;
