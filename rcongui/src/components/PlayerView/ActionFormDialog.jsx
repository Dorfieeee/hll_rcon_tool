import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    TextField,
    Paper,
    Chip,
    Tooltip,
    Typography,
  } from '@mui/material';
  import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { styled } from '@mui/styles';
  import React from 'react';
  import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../form/ControlledTextInput';

export const ActionFormDialog = ({ open, dispatch }) => {
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }
      } = useForm({
        defaultValues: {
            'message': '',
        }
      });

    const handleClose = () => {
      dispatch({ type: 'close' });
    };
  
    const onSubmit = React.useCallback(async (data) => {

      return alert(JSON.stringify(data));

      const {
        steam_id_64: steamIdField,
        player: playersField,
        ...rest
      } = formJson;
  
      // get list of all selected players and ids
      const steamIds = steamIdField.split(',');
      const players = playersField.split(',');
      // map each to a request payload
      const payloads = [];
      for (let i = 0; i < players.length; i++) {
        payloads.push({ player: players[i], steam_id_64: steamIds[i], ...rest });
      }
      // now map payloads to requests
      const requests = payloads.map((payload) => action.execute(payload));
      // Update UI to signalize pending state
      setSelectedPlayers((prevState) =>
        prevState.map(({ player, status }) => ({
          player,
          status: ACTION_STATUS.pending,
        }))
      );
      // call requests in parallel
      const responses = await Promise.allSettled(requests);
      // create a map of players' ids and their statuses
      const idsToStatus = selectedPlayers.reduce((obj, { player, status }) => {
        obj[player.steam_id_64] = status;
        return obj;
      }, {});
      // determine statuses based on the response's return value
      for (const response of responses) {
        if (response.status === 'fulfilled') {
          const result = await response.value.json();
          const { player, steam_id_64 } = result.arguments;
          if (!result.failed) {
            idsToStatus[steam_id_64] = ACTION_STATUS.success;
          } else {
            idsToStatus[steam_id_64] = ACTION_STATUS.error;
          }
        }
      }
      // update UI
      setSelectedPlayers((prevStatePlayers) => {
        return prevStatePlayers.map(({ player }) => {
          let nextStatus =
            idsToStatus[player.steam_id_64] === ACTION_STATUS.pending
              ? ACTION_STATUS.error
              : idsToStatus[player.steam_id_64];
  
          return {
            player,
            status: nextStatus,
          };
        });
      });
    }, []);
  
    return (
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <ControlledTextInput control={control} name={'message'} type={'text'} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="warning" type="submit">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };