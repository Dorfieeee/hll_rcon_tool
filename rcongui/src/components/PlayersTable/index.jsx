import React from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { TableToolbar } from './TableToolbar';
import { usePlayerSidebar } from '../../hooks/usePlayerSidebar';
import { NoRowsOverlay } from './NoRowsOverlay';

const PlayersTable = ({ data: teamData, rows, columns, ...props }) => {
  const { setOpen: setSidebarOpen, setPlayer } = usePlayerSidebar();

  const apiRef = useGridApiRef();

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
      disableRowSelectionOnClick: true,
      slots: {
        toolbar: TableToolbar,
        noRowsOverlay: NoRowsOverlay,
      },
      sx: { '--DataGrid-overlayHeight': '300px', maxWidth: 'calc(var(--DataGrid-columnsTotalWidth) + 10px)' },
      onRowDoubleClick: (params) => {
        setPlayer(params.row);
        setSidebarOpen((prev) => !prev);
      },
      onRowClick: (params) => {
        setPlayer(params.row);
      },
      onCellClick: (params) => {
        if (params.field !== 'assignment' && params.field !== 'unit_name')
          return;
        const squadPlayers =
          teamData.result?.[params.row.team]?.squads[params.row.unit_name]
            ?.players;
        const selectOrUnselect = !apiRef.current.isRowSelected(params.id);
        squadPlayers?.forEach((player) =>
          apiRef.current.selectRow(player.steam_id_64, selectOrUnselect)
        );
      },
    }),
    [teamData]
  );

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      apiRef={apiRef}
      columnBufferPx={350}
      disableVirtualization={false}
      {...tableProps}
      {...props}
    />
  );
};

export default PlayersTable;
