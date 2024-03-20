import { LiveView } from '../components/LiveView';
import PlayerInfo from '../components/PlayerInfo';
import PlayersHistory from '../components/PlayersHistory';
import ServicesList from '../components/Services';
import LogsHistory from '../components/LogsHistory';
import ServerStatsPage from '../components/ServerStats';
import { SettingsRoutes } from '../components/SettingsRoutes';
import { CombinedHistory } from '../components/CombinedHistoryView';

export default [
  {
    path: '/',
    exact: true,
    component: LiveView,
  },
  {
    path: '/history',
    exact: false,
    component: PlayersHistory,
  },
  {
    path: '/player/:steamId64',
    exact: false,
    component: PlayerInfo,
  },
  {
    path: '/settings',
    exact: false,
    component: SettingsRoutes,
  },
  {
    path: '/services',
    exact: false,
    component: ServicesList,
  },
  {
    path: '/logs',
    exact: false,
    component: LogsHistory,
  },
  {
    path: '/combined_history',
    exact: false,
    component: CombinedHistory,
  },
  {
    path: '/server',
    exact: false,
    component: ServerStatsPage,
  },
];
