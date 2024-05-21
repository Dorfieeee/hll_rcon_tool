import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';

export const VotemapStatus = ({ status }) => {
  const { openConfirmDialog } = useConfirmDialog();
  return (
    <div>
      <Typography variant="h6" textAlign={'center'}>
        Current Map Vote
      </Typography>
      <Stack direction={'row'} justifyContent={'end'}>
        <Button variant="contained">New Selection</Button>
      </Stack>
      <TableContainer>
        <Table aria-label="Votemap selection result">
          <TableHead>
            <TableRow>
              <TableCell>Votes</TableCell>
              <TableCell>Maps</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>Voters</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status?.selection.map((map) => (
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>{map}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  NoodleArms, NoodleArms, NoodleArms, NoodleArms, NoodleArms,
                  NoodleArms
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
