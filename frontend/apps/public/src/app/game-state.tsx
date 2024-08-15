'use client';

import Image from 'next/image';
import { usePublicInfoQuery } from '../utils/queries/public-info';

export default function GameState() {
  const [game] = usePublicInfoQuery();

  const remainingTime = `${String(
    Math.floor(game.time_remaining / 3600)
  )}:${String(Math.floor((game.time_remaining % 3600) / 60)).padStart(
    2,
    '0'
  )}:${String(game.time_remaining % 60).padStart(2, '0')}`;
  const allies = game.current_map.map.map.allies;
  const axis = game.current_map.map.map.axis;
  const gameMode = game.current_map.map.game_mode;
  const mapName = game.current_map.map.map.pretty_name;

  return (
    <section className='flex flex-col md:flex-row' id="game-state">
      <h2 className="sr-only">Game Info</h2>
      <article className="flex flex-col w-2/3">
        <div className="text-sm text-center">{remainingTime}</div>
        <div className="flex flex-row justify-center items-center px-2">
          <div className="flex flex-row justify-between basis-full">
            <div className="flex justify-start">
              <Image
                src={`/teams/${allies.name}.webp`}
                alt={allies.team}
                width={64}
                height={64}
              />
            </div>
            <div className="flex flex-col text-right flex-grow">
              <div className="text-2xl font-bold uppercase">{allies.team}</div>
              <div className="flex flex-row text-sm">
                <div className="flex-grow self-center border-b-[6px] mx-1 border-blue-500 border-double"></div>
                <div>
                  {game.player_count_by_team.allied} Player
                  {game.player_count_by_team.allied !== 1 && 's'}
                </div>
              </div>
            </div>
          </div>

          <div className="text-6xl basis-1/2 min-w-40 text-center">
            {game.score.allied} : {game.score.axis}
          </div>

          <div className="flex flex-row justify-between basis-full">
            <div className="flex flex-col text-left w-full">
              <div className="text-2xl font-bold uppercase">{axis.team}</div>
              <div className="flex flex-row text-sm">
                <div>
                  {game.player_count_by_team.axis} Player
                  {game.player_count_by_team.axis !== 1 && 's'}
                </div>
                <div className="flex-grow self-center border-b-[6px] mx-1 border-red-500 border-double"></div>
              </div>
            </div>
            <div className="flex justify-start">
              <Image
                src={`/teams/${axis.name}.webp`}
                alt={axis.team}
                width={64}
                height={64}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center justify-between">
          <div className="text-sm">{mapName}</div>
          <div className="text-xs capitalize">{gameMode}</div>
        </div>
      </article>
      <aside className='flex flex-col sm:flex-row w-1/3'>
        <figure className='relative w-1/2'>
          <Image src={`/maps/${game.current_map.map.image_name}`} alt='' fill style={{ objectFit: "contain" }} className='saturate-200' />
          <figcaption className="absolute bottom-0 w-full text-center text-sm font-bold bg-background/75"><div className='text-xs'>Now</div><div>{game.current_map.map.pretty_name}</div></figcaption>
        </figure>
        <figure className='relative w-1/2'>
          <Image src={`/maps/${game.next_map.map.image_name}`} alt='' fill style={{ objectFit: "contain" }} className="grayscale-[50]" />
          <figcaption className="absolute bottom-0 w-full text-center text-sm font-bold bg-background/75"><div className='text-xs'>Up next</div><div>{game.next_map.map.pretty_name}</div></figcaption>
        </figure>
      </aside>
    </section>
  );
}
