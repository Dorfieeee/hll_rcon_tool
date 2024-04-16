import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProgressBar from '../ProgressBar';
import teamViewResult from '../../dev/test_data/get_team_view.json';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { get } from '../../utils/fetchUtils';
import { TableToolbar } from './TableToolbar';
import { columns } from './columns';
import { playerToRow } from '../PlayerView/playerToRow';
import { useInterval } from '../../hooks/useInterval';
import { PlayerDetailDrawer } from '../PlayerProfileDrawer';
import { extractPlayers } from '../../utils/extractPlayers';

const interval = 30;

let getTeamView = () => get('get_team_view');

if (import.meta.env.DEV) {
  getTeamView = () =>
    new Promise((res) =>
      setTimeout(() => res(new Response(JSON.stringify(teamViewResult))), 1000)
    );
}

const PlayersTable = () => {
  const [players, setPlayers] = React.useState([]);

  // PlayerProfileDrawer
  const [playerDetail, setPlayerDetail] = React.useState();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const apiRef = useGridApiRef();

  const { data, loading, refresh, error } = useInterval(
    getTeamView,
    interval * 1000
  );

  React.useEffect(() => {
    if (!data) return;
    const players = extractPlayers(data.result);
    setPlayers(players);
  }, [data]);

  React.useEffect(() => {
    return apiRef.current.subscribeEvent('cellClick', (params) => {
      if (params.field !== 'role') return;
      const squadPlayers =
        data.result?.[params.row.team]?.squads[params.row.unit_name]?.players;
      const selectOrUnselect = !apiRef.current.isRowSelected(params.id);
      squadPlayers?.forEach((player) =>
        apiRef.current.selectRow(player.steam_id_64, selectOrUnselect)
      );
    });
  }, [apiRef, data]);

  const rows = React.useMemo(() => players.map(playerToRow), [players]);

  const tableProps = React.useMemo(() => ({
    getRowId: (row) => row.steam_id_64,
    checkboxSelection: true,
    autoHeight: true,
    initialState: {
      sorting: {
        sortModel: [{ field: 'current_playtime_seconds', sort: 'desc' }],
      },
      density: 'compact',
    },
    columnVisibilityModel: {
      unit_name: false,
      team: false,
    },
    disableRowSelectionOnClick: true,
    slots: {
      toolbar: TableToolbar,
    },
  }));

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
                aria-label="refresh"
                variant="outlined"
                size="large"
                onClick={refresh}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography variant="subtitle1">{30}s auto refresh</Typography>
          <ProgressBar interval={30} loading={loading} />
        </Box>
        {/* PLAYERS TABLE */}
        <DataGrid
          columns={columns}
          rows={rows}
          apiRef={apiRef}
          onRowDoubleClick={(params) => {
            setPlayerDetail(params.row);
            setOpenDrawer((prev) => !prev);
          }}
          onRowClick={(params) => {
            setPlayerDetail(params.row);
          }}
          {...tableProps}
        />
      </Stack>
      <PlayerDetailDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        player={playerDetail}
      />
    </React.Fragment>
  );
};

export default PlayersTable;
