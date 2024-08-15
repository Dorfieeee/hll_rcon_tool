'use client';

import Image from 'next/image';
import { usePublicInfoQuery } from '../utils/queries/public-info';
import { Spinner } from '@shared/components/spinner';

export default function GameState() {
  const [game, { isFetching }] = usePublicInfoQuery();

  const remainingTime = `${String(
    Math.floor(game.time_remaining / 60)
  )}:${String(game.time_remaining % 60).padStart(2, '0')}:${String(
    game.time_remaining % 3600
  ).padStart(2, '0')}`;
  const allies = game.current_map.map.map.allies;
  const axis = game.current_map.map.map.axis;
  const gameMode = game.current_map.map.game_mode;
  const mapName = game.current_map.map.map.pretty_name;

  return (
    <section id="game-state">
      <h2 className="sr-only">Game Info</h2>
      <article className="flex flex-col w-2/3">
        <div className="text-sm text-center">{remainingTime}</div>
        <div className="flex flex-row justify-between items-center px-2">
          <Image
            src={`/teams/${allies.name}.webp`}
            alt={allies.team}
            width={64}
            height={64}
          />
          <div className="text-6xl">
            {game.score.allied} : {game.score.axis}
          </div>
          <Image
            src={`/teams/${axis.name}.webp`}
            alt={axis.team}
            width={64}
            height={64}
          />
        </div>
        <div className='flex flex-row justify-between px-2'>
          <div className='w-16 text-center py-2'>[{game.player_count_by_team.allied}]</div>
          <div className="flex flex-col text-center justify-between">
            <div className="text-sm">{mapName}</div>
            <div className="text-xs capitalize">{gameMode}</div>
          </div>
          <div className='w-16 text-center py-2'>[{game.player_count_by_team.axis}]</div>
        </div>
      </article>
    </section>
  );
}
