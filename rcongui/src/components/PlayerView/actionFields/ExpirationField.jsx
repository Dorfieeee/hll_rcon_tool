import React from 'react';
import { ControlledDesktopDateTimePicker } from '../../form/ControlledDesktopDateTimePicker';
import dayjs from 'dayjs';

export const ExpirationField = ({ control, errors, ...props }) => {
  const error = errors['expiration'];
  const hasError = !!error;

  return (
    <ControlledDesktopDateTimePicker
      defaultValue={props.defaultValue ?? dayjs(new Date())}
      control={control}
      errors={errors}
      name={'expiration'}
      rules={{ required: 'Expiration date is required.' }}
      error={hasError}
      disablePast
      slotProps={{
        textField: {
          helperText: hasError
            ? error.message
            : 'The date the VIP will expire.',
        },
      }}
    />
  );
};
