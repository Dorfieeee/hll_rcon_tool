import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const ServerName = styled((props) => (
  <Typography component="span" variant="subtitle" noWrap {...props} />
))(() => {});

const ServerSummary = styled((props) => (
  <Stack direction={'row'} spacing={0.5} {...props} />
))(() => {});

const SummaryDetail = styled((props) => (
  <Typography component="span" variant="subtitle2" noWrap fontSize={'0.75rem'} {...props} />
))(() => {});

export const ServerStatus = ({ server }) => {
  return (
    <Wrapper>
      <ServerName>{server.name}</ServerName>
      <ServerSummary>
        <SummaryDetail>Online: {server.player_count}</SummaryDetail>
        <Divider orientation="vertical" flexItem />
        <SummaryDetail>{server.map}</SummaryDetail>
      </ServerSummary>
    </Wrapper>
  );
};
