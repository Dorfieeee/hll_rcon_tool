import { ButtonGroup, Button } from '@mui/material';
import React from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ActionButton = ({
  blacklisted,
  onUnBlacklist,
  onBlacklist,
  onTempBan,
  onUnban,
  onflag,
  isVip,
  onAddVip,
  isWatched,
  onAddToWatchList,
  onRemoveFromWatchList,
}) => {
  return (
    <ButtonGroup size="small" variant="text">
      <Button>
        {blacklisted ? (
          <Tooltip
            title="Remove the player from the blacklist. This will also remove any bans already applied."
            arrow
          >
            <BlockIcon size="small" color="primary" onClick={onUnBlacklist} />
          </Tooltip>
        ) : (
          <Tooltip
            title="Add the player to the blacklist. They will be perma banned at their next connection (applies to all servers)"
            arrow
          >
            <BlockIcon size="small" onClick={onBlacklist} />
          </Tooltip>
        )}
      </Button>

      <Button>
        <Tooltip
          title="Apply temp ban to player (time will start from now). (applied to all servers)"
          arrow
        >
          <AccessTimeIcon size="small" onClick={onTempBan} />
        </Tooltip>
      </Button>

      <Button>
        <Tooltip title="Remove all bans (temp or perma)" arrow>
          <HowToRegIcon size="small" onClick={onUnban} />
        </Tooltip>
      </Button>

      <Button>
        <Tooltip title="Add a Flag to the player" arrow>
          <FlagIcon size="small" onClick={onflag} />
        </Tooltip>
      </Button>

      <Button>
        {isVip ? (
          <Tooltip title="Remove player from VIPs." arrow>
            <StarBorder color="primary" onClick={onAddVip} />
          </Tooltip>
        ) : (
          <Tooltip title="Add player to VIPs." arrow>
            <StarIcon size="small" onClick={onAddVip} />
          </Tooltip>
        )}
      </Button>

      <Button>
        {isWatched ? (
          <Tooltip title="Remove player from the watchlist." arrow>
            <VisibilityIcon
              size="small"
              color="primary"
              onClick={onRemoveFromWatchList}
            />
          </Tooltip>
        ) : (
          <Tooltip
            title="Add player to watchlist. You'll be notified on your configured webhook(s) upon their connections"
            arrow
          >
            <VisibilityIcon size="small" onClick={onAddToWatchList} />
          </Tooltip>
        )}
      </Button>
    </ButtonGroup>
  );
};
