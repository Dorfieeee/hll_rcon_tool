import { Player } from "../../components/game/types";

type UNIX_Timestamp = number;
type TIME_IS_SECONDS = number;

export type CRCON_Response<T> = {
  arguments: string | null;
  command: string;
  error: string | null;
  failed: boolean;
  forward_results: boolean | null;
  result: T;
  version: string;
};

interface MapMode {
  id: string;
  map: Map;
  game_mode: GameMode;
  attackers: Team | null;
  environment: MapEnvironment;
  pretty_name: string;
  image_name: string;
}

interface Map {
  id: string;
  name: string;
  tag: string;
  pretty_name: string;
  shortname: string;
  allies: MapTeam;
  axis: MapTeam;
}

type Team = 'allies' | 'axis';
type Nation = 'us' | 'gb' | 'ger' | 'rus';
type GameMode = 'warfare' | 'offensive' | 'skirmish';
type MapEnvironment = 'day' | 'night' | 'dusk' | 'rain';

interface MapTeam {
  name: Nation;
  team: Team;
}

export type PublicInfo = {
  max_player_count: number;
  player_count: number;
  player_count_by_team: {
    allied: number;
    axis: number;
  }
  score: {
    allied: number;
    axis: number;
  }
  time_remaining: TIME_IS_SECONDS;
  name: {
    name: string;
    short_name: string;
    public_stats_port: number;
    public_stats_port_https: number;
  };
  current_map: {
    id: string;
    map: MapMode;
    start: UNIX_Timestamp;
  };
  next_map: {
    id: string;
    map: MapMode;
    start: UNIX_Timestamp;
  };
  vote_status: {
    map: MapMode;
    // TODO fix voters type
    voters: string[]
  }[]
};

export type LiveGameStats = {
    refresh_interval_sec: number;
    snapshot_timestamp: UNIX_Timestamp;
    stats: Player[];
}