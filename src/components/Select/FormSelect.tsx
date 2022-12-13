import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ComponentProps, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type FormSelectProps = {
  name: string;
  id?: string;
  label?: string;
  options: { label: string; value: string | number }[];
  render?: (value: string | number) => ReactNode;
} & ComponentProps<typeof Select>;

function FormSelect({
  name,
  id,
  options,
  label,
  render,
  ...props
}: FormSelectProps) {
  const { control, formState } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl sx={{ minWidth: 120 }} error={!!errMessage}>
          {label && <InputLabel id={id}>{label}</InputLabel>}
          <Select
            value={field.value}
            label={label}
            sx={{ backgroundColor: 'white' }}
            onChange={field.onChange}
            onBlur={field.onBlur}
            renderValue={(value) =>
              render ? (
                render(value)
              ) : (
                <Box textAlign={'start'}>
                  {options.find((item) => item.value === value)?.label || ''}
                </Box>
              )
            }
            {...props}
          >
            {options.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default FormSelect;
