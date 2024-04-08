import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
import moment from 'moment';

const Line = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  tabSize: 2,
  fontFamily: 'monospace',
  fontSize: '14px',
  margin: 0,
  '&:hover': {
    background: theme.palette.action.hover,
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
};

const Action = styled('span')((props) => ({
  '&::before': {
    content: `"${actionToEmoji[props.type]}"`,
    display: 'inline-block',
    paddingRight: '4px',
  },
}));

const Log = ({ log }) => {
    return (
        <Line component={'pre'} key={log.raw}>
        {` > `}
        {`\t`}
        {moment(new Date(log.timestamp_ms)).format('HH:mm:ss | MMM DD |')}
        {`\t`}
        <Action type={log.action}>{log.action.padEnd(16)}</Action>
        {`\t`}
        {log.message}
      </Line>
    )
}

export default Log;
