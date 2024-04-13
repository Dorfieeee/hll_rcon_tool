import { Paper, Tooltip, Chip } from '@mui/material';
import { styled } from '@mui/system';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const BadgesList = ({ recipients }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        my: 2,
      }}
      component="ul"
    >
      {/* TODO */}
      {/* Move this up the component tree??? */}
      {recipients.map(({ recipient, status }) => {
        let removedClanName = recipient.name.replace(/^\[([^\]]*)\]/, ''); // remove `[clantags]`
        let shortedName = removedClanName.substring(0, 6);
        let label =
          removedClanName.length > 6 ? shortedName + '...' : shortedName;

        return (
          <ListItem key={recipient.steam_id_64}>
            <Tooltip title={recipient.name}>
              <Chip size="small" label={label} color={status} />
            </Tooltip>
          </ListItem>
        );
      })}
    </Paper>
  );
};
