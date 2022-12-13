import { Controller, useFormContext } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { ComponentProps } from 'react';

export type FormCheckboxProps = ComponentProps<typeof Checkbox> & {
  name: string;
  label?: string;
};

export default function FormCheckbox({
  label,
  name,
  ...props
}: FormCheckboxProps) {
  const { control, formState } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={!!errMessage}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.value}
                onChange={field.onChange}
                inputProps={{ 'aria-label': 'controlled' }}
                {...props}
              />
            }
            label={label}
          />
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
