import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'react-router-dom';
import {
  FormCard,
  FormCardTitle,
  FormDivider,
  StyledFormControlLabel,
  SwitchHelperText,
  Wrapper,
} from './cards';

export const VotemapConfigForm = ({ config, handleFactory, handleReset }) => {
  const [formChanged, setFormChanged] = React.useState(false);

  const totalMapOptions =
    config.num_warfare_options +
    config.num_offensive_options +
    config.num_skirmish_control_options;

  return (
    <Form method="post" onChange={() => setFormChanged(true)}>
      <Wrapper>
        {/* General */}
        <FormCard fullWidth>
          <Stack
            direction="row"
            gap={1}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            <Typography variant="h6">Votemap Config</Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <StyledFormControlLabel
              sx={{ marginLeft: 0, marginRight: 2 }}
              labelPlacement="start"
              control={
                <Switch
                  defaultChecked={config.enabled}
                  color="warning"
                  name="enabled"
                />
              }
              label="Enabled"
            />
            <Button
              size="small"
              variant="contained"
              onClick={handleFactory}
              color="warning"
            >
              Factory Settings
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setFormChanged(false);
                handleReset();
              }}
              color="warning"
              disabled={!formChanged}
            >
              Reset Changes
            </Button>
            <Button
              size="small"
              name="intent"
              value="set_config"
              variant="contained"
              type="submit"
              disabled={!formChanged}
            >
              Save
            </Button>
          </Stack>
        </FormCard>
        {/* Generating Map Options (1/2) */}
        <FormCard>
          <FormCardTitle>Generating Map Options (1/2)</FormCardTitle>
          <Typography>Description</Typography>
          <FormDivider />
          <Typography sx={{ mb: 1 }}>
            Total map options: {totalMapOptions}
          </Typography>
          <TextField
            name="num_warfare_options"
            label="Warfare maps"
            variant="outlined"
            defaultValue={config.num_warfare_options}
            margin="normal"
            fullWidth
            type="number"
            inputProps={{
              min: 0,
            }}
          />
          <TextField
            name="num_offensive_options"
            label="Offensive maps"
            variant="outlined"
            defaultValue={config.num_offensive_options}
            margin="normal"
            fullWidth
            type="number"
            inputProps={{
              min: 0,
            }}
          />
          <TextField
            name="num_skirmish_control_options"
            label="Skirmish maps"
            variant="outlined"
            defaultValue={config.num_skirmish_control_options}
            margin="normal"
            fullWidth
            type="number"
            inputProps={{
              min: 0,
            }}
          />
          <SwitchHelperText variant="caption">
            Number of maps in the vote selection
          </SwitchHelperText>
        </FormCard>
        {/* Generating Map Options (2/2) */}
        <FormCard>
          <FormCardTitle>Generating Map Options (2/2)</FormCardTitle>
          <Typography>Description</Typography>
          <FormDivider textAlign="left" flexItem>
            Skirmish
          </FormDivider>
          <FormGroup sx={{ alignItems: 'start' }}>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="consider_offensive_same_map"
                  defaultChecked={config.consider_offensive_same_map}
                />
              }
              label="Exclude Skirmish"
            />
            <SwitchHelperText variant="caption">
              Consider a <strong>Skirmish</strong> map being the same as a
              warfare map, when excluding
            </SwitchHelperText>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_consecutive_skirmishes"
                  defaultChecked={config.allow_consecutive_skirmishes}
                />
              }
              label="Consecutive Skirmish"
            />
            <SwitchHelperText variant="caption">
              Allow consecutive <strong>Skirmish</strong> map
            </SwitchHelperText>
            <FormDivider textAlign="left" flexItem>
              Offensive
            </FormDivider>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="consider_skirmishes_as_same_map"
                  defaultChecked={config.consider_skirmishes_as_same_map}
                />
              }
              label="Exclude Offensive"
            />
            <SwitchHelperText variant="caption">
              Consider an <strong>Offensive</strong> map being the same as a
              warfare map, when excluding
            </SwitchHelperText>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_consecutive_offensives"
                  defaultChecked={config.allow_consecutive_offensives}
                />
              }
              label="Consecutive Offensive"
            />
            <SwitchHelperText variant="caption">
              Allow consecutive <strong>Offensive</strong> map
            </SwitchHelperText>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_consecutive_offensives_opposite_sides"
                  defaultChecked={
                    config.allow_consecutive_offensives_opposite_sides
                  }
                />
              }
              label="Consecutive offensive, same side"
            />
            <SwitchHelperText variant="caption">
              Allow consecutive <strong>Offensive</strong> where a team would
              play defense/offense twice in a row, eg. off_ger followed by
              off_us
            </SwitchHelperText>
            <FormDivider />
            <TextField
              name="number_last_played_to_exclude"
              label="Excluded last played maps"
              variant="outlined"
              defaultValue={config.number_last_played_to_exclude}
              margin="normal"
              fullWidth
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </FormGroup>
        </FormCard>
        {/* Default Map Pick */}
        <FormCard>
          <FormCardTitle>Default Map Pick</FormCardTitle>
          <Typography>Description</Typography>
          <FormDivider />
          <FormControl>
            <FormLabel id="default-map-pick-method">Method</FormLabel>
            <RadioGroup
              aria-labelledby="default-map-pick-method"
              defaultValue={config.default_method}
              name="default_method"
            >
              <FormControlLabel
                value="least_played_from_suggestions"
                control={<Radio />}
                label="The least played from selection"
              />
              <FormControlLabel
                value="least_played_from_all_map"
                control={<Radio />}
                label="The least played from all"
              />
              <FormControlLabel
                value="random_from_suggestions"
                control={<Radio />}
                label="Random from selection"
              />
              <FormControlLabel
                value="random_from_all_maps"
                control={<Radio />}
                label="Random from all"
              />
            </RadioGroup>
          </FormControl>
          <FormDivider />
          <FormGroup sx={{ alignItems: 'start' }}>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_default_to_offensive"
                  defaultChecked={config.allow_default_to_offensive}
                />
              }
              label="Default Offensive"
            />
            <SwitchHelperText variant="caption">
              Allow <strong>Offensive</strong> as default map
            </SwitchHelperText>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_default_to_skirmish"
                  defaultChecked={config.allow_default_to_skirmish}
                />
              }
              label="Default Skirmish"
            />
            <SwitchHelperText variant="caption">
              Allow <strong>Skirmish</strong> as default map
            </SwitchHelperText>
          </FormGroup>
        </FormCard>
        {/* Reminder */}
        <FormCard>
          <FormCardTitle>Reminder</FormCardTitle>
          <Typography>
            A reminder message that will be sent to players who haven't voted
            yet. When frequency set to 0, this reminder will be shown only once
            on map end.
          </Typography>
          <FormDivider />
          <FormGroup sx={{ alignItems: 'start', mb: 1 }}>
            <StyledFormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  name="allow_opt_out"
                  defaultChecked={config.allow_opt_out}
                />
              }
              label="Map Vote Opt Out"
            />
            <SwitchHelperText variant="caption">
              Allow users to opt out of map vote reminders by using the command
              `!votemap never`
            </SwitchHelperText>
          </FormGroup>
          <TextField
            name="reminder_frequency_minutes"
            label="Reminder frequency during game"
            variant="outlined"
            defaultValue={config.reminder_frequency_minutes}
            margin="normal"
            fullWidth
            type="number"
            helperText="Set to 0 to disable."
            inputProps={{
              min: 0,
            }}
          />
          <TextField
            name="instruction_text"
            multiline
            minRows={4}
            label="Message"
            variant="filled"
            defaultValue={config.instruction_text}
            helperText="Make sure you add {map_selection} in your text"
            margin="normal"
            fullWidth
            type="text"
          />
        </FormCard>
        {/* Messages */}
        <FormCard>
          <FormCardTitle>Messages</FormCardTitle>
          <TextField
            name="thank_you_text"
            multiline
            minRows={4}
            label="Vote Response"
            variant="filled"
            defaultValue={config.thank_you_text}
            helperText="The reply to player after they voted. You can use {player_name} and {map_name} in the text. Leave blank if you don't want the confirmation message"
            margin="normal"
            fullWidth
            type="text"
          />
          <TextField
            name="help_text"
            multiline
            minRows={4}
            label="Vote Help"
            variant="filled"
            defaultValue={config.help_text}
            helperText="Help text:
          This text will show to the player in case of a bad !votemap command, or if the user types !votemap help"
            margin="normal"
            fullWidth
            type="text"
          />
          <TextField
            name="no_vote_text"
            multiline
            minRows={4}
            label="No Vote Text"
            variant="filled"
            defaultValue={config.no_vote_text}
            helperText="This text will be shown as Broadcast message when no map has been voted."
            margin="normal"
            fullWidth
            type="text"
          />
        </FormCard>
      </Wrapper>
    </Form>
  );
};
