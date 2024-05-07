import React from 'react';

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
    server: {},
    user: '',
    permissions: [],
  });

  const setServer = (server) => {
    setState((prevState) => ({
      ...prevState,
      server,
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
