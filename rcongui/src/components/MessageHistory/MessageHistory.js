import React from 'react';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Chip, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  message: {
    whiteSpace: 'pre-wrap',
    marginTop: '5px',
    marginBottom: '5px',
  },
  date: {
    color: theme.palette.disabledColor,
  },
  padding: {
    padding: theme.spacing(1),
    overflow: 'auto',
    maxHeight: '68vh',
  },
}));

const MessageHistory = ({ data }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box paddingLeft={2}>
        <Grid
          container
          justifyContent="flex-start"
          alignContent="flex-start"
          alignItems="flex-end"
          direction="column"
          className={classes.padding}
          wrap="nowrap"
        >
          {data?.map((message, index) => {
            return (
              <Grid item key={index}>
                <Grid
                  container
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  alignItems="flex-end"
                  direction="column"
                >
                  <Grid item>
                    <Chip
                      style={{ height: 'auto', paddingTop: '-10px' }}
                      color="primary"
                      label={
                        <Typography align="left" className={classes.message}>
                          {message.reason}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      display="block"
                      className={classes.date}
                      color="textSecondary"
                    >
                      {moment
                        .utc(message.time)
                        .local()
                        .format('ddd Do MMM HH:mm:ss')}{' '}
                      by {message.by}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default MessageHistory;
