import React from 'react';
import { Button, Grid, TextField, Typography, Tooltip, Unstable_Grid2 as Grid2, Stack, Paper } from '@mui/material';
import { range } from 'lodash/util';
import {
  get,
  handle_http_errors,
  postData,
  sendAction,
  showResponse,
} from '../../utils/fetchUtils';
import VipEditableList, { VipUpload } from './vips';
import AdminsEditableList from './admins';
import CollapseCard from '../collapseCard';
import ServerMessage from './serverMessage';
import NumSlider from './numSlider';
import ChangeMap from './changeMap';
import Padlock from './padlock';
import AutoRefreshLine from '../autoRefreshLine';
import { ForwardCheckBox, WordList } from '../commonComponent';
import VoteMapConfig from './voteMapConfig';
import HelpIcon from '@mui/icons-material/Help';
import MapRotation from '../MapManager';
import MapRotationSettings from '../MapManager/settings';
import { Box } from '@mui/system';

const ProfanityFiler = ({
  words,
  onWordsChange,
  onSave,
  forward,
  onFowardChange,
}) => (
  <Paper>
      <WordList
        words={words}
        onWordsChange={onWordsChange}
        label="Profanities"
        placeholder="A bad word"
        helperText="Type some text and hit enter to submit it. The words you add here will be censored in the game chat"
      />
      <ForwardCheckBox bool={forward} onChange={onFowardChange} />
      <Button variant="outlined" color="secondary" onClick={onSave}>
        Save
      </Button>
  </Paper>
);

function makeBool(text) {
  if (text === null) {
    return false;
  }
  return text === 'true';
}

function valuetext(value) {
  return `${value}`;
}

class HLLSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoBalanceThres: 0,
      teamSwitchCooldownMin: 0,
      idleAutokickMin: 0,
      maxPingMs: 0,
      queueLength: 0,
      vipSlots: 0,
      mapRotation: [],
      availableMaps: [],
      vips: [],
      admins: [],
      adminRoles: ['owner', 'senior', 'junior'],
      welcomeMessage: '',
      broadcastMessage: '',
      lockedSliders:
        window.localStorage.getItem('lockedSliders') === null
          ? true
          : makeBool(window.localStorage.getItem('lockedSliders')),
      sildersShowValues: makeBool(
        window.localStorage.getItem('sildersShowValues')
      ),
      profanities: [],
      forwardProfanities: makeBool(
        window.localStorage.getItem('forwardProfanities')
      ),
      forwardSettings: makeBool(window.localStorage.getItem('forwardSettings')),
      forwardVIP: makeBool(window.localStorage.getItem('forwardVIP')),
      forwardBroadcast: makeBool(
        window.localStorage.getItem('forwardBroadcast')
      ),
      forwardWelcome: makeBool(window.localStorage.getItem('forwardWelcome')),
      forwardRotation: makeBool(window.localStorage.getItem('forwardRotation')),
      votekickEnabled: false,
      votekickThreshold: '',
      autobalanceEnabled: false,
    };

    this.loadVips = this.loadVips.bind(this);
    this.loadAdmins = this.loadAdmins.bind(this);
    this.loadAdminRoles = this.loadAdminRoles.bind(this);
    this.loadMapRotation = this.loadMapRotation.bind(this);
    this.loadSettings = this.loadSettings.bind(this);
    this.saveSetting = this.saveSetting.bind(this);
    this.addMapsToRotation = this.addMapsToRotation.bind(this);
    this.removeMapsFromRotation = this.removeMapsFromRotation.bind(this);
    this.changeMap = this.changeMap.bind(this);
    this.toggleLockSliders = this.toggleLockSliders.bind(this);
    this.loadProfanities = this.loadProfanities.bind(this);
    this.setProfanities = this.setProfanities.bind(this);
    this.toggle = this.toggle.bind(this);
    this.saveVotekickThreshold = this.saveVotekickThreshold.bind(this);
    this.resetVotekickThreshold = this.resetVotekickThreshold.bind(this);
    this.loadVotekickThreshold = this.loadVotekickThreshold.bind(this);
    this.loadBroadcast = this.loadBroadcast.bind(this);
    this.loadWelcome = this.loadWelcome.bind(this);
    this.loadAll = this.loadAll.bind(this);
  }

  loadAll() {
    this.loadMapRotation().then(this.loadAllMaps());
    this.loadSettings().then(this.loadAdminRoles);
    this.loadVotekickThreshold();
    this.loadProfanities();
    this.loadWelcome();
    this.loadBroadcast();
  }

  toggle(name) {
    const bool = !this.state[name];
    window.localStorage.setItem(name, bool);
    this.setState({ [name]: bool });
  }

  componentDidMount() {
    this.loadAll();
  }

  toggleLockSliders() {
    this.toggle('lockedSliders');
  }

  setProfanities() {
    postData(`${process.env.REACT_APP_API_URL}set_profanities`, {
      profanities: this.state.profanities,
      forward: this.state.forwardProfanities,
    })
      .then((res) => showResponse(res, `set_profanities`, true))
      .catch(handle_http_errors);
  }

  async loadProfanities() {
    return this._loadToState('get_profanities', false, (data) =>
      this.setState({ profanities: data.result })
    );
  }

  async loadSettings() {
    return get(`get_server_settings`)
      .then((res) => showResponse(res, 'get_server_settings', false))
      .then((data) =>
        data.failed === false
          ? this.setState({
            autoBalanceThres: data.result.autobalance_threshold,
            teamSwitchCooldownMin: data.result.team_switch_cooldown,
            idleAutokickMin: data.result.idle_autokick_time,
            maxPingMs: data.result.max_ping_autokick,
            queueLength: data.result.queue_length,
            vipSlots: data.result.vip_slots_num,
            autobalanceEnabled: data.result.autobalance_enabled,
            votekickEnabled: data.result.votekick_enabled,
          })
          : null
      )
      .catch(handle_http_errors);
  }

  async _loadToState(command, showSuccess, stateSetter) {
    return get(command)
      .then((res) => showResponse(res, command, showSuccess))
      .then((res) => (res.failed === false ? stateSetter(res) : null))
      .catch(handle_http_errors);
  }

  async loadWelcome() {
    return this._loadToState('get_welcome_message', false, (data) =>
      this.setState({ welcomeMessage: data.result || '' })
    );
  }

  async loadBroadcast() {
    return this._loadToState('get_broadcast_message', false, (data) =>
      this.setState({ broadcastMessage: data.result || '' })
    );
  }

  async loadVips() {
    return this._loadToState('get_vip_ids', false, (data) =>
      this.setState({ vips: data.result })
    );
  }

  async loadVotekickThreshold() {
    return this._loadToState('get_votekick_threshold', false, (data) =>
      this.setState({ votekickThreshold: data.result })
    );
  }

  async loadAdminRoles() {
    return this._loadToState('get_admin_groups', false, (data) =>
      this.setState({ adminRoles: data.result })
    );
  }

  async loadAdmins() {
    return this._loadToState('get_admin_ids', false, (data) =>
      this.setState({ admins: data.result })
    );
  }

  async loadMapRotation() {
    return this._loadToState('get_map_rotation', false, (data) =>
      this.setState({ mapRotation: data.result })
    );
  }

  async loadAllMaps() {
    return this._loadToState('get_maps', false, (data) =>
      this.setState({ availableMaps: data.result })
    );
  }

  async saveSetting(name, value) {
    const endpointToParameters = {
      set_team_switch_cooldown: 'minutes',
      set_autobalance_threshold: 'max_diff',
      set_autobalance_enabled: 'bool_',
      set_idle_autokick_time: 'minutes',
      set_max_ping_autokick: 'max_ms',
      set_queue_length: 'num',
      set_vip_slots_num: 'num',
      set_votekick_enabled: 'bool_',
      set_votekick_threshold: 'threshold_pairs',
    };

    return postData(`${process.env.REACT_APP_API_URL}${name}`, {
      [endpointToParameters[name]]: value,
      forward: this.state.forwardSettings,
    })
      .then((res) => showResponse(res, `${name} ${value}`, true))
      .catch(handle_http_errors)
      .then(this.loadSettings);
  }

  async saveVotekickThreshold() {
    return postData(`${process.env.REACT_APP_API_URL}set_votekick_threshold`, {
      threshold_pairs: this.state.votekickThreshold,
    })
      .then((res) => showResponse(res, 'set_votekick_threshold', true))
      .then(this.loadVotekickThreshold)
      .catch(handle_http_errors);
  }

  async resetVotekickThreshold() {
    return postData(
      `${process.env.REACT_APP_API_URL}do_reset_votekick_threshold`,
      {
        threshold_pairs: this.state.votekickThreshold,
      }
    )
      .then((res) => showResponse(res, 'do_reset_votekick_threshold', true))
      .then(this.loadVotekickThreshold)
      .catch(handle_http_errors);
  }

  async addMapsToRotation(maps) {
    return sendAction('do_add_maps_to_rotation', { maps: maps }).then(
      this.loadMapRotation
    );
  }

  async removeMapsFromRotation(maps) {
    return sendAction('do_remove_maps_from_rotation', { maps: maps }).then(
      this.loadMapRotation
    );
  }

  async changeMap(map_name) {
    return postData(`${process.env.REACT_APP_API_URL}set_map`, {
      map_name: map_name,
    })
      .then((res) => showResponse(res, `command: ${map_name}`, true))
      .catch(handle_http_errors);
  }

  render() {
    const {
      autoBalanceThres,
      teamSwitchCooldownMin,
      idleAutokickMin,
      maxPingMs,
      queueLength,
      vipSlots,
      vips,
      admins,
      adminRoles,
      availableMaps,
      welcomeMessage,
      broadcastMessage,
      lockedSliders,
      profanities,
      forwardProfanities,
      forwardSettings,
      forwardVIP,
      forwardBroadcast,
      forwardWelcome,
      sildersShowValues,
      votekickEnabled,
      votekickThreshold,
      autobalanceEnabled,
    } = this.state;

    return (
      <Grid2 container component={'section'} rowSpacing={2} columnSpacing={4} {...this.props}>
        <Grid2 xs={12}>
          <Typography variant='h2'>HLL Game Server settings</Typography>
          <Typography variant='caption'>{`( 1min autorefresh )`}</Typography>
          <AutoRefreshLine
            intervalFunction={() => this.loadAll()}
            execEveryMs={60 * 1000}
            statusRefreshIntervalMs={500}
          />
        </Grid2>
        <Grid2 xs={12}>
          <ChangeMap
            availableMaps={availableMaps}
            changeMap={this.changeMap}
          />
        </Grid2>
        <Grid2 xs={12} sm={6} >
          <Box>
            <ServerMessage
              autocompleteKey="welcome"
              type="Welcome message"
              forward={forwardWelcome}
              onForwardChange={() => this.toggle('forwardWelcome')}
              value={welcomeMessage}
              setValue={(val) => this.setState({ welcomeMessage: val })}
              onSave={(val) =>
                this.setState({ welcomeMessage: val }, () =>
                  sendAction('set_welcome_message', {
                    msg: val,
                    forward: forwardWelcome,
                  })
                )
              }
            />
          </Box>
        </Grid2>
        <Grid2 xs={12} sm={6} >
          <ServerMessage
            autocompleteKey="broadcast"
            type="Broadcast message"
            value={broadcastMessage}
            forward={forwardBroadcast}
            onForwardChange={() => this.toggle('forwardBroadcast')}
            setValue={(val) =>
              this.setState({
                broadcastMessage: val,
                forward: forwardBroadcast,
              })
            }
            onSave={(val) =>
              this.setState({ broadcastMessage: val }, () =>
                sendAction('set_broadcast', {
                  msg: val,
                  forward: forwardBroadcast,
                })
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <CollapseCard title="Manage VIPs" onExpand={this.loadVips}>
            <VipUpload />
            <p>Changes are applied immediately</p>
            <VipEditableList
              peopleList={vips}
              forward={forwardVIP}
              onFowardChange={() => this.toggle('forwardVIP')}
              onAdd={(name, steamID64, expirationTimestamp) =>
                sendAction('do_add_vip', {
                  steam_id_64: steamID64,
                  name: name,
                  forward: forwardVIP,
                  expiration: expirationTimestamp,
                }).then(this.loadVips)
              }
              onDelete={(name, steamID64) =>
                sendAction('do_remove_vip', {
                  steam_id_64: steamID64,
                  forward: forwardVIP,
                }).then(this.loadVips)
              }
            />
          </CollapseCard>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <CollapseCard
            title="Manage Console admins"
            onExpand={this.loadAdmins}
          >
            <p>Changes are applied immediately</p>
            <AdminsEditableList
              peopleList={admins}
              roles={adminRoles}
              onAdd={(name, steamID64, role) =>
                sendAction('do_add_admin', {
                  steam_id_64: steamID64,
                  name: name,
                  role: role,
                }).then(this.loadAdmins)
              }
              onDelete={(name, steamID64) =>
                sendAction('do_remove_admin', { steam_id_64: steamID64 }).then(
                  this.loadAdmins
                )
              }
            />
          </CollapseCard>
        </Grid2>
        <Grid2 container xs={12} direction={'column'}  >
          <Grid2 xs={12}>
            <Padlock
              checked={lockedSliders}
              handleChange={() => this.toggle('lockedSliders')}
              label="Locked sliders"
            />
          </Grid2>
          <Grid2 xs={12}>
            <Padlock
              checked={sildersShowValues}
              handleChange={() => this.toggle('sildersShowValues')}
              label="Show all values"
            />
          </Grid2>
          <Grid2 xs={12}>
            <Padlock
              checked={forwardSettings}
              handleChange={() => this.toggle('forwardSettings')}
              label="Forward settings changes to all servers"
            />
          </Grid2>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Teamswitch cooldown (minutes)"
            max={30}
            value={teamSwitchCooldownMin}
            marks={range(0, 31, 5).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            helpText="0 to disable"
            getAriaValueText={valuetext}
            setValue={(val) => this.setState({ teamSwitchCooldownMin: val })}
            saveValue={(val) =>
              this.setState({ teamSwitchCooldownMin: val }, () =>
                this.saveSetting('set_team_switch_cooldown', val)
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Autobalance threshold"
            max={50}
            value={autoBalanceThres}
            marks={range(0, 60, 10).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            helpText="0 means the teams must match exactly"
            setValue={(val) => this.setState({ autoBalanceThres: val })}
            saveValue={(val) =>
              this.setState({ autoBalanceThres: val }, () =>
                this.saveSetting('set_autobalance_threshold', val)
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Idle autokick (minutes)"
            max={200}
            step={5}
            helpText="0 to disable"
            marks={range(0, 200, 20).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            value={idleAutokickMin === 9999 ? 0 : idleAutokickMin}
            setValue={(val) => this.setState({ idleAutokickMin: val })}
            saveValue={(val) =>
              this.setState({ idleAutokickMin: val }, () =>
                this.saveSetting(
                  'set_idle_autokick_time',
                  val === 0 ? 9999 : val
                )
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Maximum ping (ms)"
            helpText="0 to disable"
            max={2000}
            min={0}
            step={10}
            value={maxPingMs}
            marks={range(0, 2500, 500).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            setValue={(val) => this.setState({ maxPingMs: val })}
            saveValue={(val) =>
              this.setState({ maxPingMs: val }, () =>
                this.saveSetting('set_max_ping_autokick', val)
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Max queue length"
            helpText="Maximum # of people waiting"
            max={6}
            min={1}
            value={queueLength}
            marks={range(0, 7, 1).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            setValue={(val) => this.setState({ queueLength: val })}
            saveValue={(val) =>
              this.setState({ queueLength: val }, () =>
                this.saveSetting('set_queue_length', val)
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <NumSlider
            disabled={lockedSliders}
            showValue={sildersShowValues}
            text="Vip slots"
            helpText="# slots reserved"
            max={100}
            value={vipSlots}
            marks={range(0, 120, 20).map((val) => ({
              value: val,
              label: `${val}`,
            }))}
            setValue={(val) => this.setState({ vipSlots: val })}
            saveValue={(val) =>
              this.setState({ vipSlots: val }, () =>
                this.saveSetting('set_vip_slots_num', val)
              )
            }
          />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Padlock
            label="Auto balance enabled"
            checked={autobalanceEnabled}
            color="secondary"
            handleChange={(v) =>
              this.saveSetting('set_autobalance_enabled', v).then(
                this.loadSettings
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Padlock
            label="Vote kicks allowed"
            checked={votekickEnabled}
            color="secondary"
            handleChange={(v) =>
              this.saveSetting('set_votekick_enabled', v).then(
                this.loadSettings
              )
            }
          />
        </Grid2>
        <Grid2 xs={12} container >
          <Grid2 xs={6}>
            <TextField
              fullWidth
              label="Vote kick threshold"
              value={votekickThreshold}
              onChange={(e) =>
                this.setState({ votekickThreshold: e.target.value })
              }
              helperText="Use the following format, Error: First entry must be for 0 Players (you can add as many pairs as you want): player count,votekick threshold... example: 0,1,10,5,25,12,50,20"
            />
          </Grid2>
          <Grid2 xs={6}>
            <Stack direction={'column'} spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  this.saveVotekickThreshold().then(this.loadVotekickThreshold)
                }
              >
                SAVE
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  this.resetVotekickThreshold().then(this.loadVotekickThreshold)
                }
              >
                RESET
              </Button>
            </Stack>
          </Grid2>
        </Grid2>

        <Grid2 xs={12}>
          <Typography variant="h5" gutterBottom>
            Vote Map config{' '}
            <Tooltip title="When enabled this feature will managed you map rotation automatically. To display the voting options to the players you must set one of the 'votemap_' variables in your automatic broadcasts">
              <HelpIcon fontSize="small" />
            </Tooltip>
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <VoteMapConfig />
        </Grid2>
        <Grid2 xs={12}>
          <Typography variant="h5">Map rotation</Typography>

          <MapRotation />
          <Typography variant="h5">Map rotation settings</Typography>

          <MapRotationSettings />
        </Grid2>
        <Grid2 xs={12}>
          <ProfanityFiler
            words={profanities}
            onWordsChange={(words) => this.setState({ profanities: words })}
            onSave={() => this.setProfanities(profanities)}
            forward={forwardProfanities}
            onFowardChange={() => this.toggle('forwardProfanities')}
          />
        </Grid2>
      </Grid2>
    );
  }
}

export default HLLSettings;
