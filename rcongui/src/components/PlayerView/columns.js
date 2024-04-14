import { Avatar, Badge, Box } from '@mui/material';
import { styled } from '@mui/system';

const RoleAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'type',
})(({ theme, type }) => ({
  width: 22,
  height: 22,
  marginLeft: '6px',
  border: `2px solid ${theme.palette.background.paper}`,
  background: theme.palette.info.dark,
}));

export const getColumns = () => [
  {
    field: 'team',
    headerName: 'Team',
    width: 50,
    renderCell: (params) => {
      const [allies, axis] = ['1001546200681566330', '1001525586839208006'];
      const src = (team) =>
        `https://cdn.discordapp.com/emojis/${team === 'axis' ? axis : allies}.webp?size=128&quality=lossless`;

      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <img
            src={src(params.value)}
            alt={params.value}
            width={20}
            height={'auto'}
          />
        </Box>
      );
    },
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 50,
    renderCell: (params) => {
      let src = `/icons/roles/${params.value}.png`;
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Badge
            overlap="circular"
            title={`${params.row.team}-${params.row.unit_name}-${params.row.role}`.toUpperCase()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <RoleAvatar
                variant="circular"
                alt={'Role' + params.value}
                type={params.value}
                src={src}
                slotProps={{
                  img: {
                    sx: {
                      width: '80%',
                      height: '80%',
                    }
                  }
                }}
              >
                ?
              </RoleAvatar>
            }
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontWeight: '600',
                fontSize: '23px',
                paddingRight: '4px',
                background: (theme) =>
                  params.row.team === 'axis'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                color: (theme) =>
                  params.row.team === 'axis'
                    ? theme.palette.secondary.contrastText
                    : theme.palette.primary.contrastText,
              }}
              variant="square"
            >
              {params.row?.unit_name?.[0].toUpperCase() ?? '?'}
            </Avatar>
          </Badge>
        </Box>
      );
    },
  },
  {
    field: 'unit_name',
    headerName: 'Squad',
    width: 50,
  },
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
    width: 50,
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
    field: 'steam_id_64',
    headerName: 'Steam ID',
  },
  {
    field: 'is_vip',
    headerName: 'VIP',
    type: 'boolean',
    width: 50,
  },
  {
    field: 'current_playtime_seconds',
    headerName: 'Playtime',
    type: 'number',
    valueGetter: (value) => Math.floor(value / 60),
    width: 75,
  },
  {
    field: 'sessions_count',
    headerName: '# Visits',
    type: 'number',
    width: 75,
  },
  {
    field: 'punish_times',
    headerName: '# Punish',
    type: 'number',
    width: 50,
    valueFormatter: (value) => (value === 0 ? '' : value),
  },
  {
    field: 'kicked_times',
    headerName: '# Kick',
    type: 'number',
    width: 50,
    valueFormatter: (value) => (value === 0 ? '' : value),
  },
  {
    field: 'tempban_times',
    headerName: '# TempBan',
    type: 'number',
    width: 50,
    valueFormatter: (value) => (value === 0 ? '' : value),
  },
  {
    field: 'permaban_times',
    headerName: '# PermaBan',
    type: 'number',
    width: 50,
    valueFormatter: (value) => (value === 0 ? '' : value),
  },
];
