import React from 'react';
import { Paper, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BadgesList } from './BadgeList';

const ACTION_STATUS = {
  default: 'default',
  pending: 'warning',
  error: 'error',
  success: 'success',
};

const initRecipients = (recipients) =>
  recipients.map((recipient) => ({
    recipient: recipient,
    status: recipient.status ?? ACTION_STATUS.default,
  }));

export const ActionForm = ({ submitRef, action, recipients, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues
  });

  const [recipientStates, setRecipientStates] = React.useState(
    initRecipients(recipients)
  );

  React.useEffect(() => {
    setRecipientStates(initRecipients(recipients));
  }, [recipients]);

  const onSubmit = React.useCallback(async (data) => {
    // get list of all selected players and ids
    const steamIds = recipientStates.map(
      ({ recipient }) => recipient.steam_id_64
    );
    const players = recipientStates.map(({ recipient }) => recipient.name);
    // map each to a request payload
    const payloads = [];
    for (let i = 0; i < players.length; i++) {
      payloads.push({ player: players[i], steam_id_64: steamIds[i], ...data });
    }
    // now map payloads to requests
    const requests = payloads.map((payload) => action.execute(payload));
    // Update UI to signalize pending state
    setRecipientStates((prevState) =>
      prevState.map(({ recipient }) => ({
        recipient,
        status: ACTION_STATUS.pending,
      }))
    );
    // call requests in parallel
    const responses = await Promise.allSettled(requests);
    // create a map of players' ids and their statuses
    const idsToStatus = recipientStates.reduce((obj, { recipient, status }) => {
      obj[recipient.steam_id_64] = status;
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
    setRecipientStates((prevStatePlayers) => {
      return prevStatePlayers.map(({ recipient }) => {
        let nextStatus =
          idsToStatus[recipient.steam_id_64] === ACTION_STATUS.pending
            ? ACTION_STATUS.error
            : idsToStatus[recipient.steam_id_64];

        return {
          recipient,
          status: nextStatus,
        };
      });
    });
  }, []);

  const ActionFields = action.component;

  return (
    <React.Fragment>
      <BadgesList recipients={recipientStates} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ActionFields control={control} errors={errors} />
        <Button
          ref={submitRef}
          type="submit"
          sx={{ display: submitRef && 'none' }}
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};
