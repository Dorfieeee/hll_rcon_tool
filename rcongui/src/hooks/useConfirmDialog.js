import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

/*
------
USAGE EXAMPLE
------

import { useConfirmDialog } from './ConfirmDialogProvider';

const MyComponent = () => {
  const { openConfirmDialog } = useConfirmDialog();

  const handleDelete = () => {
    openConfirmDialog(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      (confirm) => {
        if (confirm) {
          // Perform the delete action
        }
      }
    );
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  );
};

*/

const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};

export const ConfirmDialogProvider = ({ children }) => {
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const openConfirmDialog = useCallback((title, message, onConfirm) => {
    setDialogProps({ open: true, title, message, onConfirm });
  }, []);

  const handleClose = useCallback(() => {
    setDialogProps((props) => ({ ...props, open: false }));
  }, []);

  return (
    <ConfirmDialogContext.Provider value={{ openConfirmDialog }}>
      {children}
      <ConfirmDialog
        open={dialogProps.open}
        title={dialogProps.title}
        message={dialogProps.message}
        onConfirm={(result) => {
          dialogProps.onConfirm(result);
          handleClose();
        }}
      />
    </ConfirmDialogContext.Provider>
  );
};
