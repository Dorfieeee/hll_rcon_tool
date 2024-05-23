import React from 'react';
import {
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

export const FormCard = styled(Paper, { shouldForwardProp: props => props !== 'fullWidth' })(({ theme, fullWidth }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  width: fullWidth ? '100%' : `calc(33% - ${theme.spacing(0.25)})`,
  [theme.breakpoints.down('xl')]: {
    width: fullWidth ? '100%' : `calc(50% - ${theme.spacing(0.5)})`,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const FormCardTitle = styled((props) => (
  <Typography variant={'h6'} {...props} />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const Wrapper = styled((props) => (
  <Stack gap={1} direction={'row'} flexWrap={'wrap'} {...props} />
))(({ theme }) => ({}));

export const SwitchHelperText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(-0.5),
  fontStyle: 'italic',
}));

export const FormDivider = styled((props) => (
  <Divider textAlign="left" flexItem {...props} />
))(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const StyledFormControlLabel = styled((props) => (
  <FormControlLabel labelPlacement="end" {...props} />
))(({ theme }) => ({}));
