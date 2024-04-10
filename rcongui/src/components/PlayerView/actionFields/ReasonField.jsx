import { ControlledTextInput } from '../../form/ControlledTextInput';

export const ReasonField = ({ control, errors }) => {
  const error = errors['reason'];
  const hasError = !!error;

  return (
    <ControlledTextInput
      error={hasError}
      rules={{ required: 'Reason is required' }}
      helperText={hasError ? error.message : 'The message displayed to the player.'}
      name={'reason'}
      label={'Reason'}
      multiline
      minRows={5}
      fullWidth
      control={control}
    />
  );
};