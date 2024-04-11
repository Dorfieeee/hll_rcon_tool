import React from 'react';
import dayjs from 'dayjs';
import { ControlledDesktopDateTimePicker } from '../core/ControlledDesktopDateTimePicker';

export const ExpirationField = ({ control, errors, ...props }) => {
  const error = errors['expiration'];
  const hasError = !!error;

  return (
    <ControlledDesktopDateTimePicker
      defaultValue={props.defaultValue ?? dayjs()}
      control={control}
      errors={errors}
      name={'expiration'}
      rules={{ required: 'Expiration date is required.', valueAsDate: true, validate: {
        moreThanNow: (value) => dayjs().isBefore(value),
      } }}
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
