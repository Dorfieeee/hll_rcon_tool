import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Tooltip,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";

export const WithPopver = ({ popoverContent, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {children}
      </div>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverContent}
      </Popover>
    </React.Fragment>
  );
};

export const ManualPlayerInput = ({
  name,
  setName,
  playerId,
  setPlayerId,
  reason,
  setReason,
  sharedMessages,
  textHistory,
  onSubmit,
  actionName,
  tooltipText,
}) => (
  <Grid container spacing={1} justifyContent="space-between">
    <Grid
      size={{
        xs: 6,
        md: 3
      }}>
      <TextField
        id="playerId"
        label="Player ID"
        helperText="Required"
        value={playerId}
        required
        fullWidth
        onChange={(e) => setPlayerId(e.target.value)}
      />
    </Grid>
    <Grid
      size={{
        xs: 6,
        md: 3
      }}>
      <TextField
        id="name"
        label="Player name"
        helperText="Optional"
        value={name}
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
    </Grid>
    <Grid
      size={{
        xs: 12,
        md: 4
      }}>
      <Autocomplete
        freeSolo
        fullWidth
        options={sharedMessages.concat(textHistory.getTexts())}
        inputValue={reason}
        required
        onInputChange={(e, value) => setReason(value)}
        renderInput={(params) => (
          <TextField {...params} label="Reason" helperText="Required" />
        )}
      />
    </Grid>
    <Grid
      size={{
        xs: 12,
        md: 2
      }}>
      <Tooltip title={tooltipText} arrow>
        <span>
          <Button
            color="secondary"
            variant="outlined"
            disabled={playerId === "" || reason === ""}
            onClick={() => {
              onSubmit();
              textHistory.saveText(reason);
            }}
          >
            {actionName}
          </Button>
        </span>
      </Tooltip>
    </Grid>
  </Grid>
);

export const ForwardCheckBox = ({ bool, onChange, label = "Forward to all servers" }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={bool}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
    }
    label={label}
  />
);

export const WordList = ({
  words,
  onWordsChange,
  label,
  placeholder,
  helperText,
}) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      autoSelect
      onChange={(e, val) => onWordsChange(val)}
      value={words}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={option}
          {...getTagProps({ index })}
          key={'chip' + option + index}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
        />
      )}
    />
  );
};
