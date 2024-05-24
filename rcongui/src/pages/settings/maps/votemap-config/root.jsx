import React from 'react';
import { useActionData, useLoaderData } from 'react-router-dom';
import { VotemapConfigForm } from '../../../../components/settings/VotemapConfigForm';
import { VotemapStatus } from '../../../../components/settings/VotemapStatus';
import { VotemapMapOptions } from '../../../../components/settings/VotemapMapOptions';
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

  const { status, whitelist, maps } = useLoaderData();

  return (
    <>
      <TabContext value={openedTab}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            gap: 1,
          }}
        >
          <TabList
            orientation="vertical"
            onChange={handleTabChange}
            aria-label="lab API tabs example"
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              minWidth: 150,
            }}
          >
            <Tab label="State" value={1} />
            <Tab label="Config" value={2} />
            <Tab label="Map Options" value={3} />
          </TabList>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={1}>
            <VotemapStatus status={status} />
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={2}>
            <VotemapConfigForm />
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={3}>
            <VotemapMapOptions maps={maps} whitelist={whitelist} />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}
