import React from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { TableToolbar } from './TableToolbar';
import { columns } from './columns';
import { playerToRow } from '../PlayerView/playerToRow';
import { extractPlayers } from '../../utils/extractPlayers';
import { usePlayerSidebar } from '../../hooks/usePlayerSidebar';

const PlayersTable = ({ data }) => {
  const [players, setPlayers] = React.useState([]);

  const { setOpen: setSidebarOpen, setPlayer } = usePlayerSidebar();

  const apiRef = useGridApiRef();

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

  const tableProps = React.useMemo(
    () => ({
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
      onRowDoubleClick: (params) => {
        setPlayer(params.row);
        setSidebarOpen((prev) => !prev);
      },
      onRowClick: (params) => {
        setPlayer(params.row);
      },
    }),
    []
  );

  return (
    <DataGrid columns={columns} rows={rows} apiRef={apiRef} columnBufferPx={350} disableVirtualization={false} {...tableProps} />
  );
};

export default PlayersTable;
