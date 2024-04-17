import React from 'react';

export const SidebarContext = React.createContext();

export const PlayerSidebarProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [player, setPlayer] = React.useState(null);

  return (
    <SidebarContext.Provider value={{ open, setOpen, player, setPlayer }}>
      {children}
    </SidebarContext.Provider>
  );
};
