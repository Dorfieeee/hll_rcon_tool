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
import { styled } from '@mui/system';
import React from 'react';
import dayjs from 'dayjs';

const ExpirationField = ({ field }) => {
  const [value, setValue] = React.useState(
    field.defaultValue ? dayjs(field.defaultValue) : dayjs(new Date())
  );

  const hour = 1;
  const day = 24 * hour;
  const week = 7 * day;

  const handleRelativeChange = (hours) => () => {
    setValue(prevState => {
      const prevValue = dayjs(prevState)
      const nextValue = prevValue.add(hours, 'hour')
      return nextValue;
    })
  }

  const handleStaticChange = (hours) => () => {
    const now = dayjs(new Date());
    const nextValue = now.add(hours, 'hour')
    setValue(nextValue)
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDateTimePicker
          value={value}
          onChange={setValue}
          name={field.name}
          id={field.name}
          label={field.label}
          disablePast
          sx={{ maxWidth: '300px' }}
        />
      </LocalizationProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          maxWidth: '300px',
          '& > *': { width: '100%' },
        }}
      >
        <ButtonGroup
          variant="text"
          size="small"
          aria-label="Manage hours button group"
        >
          <Button onClick={handleRelativeChange(-hour)} color="error" aria-label='increase 1 hour'>-</Button>
          <Button onClick={handleStaticChange(hour)} sx={{ flexGrow: 1 }} aria-label='set 1 hour'>Hour</Button>
          <Button onClick={handleRelativeChange(hour)} color="success" aria-label='decrese 1 hour'>+</Button>
        </ButtonGroup>
        <Divider />
        <ButtonGroup
          variant="text"
          size="small"
          aria-label="Manage days button group"
        >
          <Button onClick={handleRelativeChange(-day)} color="error" aria-label='increase 1 day'>-</Button>
          <Button onClick={handleStaticChange(day)} sx={{ flexGrow: 1 }} aria-label='set 1 day'>Day</Button>
          <Button onClick={handleRelativeChange(day)} color="success" aria-label='decrese 1 day'>+</Button>
        </ButtonGroup>
        <Divider />

        <ButtonGroup
          variant="text"
          size="small"
          aria-label="Manage weeks button group"
        >
          <Button onClick={handleRelativeChange(-week)} color="error" aria-label='increase 1 week'>-</Button>
          <Button onClick={handleStaticChange(week)} sx={{ flexGrow: 1 }} aria-label='set 1 week'>Week</Button>
          <Button onClick={handleRelativeChange(week)} color="success" aria-label='decrese 1 week'>+</Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

const DurationField = ({ field }) => {
  return (
    <TextField
      required
      helperText={field.description}
      id={field.name}
      name={field.name}
      label={field.label}
      type={field.type}
      variant="outlined"
      fullWidth
    />
  );
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ACTION_STATUS = {
  default: 'default',
  pending: 'warning',
  error: 'error',
  success: 'success',
};

export const ActionDialog = ({ open, players, action, dispatchAction }) => {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const handleClose = () => {
    dispatchAction({ type: 'close' });
    setError(null);
    setSuccess(false);
  };

  React.useEffect(() => {
    if (players.length) {
      setSelectedPlayers(
        players.map((player) => ({
          player,
          status: ACTION_STATUS.default,
        }))
      );
    }
  }, [players]);

  const handleOnSucess = (player) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.map((prevState) => {
        const nextStatus =
          player.steam_id_64 === prevState.player.steam_id_64
            ? ACTION_STATUS.success
            : prevState.status;

        return {
          ...prevState,
          status: nextStatus,
        };
      })
    );
  };

  const handleOnError = (player) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.map((prevState) => {
        const nextStatus =
          player.steam_id_64 === prevState.player.steam_id_64
            ? ACTION_STATUS.error
            : prevState.status;

        return {
          ...prevState,
          status: nextStatus,
        };
      })
    );
  };

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
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
  });

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
        onSubmit: handleSubmit,
      }}
    >
      {open && (
        <React.Fragment>
          <DialogTitle id="alert-dialog-title">
            {action.name.toUpperCase()}
          </DialogTitle>
          <DialogContent>
            <Alert
              severity={error ? 'error' : success ? 'success' : 'info'}
              sx={{ my: 2 }}
            >
              {error ? error : success ? 'Success!' : action.description}
            </Alert>

            <BadgesList
              players={selectedPlayers}
              setPlayers={setSelectedPlayers}
            />

            {action.params.map((field) => {
              if (field.type === 'hidden') {
                return (
                  <input
                    type="hidden"
                    key={field.name}
                    name={field.name}
                    id={field.name}
                    value={selectedPlayers
                      .map(({ player }) => field.getValue(player))
                      .join(',')}
                  />
                );
              }

              if (field.name === 'expiration') {
                return <ExpirationField field={field} key={field.name} />;
              }

              if (field.name === 'duration') {
                return <DurationField field={field} key={field.name} />;
              }

              return (
                <TextField
                  required
                  key={field.name}
                  helperText={field.description}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  variant="outlined"
                  fullWidth
                  multiline={field.type === 'text'}
                  minRows={5}
                />
              );
            })}
          </DialogContent>
        </React.Fragment>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="warning" type="submit">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BadgesList = ({ players, setPlayers }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        my: 2,
      }}
      component="ul"
    >
      {players.map(({ player, status }) => {
        let removedClanName = player.name.replace(/^\[([^\]]*)\]/, ''); // remove `[clantags]`
        let shortedName = removedClanName.substring(0, 6);
        let label =
          removedClanName.length > 6 ? shortedName + '...' : shortedName;

        return (
          <ListItem key={player.steam_id_64}>
            <Tooltip title={player.name}>
              <Chip size="small" label={label} color={status} />
            </Tooltip>
          </ListItem>
        );
      })}
    </Paper>
  );
};
