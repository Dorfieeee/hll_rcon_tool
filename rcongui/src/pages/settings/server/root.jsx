import React from 'react';
import { useActionData, useLoaderData } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';

export default function VotemapConfig() {
  const [openedTab, setOpenedTab] = React.useState(1);

  const handleTabChange = (event, tabValue) => {
    setOpenedTab(tabValue);
  };

  const { serverSettings } = useLoaderData();

  console.log(serverSettings)

  return (
    <Box sx={{ mt: -2, mx: -3, height: '100%' }}>
      <TabContext value={openedTab}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            gap: 1,
            flexDirection: 'column',
          }}
        >
          <TabList
            orientation="horizontal"
            onChange={handleTabChange}
            aria-label="Votemap config tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Tab label="State" value={1} />
            <Tab label="Config" value={2} />
            <Tab label="Map Options" value={3} />
          </TabList>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={1}>
            CONTENT
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={2}>
            CONTENT
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={3}>
            CONTENT
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
