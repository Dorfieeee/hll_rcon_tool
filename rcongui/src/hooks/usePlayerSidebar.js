import React from 'react';
import { SidebarContext } from '../providers/PlayerSidebarProvider';

export const usePlayerSidebar = () => {
    return React.useContext(SidebarContext);
}