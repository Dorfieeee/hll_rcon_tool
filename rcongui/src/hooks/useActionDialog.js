import React from 'react';
import { DialogContext } from '../providers/ActionDialogProvider';

export const useActionDialog = () => {
  return React.useContext(DialogContext);
};
