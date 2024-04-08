import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export function ControlledTextInput({
  control,
  name,
  type,
  disabled,
  rules,
  ...props
}) {
  return (
    <Controller
      disabled={disabled}
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
        //   onChange={field.onChange} // send value to hook form
        //   onBlur={field.onBlur} // notify when input is touched/blur
        //   value={field.value} // input value
        //   name={field.name} // send down the input name
        //   label={field.name}
          inputRef={field.ref} // send input ref, so we can focus on input when error appear
          {...props}
          {...field}
        />
      )}
    />
  );
}
