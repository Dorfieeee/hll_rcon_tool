import { Box } from '@mui/material'

export const getColumns = () => [
    {
        field: 'team',
        headerName: 'Team',
        width: 50,
        renderCell: (params) => {
            const [allies, axis] = ['1001546200681566330', '1001525586839208006']
            const src = (team) => `https://cdn.discordapp.com/emojis/${team === 'axis' ? axis : allies}.webp?size=128&quality=lossless`

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <img
                        src={src(params.value)}
                        alt={params.value}
                        width={20}
                        height={'auto'}
                    />
                </Box>
            )
        }
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
            )
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
]
