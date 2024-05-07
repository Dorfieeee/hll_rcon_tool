import React from 'react';
import { useInterval } from '../../hooks/useInterval';
import { extractPlayers } from '../../utils/extractPlayers';
import { playerToRow } from './playerToRow';
import teamViewResult from '../../dev/test_data/get_team_view.json';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import PlayersTable from '../../components/PlayersTable';
import { columns } from './columns';
import ProgressBar from '../../components/ProgressBar';
import { color, styled } from '@mui/system';
import { get } from '../../utils/fetchUtils';

const interval = 30;
const TEAM_AXIS = 'axis';
const TEAM_ALLIES = 'allies';

const onlyAxis = (player) => player.team === TEAM_AXIS;
const onlyAllies = (player) => player.team === TEAM_ALLIES;

let getTeamView = () => get('get_team_view');

if (import.meta.env.DEV) {
  getTeamView = () =>
    new Promise((res) =>
      setTimeout(() => res(new Response(JSON.stringify(teamViewResult))), 1000)
    );
}

const StyledPlayersTable = styled(PlayersTable)(({ theme }) => ({
  '& .crcon-team-view--commander': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark,
      '&:hover': {
        backgroundColor: theme.palette.success.main,
      },
    },
  },
  '& .crcon-team-view--armor': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.info.light : theme.palette.info.dark,
      '&:hover': {
        backgroundColor: theme.palette.info.main,
      },
    },
  },
  '& .crcon-team-view--recon': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.dark,
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
  }
}));

const TeamView = () => {
  const { data, loading, refresh, error } = useInterval(
    getTeamView,
    interval * 1000
  );

  const axisRows = React.useMemo(() => {
    if (!data) return [];
    const players = extractPlayers(data.result);
    return players.filter(onlyAxis).map(playerToRow);
  }, [data]);

  const alliesRows = React.useMemo(() => {
    if (!data) return [];
    const players = extractPlayers(data.result);
    return players.filter(onlyAllies).map(playerToRow);
  }, [data]);

  console.log({ data, axisRows, alliesRows })

  return (
    <Grid container columnSpacing={1}>
      <Grid container sm={12}>
        <Grid sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h2" textAlign={'center'} sx={{ flexGrow: 1 }}>
              Allies
            </Typography>
          </Box>
        </Grid>
        <Grid sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h2" textAlign={'center'} sx={{ flexGrow: 1 }}>
              Axis
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid sm={12} sx={{ px: 1, mb: 1 }}>
        <ProgressBar interval={interval} loading={loading} />
      </Grid>
      {[alliesRows, axisRows].map((rows, i) => (
        <Grid key={i} sm={6}>
          <StyledPlayersTable
            data={data}
            rows={rows}
            columns={columns}
            getRowClassName={(params) => {
              let className = 'crcon-team-view--';
              switch (params.row.role) {
                case 'armycommander':
                  className += 'commander';
                  break;
                case 'tankcommander':
                case 'crewman':
                  className += 'armor';
                  break;
                case 'spotter':
                case 'sniper':
                  className += 'recon';
                  break;
                default:
                  className += 'infantry';
                  break;
              }
              return className;
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamView;
