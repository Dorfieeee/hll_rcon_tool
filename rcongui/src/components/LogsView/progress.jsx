import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const updateInterval = 300;

export default function ProgressBar({ interval, loading }) {
  const [progress, setProgress] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (loading) {
        clearInterval(timerRef.current)
        setProgress(0);
        timerRef.current = null
    }

    timerRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        return Math.min(
          oldProgress + (updateInterval / (interval * 1000)) * 100,
          100
        );
      });
    }, updateInterval);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [loading]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant={loading ? 'indeterminate' : 'determinate'} color={loading ? 'secondary' : 'primary'} value={progress} />
    </Box>
  );
}
