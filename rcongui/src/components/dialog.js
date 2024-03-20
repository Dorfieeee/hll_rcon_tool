import React from "react";
import withStyles from '@mui/styles/withStyles';
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export { DialogContent, DialogActions, DialogTitle };
