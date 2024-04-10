import { ControlledTextInput } from '../../form/ControlledTextInput';

export const MessageFormFields = (props) => {
  const error = props.errors['message'];
  const hasError = !!error;

  return (
    <ControlledTextInput
      error={hasError}
      name={'message'}
      label={'Message'}
      rules={{ required: 'Message is required', minLength: { value: 5, message: 'Must be at least 5 characters long.' } }}
      helperText={hasError ? error.message : 'The message displayed to the player.'}
      multiline
      minRows={5}
      fullWidth
      {...props}
    />
  );
};
