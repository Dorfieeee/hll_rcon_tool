import { PlayerDetailDrawer } from '@/components/PlayerProfileDrawer';
import React from 'react';

export const SidebarContext = React.createContext();

// TODO
// Make this fetch the player's data based on steamID
// Introduce loading state so the sidebar does not open until some data are present
// It should update the player's data periodically including comments etc
export const PlayerSidebarProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const [steamID, setSteamID] = React.useState('');

  // 1. Set Steam ID
  // 2. useInterval to get_player
  // 3. Open sidebar with loading state
  //    - Use loading state inside the sidebar to create Skeleton UI
  // 4. On loaded data, set player state and set loading state to false 

  return (
    <SidebarContext.Provider value={{ open, setOpen, player, setPlayer }}>
      {children}
      <PlayerDetailDrawer />
    </SidebarContext.Provider>
  );
};

export const usePlayerSidebar = () => {
    return React.useContext(SidebarContext);
}