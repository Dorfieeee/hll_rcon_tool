import React from 'react';
import { useInterval } from './useInterval';
import { get } from '../utils/fetchUtils'
import { parseJson } from '../utils/parseJson';

const ONLINE = 'online'
const OFFLINE = 'offline'
const IDLE = 'idle'

const getServerStatus = () => get('get_status');

const GlobalContext = React.createContext();

export const useGlobalState = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// TODO
// Consider using React Reducer if the functionality grows
export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = React.useState({
    server: {
      status: OFFLINE,
      crconConnected: false,
      name: '',
      number: 1,
      map: '',
      nb_players: '',
      player_count: 0,
    },
    user: '',
    permissions: [],
    error: '',
  });

  // Get server status
  const { data: serverStatusData, error: serverStatusError } = useInterval(getServerStatus, 60 * 1000);

  React.useEffect(() => {
    if (serverStatusData?.result) {
      setServer(serverStatusData.result);
    }
  }, [serverStatusData])

  React.useEffect(() => {
    if (serverStatusError?.error) {
      parseJson(serverStatusError).then(json => {
        if (json.error) {
          setState(prevState => ({
            ...prevState,
            error: json.error,
          }))
        }
      })
    }
  }, [serverStatusError])

  // TODO
  // Get user

  // TODO
  // Get user's permissions

  const setServer = (server) => {
    setState((prevState) => ({
      ...prevState,
      server: {
        ...server,
        crconConnected: true,
        number: server.server_number,
      },
    }));
  };

  const setUser = (user) => {
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, setServer, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
