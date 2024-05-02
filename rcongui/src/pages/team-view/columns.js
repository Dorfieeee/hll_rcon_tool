import { Avatar, Badge, Box } from '@mui/material';
import { styled } from '@mui/system';

const RoleAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  marginLeft: '6px',
  border: `2px solid ${theme.palette.background.paper}`,
  background: theme.palette.info.dark,
}));

export const columns = [
  {
    field: 'level',
    headerName: 'Level',
    width: 50,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 175,
  },
  {
    field: 'country',
    headerName: 'Country',
    renderCell: (params) => {
      if (!params.value || params.value === 'private') return null;

      return (
        <img
          src={`https://flagcdn.com/w20/${params.value.toLowerCase()}.png`}
          alt={params.value}
          width={20}
          height={10}
        />
      );
    },
  },
  {
    field: 'unit_name',
    headerName: 'Squad',
  },
  {
    field: 'role',
    headerName: 'Role',
  },
  {
    field: 'loadout',
    headerName: 'Loadout',
  },
];
