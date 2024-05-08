import React from 'react';

export const SidebarContext = React.createContext();

// TODO
// Make this fetch the player's data based on steamID
// Introduce loading state so the sidebar does not open until some data are present
// It should update the player's data periodically including comments etc
export const PlayerSidebarProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [player, setPlayer] = React.useState(null);

  return (
    <SidebarContext.Provider value={{ open, setOpen, player, setPlayer }}>
      {children}
    </SidebarContext.Provider>
  );
};
