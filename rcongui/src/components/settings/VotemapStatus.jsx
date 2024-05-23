import {
  Box,
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

  console.log(status)

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="h6" textAlign={'center'}>
        Current Map Vote
      </Typography>
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
            {status.selection.length ? status.selection.map((map) => (
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>{map}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  NoodleArms, NoodleArms, NoodleArms, NoodleArms, NoodleArms,
                  NoodleArms
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
              <TableCell>-</TableCell>
              <TableCell>No selection</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>-</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
