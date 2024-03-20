import { Grid, ImageList, ImageListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { ActionButton } from './PlayerTile/ActionButton';
import { PlayerHeader } from './PlayerTile/PlayerHeader';
import { PlayerFlags } from './PlayerTile/PlayerFlags';
import { PlayerSighthings } from './PlayerTile/PlayerSighthings';
import { PlayerPenalties } from './PlayerTile/PlayerPenalties';
import { PlayerBan } from './PlayerTile/PlayerBan';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => (
  <WrappedComponent {...props} width="xs" />
);

const PlayerGrid = withWidth()(({
  players,
  onBlacklist,
  onUnBlacklist,
  onUnban,
  onflag,
  onDeleteFlag,
  onAddVip,
  onDeleteVip,
  onTempBan,
  onAddToWatchList,
  onRemoveFromWatchList,
  width,
  vips,
  bans,
}) => {
  const size = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  }[width];

  return (
    <Grid container>
      <Grid item xs={12}>
        <ImageList cols={size} rowHeight={240} spacing={12}>
          {players.map((player) => {
            return (
              <ImageListItem
                key={player.get('steam_id_64')}
                style={{ minHeight: '100%' }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <PlayerHeader player={player} />
                  <React.Fragment>
                    <PlayerFlags player={player} onDeleteFlag={onDeleteFlag} />
                    <PlayerBan bans={bans} player={player} />
                    <PlayerSighthings player={player} />
                    <PlayerPenalties player={player} />
                    <Grid container justifyContent="center">
                      <Grid item>
                        <ActionButton
                          blacklisted={
                            player.get('blacklist') &&
                            player.get('blacklist').get('is_blacklisted')
                          }
                          onUnBlacklist={() => onUnBlacklist(player)}
                          onBlacklist={() => onBlacklist(player)}
                          onTempBan={() => onTempBan(player)}
                          onUnban={() => onUnban(player)}
                          onflag={() => onflag(player)}
                          isVip={vips.get(player.get('steam_id_64'))}
                          onAddVip={() => onAddVip(player)}
                          onDeleteVip={() => onDeleteVip(player)}
                          isWatched={
                            player.get('watchlist') &&
                            player.get('watchlist').get('is_watched')
                          }
                          onAddToWatchList={() => onAddToWatchList(player)}
                          onRemoveFromWatchList={() =>
                            onRemoveFromWatchList(player)
                          }
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </ImageListItem>
            );
          })}
        </ImageList>
      </Grid>
    </Grid>
  );
});

export default PlayerGrid;
