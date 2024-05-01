import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import LogsLiveList from '../../components/LogsLiveList';
import PlayersTable from '../../components/PlayersTable';
import teamViewResult from '../../dev/test_data/get_team_view.json';
import gameStateResult from '../../dev/test_data/get_gamestate.json';
import { get } from '../../utils/fetchUtils';
import { useInterval } from '../../hooks/useInterval';
import { Box } from '@mui/material';
import ProgressBar from '../../components/ProgressBar';
import { styled } from '@mui/system';
import { Header } from '../../components/game/Header';
import { extractTeamState } from '../../utils/extractPlayers';

const ViewWrapper = styled(Box)(({ theme }) => ({}));

const interval = 30;

let getTeamView = () => get('get_team_view');
let getGameState = () => get('get_gamestate');

if (import.meta.env.DEV) {
  getTeamView = () =>
    new Promise((res) =>
      setTimeout(() => res(new Response(JSON.stringify(teamViewResult))), 1000)
    );

  getGameState = () =>
    new Promise((res) =>
      setTimeout(() => res(new Response(JSON.stringify(gameStateResult))), 1000)
    );
}

const LiveView = () => {
  const { data: teamData, loading } = useInterval(getTeamView, interval * 1000);
  const { data: gameState } = useInterval(getGameState, interval * 1000);

  const gameStateProp = React.useMemo(() => {
    if (gameState && teamData) {
      return {
        ...gameState.result,
        allies: extractTeamState(teamData?.result?.allies ?? {}),
        axis: extractTeamState(teamData?.result?.axis ?? {}),
      };
    }

    return null;
  }, [gameState, teamData]);

  return (
    <ViewWrapper>
      <Header teamData={teamData?.result} gameState={gameStateProp} />
      <Grid container spacing={1}>
        <Grid xs={12} md={7}>
          <ProgressBar interval={30} loading={loading} />
          <PlayersTable data={teamData} loading={loading} />
        </Grid>
        <Grid xs={12} md={5}>
          <LogsLiveList />
        </Grid>
      </Grid>
    </ViewWrapper>
  );
};

export default LiveView;
