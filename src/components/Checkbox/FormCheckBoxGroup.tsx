import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FormCheckbox, { FormCheckboxProps } from './FormCheckBox';

export type FormCheckboxGroupProps = {
  name: string;
  options: FormCheckboxProps[];
  label?: string;
};

export default function FormCheckboxGroup({
  name,
  options,
  label,
}: FormCheckboxGroupProps) {
  const { formState } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <FormControl error={!!errMessage}>
      {label && <FormLabel sx={{ textAlign: 'start' }}>{label}</FormLabel>}
      {options.map(({ name: checkboxName, ...opt }, index) => (
        <FormCheckbox key={index} name={`${name}.${checkboxName}`} {...opt} />
      ))}
      {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
    </FormControl>
  );
}
