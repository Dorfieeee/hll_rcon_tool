import React from 'react';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from '../useStyles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import ButtonGroup from '@mui/material/ButtonGroup';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton } from '@mui/material';

const AutoRefreshBar = ({
  intervalFunction,
  everyMs,
  refreshIntevalMs,
  onGroupActionClick,
  onUnbanClick,
  onFullScreenClick,
  isFullScreen,
}) => {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          intervalFunction();
          return 0;
        }

        return Math.min(oldCompleted + (refreshIntevalMs / everyMs) * 100, 100);
      });
    }

    const timer = setInterval(progress, refreshIntevalMs);
    return () => {
      clearInterval(timer);
    };
  }, [everyMs, intervalFunction, refreshIntevalMs]);

  return (
    <React.Fragment>
      <Grid className={classes.textLeft} container justifyContent="flex-start">
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid style={{ textAlign: 'left' }} item xs={6}>
              <h1>
                Players view{' '}
                <IconButton onClick={onFullScreenClick} size="large">
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </h1>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <ButtonGroup
                className={classes.margin}
                orientation="vertical"
                color="primary"
                variant="contained"
                aria-label="vertical outlined primary button group"
              >
                <Button onClick={onGroupActionClick}>Group action</Button>
                <Button onClick={onUnbanClick}>Unban</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Link
            style={{ cursor: 'pointer' }}
            onClick={() =>
              intervalFunction().then(() => toast.success('Refreshed'))
            }
          >
            <ListItemText secondary="Refresh now. Next auto refresh:" />
          </Link>
        </Grid>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={completed}
        className={classes.marginBottom}
      />
    </React.Fragment>
  );
};

export default AutoRefreshBar;
