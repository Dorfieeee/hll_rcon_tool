import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProgressBar from '../LogsView/progress';
import teamViewResult from '../../dev/test_data/get_team_view.json';
import { DataGrid } from '@mui/x-data-grid';
import { get } from '../../utils/fetchUtils';
import { ActionDialog } from './ActionDialog';
import { ActionToolbar } from './ActionToolbar';
import { playerViewReducer } from './playerViewReducer';
import { getColumns } from './columns';
import { extractPlayers } from './extractPlayers';
import { playerToRow } from './playerToRow';
import { ActionFormDialog } from './ActionFormDialog';

export const PlayerViewV2 = () => {
  const [state, dispatch] = React.useReducer(playerViewReducer, {
    open: false,
    players: [],
    action: null,
  });

  React.useEffect(() => {
    const getPlayers = async () => {
      const result = await get('get_team_view');
      const data = await result.json();
      const players = extractPlayers(data.result);
      dispatch({ type: 'set_players', players });
    };

    const getStaticPlayers = () => {
      const players = extractPlayers(teamViewResult.result);
      dispatch({ type: 'set_players', players });
    };

    // getPlayers();
    getStaticPlayers();
  }, []);

  const rows = React.useMemo(() => state.players.map(playerToRow), [state.players]);

  const columns = React.useMemo(() => getColumns(dispatch), [dispatch]);

  return (
    <React.Fragment>
      <Stack>
        {/* HEADER */}
        <Box sx={{ mb: 2 }}>
          <Stack direction={'row'}>
            <Typography variant="h2" sx={{ flexGrow: 1 }}>
              Players online
            </Typography>
            <Box>
              <IconButton
                disableElevation
                aria-label="refresh"
                variant="outlined"
                size="large"
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography variant="subtitle1">{30}s auto refresh</Typography>
          <ProgressBar interval={30} />
        </Box>
        {/* ACTIONS */}
        <Box
          sx={{
            height: '4rem',
            background: (theme) => theme.palette.background.paper,
            mb: 2,
          }}
        ></Box>
        {/* PLAYERS TABLE */}
        <DataGrid
          columns={columns}
          rows={rows}
          // onRowDoubleClick={(params) => {
          //   setPlayerDetail(params.row);
          //   setOpenDrawer((prev) => !prev);
          // }}
          // onRowClick={(params) => {
          //   setPlayerDetail(params.row);
          // }}
          getRowId={(row) => row.steam_id_64}
          checkboxSelection
          autoHeight
          initialState={{
            sorting: {
              sortModel: [{ field: 'current_playtime_seconds', sort: 'desc' }],
            },
          }}
          disableRowSelectionOnClick
          slots={{
            toolbar: ActionToolbar,
          }}
          slotProps={{
            toolbar: { dispatch: dispatch },
          }}
        />
      </Stack>
      <ActionFormDialog open={state.open} onClose={() => dispatch({ type: 'close' })} action={state.action} recipients={state.selectedPlayers} />
      {/* <ActionDialog open={state.open} action={state.action} players={state.selectedPlayers} dispatchAction={dispatch} /> */}
    </React.Fragment>
  );
};
