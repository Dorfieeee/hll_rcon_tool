import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FormCard } from './cards';

export const VotemapStatus = ({ status }) => {
  return (
    <Paper>
      <FormCard fullWidth>
        <Stack direction="row" gap={1} alignItems={'center'} flexWrap={'wrap'}>
          <Typography variant="h6">Current Map Vote</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              console.log('factory settings');
            }}
            color="warning"
          >
            Reset
          </Button>
        </Stack>
      </FormCard>
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
            {status.selection.length ? (
              status.selection.map((map) => (
                <TableRow>
                  <TableCell>0</TableCell>
                  <TableCell>{map}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    NoodleArms, NoodleArms, NoodleArms, NoodleArms, NoodleArms,
                    NoodleArms
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>No selection</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>-</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
