import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

export type FormInputProps = React.ComponentProps<typeof TextField> & {
  name: string;
};

function FormInput(props: FormInputProps) {
  const { register, formState } = useFormContext();

  const [baseName, ...nestedNames] = props.name.split('.');

  let error = formState.errors[baseName] as any;

  if (error)
    for (let name of nestedNames) {
      if (error) error = error[name];
      else break;
    }

  const errMessage = error?.message;

  return (
    <TextField
      error={!!errMessage}
      helperText={errMessage || ''}
      sx={{ backgroundColor: 'white' }}
      {...props}
      {...register(props.name)}
    />
  );
}

export default FormInput;
