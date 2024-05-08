import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

const App = () => {
  dayjs.extend(relativeTimePlugin);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
