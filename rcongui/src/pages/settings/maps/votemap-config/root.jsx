import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { VotemapConfigForm } from '../../../../components/settings/VotemapConfigForm';
import { VotemapStatus } from '../../../../components/settings/VotemapStatus';
import { VotemapMapOptions } from '../../../../components/settings/VotemapMapOptions';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';

const FACTORY_CONFIG = {
  enabled: false,
  default_method: 'least_played_from_suggestions',
  number_last_played_to_exclude: 3,
  num_warfare_options: 10,
  num_offensive_options: 2,
  num_skirmish_control_options: 1,
  consider_offensive_same_map: true,
  consider_skirmishes_as_same_map: true,
  allow_consecutive_offensives: true,
  allow_consecutive_offensives_opposite_sides: false,
  allow_default_to_offensive: false,
  allow_consecutive_skirmishes: false,
  allow_default_to_skirmish: false,
  instruction_text:
    'Vote for the nextmap:\nType in the chat !votemap <map number>\n{map_selection}\n\nTo never see this message again type in the chat !votemap never\n\nTo renable type: !votemap allow',
  thank_you_text: 'Thanks {player_name}, vote registered for:\n{map_name}',
  no_vote_text: 'No votes recorded yet',
  reminder_frequency_minutes: 20,
  allow_opt_out: true,
  help_text: '',
};

export default function VotemapConfig() {
  const { status, config: serverConfig, whitelist, maps } = useLoaderData();

  const [openedTab, setOpenedTab] = React.useState(1);

  const handleTabChange = (event, tabValue) => {
    setOpenedTab(tabValue);
  };

  const [config, setConfig] = React.useState(serverConfig);

  const handleFactoryConfig = () => {
    setConfig(FACTORY_CONFIG);
  };

  const handleResetConfigChanges = () => {
    setConfig(serverConfig);
  };

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
            <VotemapConfigForm
              config={config}
              handleFactory={handleFactoryConfig}
              handleReset={handleResetConfigChanges}
            />
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1, p: 0 }} value={3}>
            <VotemapMapOptions mapList={maps} whitelist={whitelist} />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}
