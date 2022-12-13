import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useFormContext } from 'react-hook-form';

export type FormDateTimePickerProps = {
  name: string;
  label?: string;
};

const FormDateTimePicker = ({ name, label }: FormDateTimePickerProps) => {
  const { formState, control } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl error={!!errMessage}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={label}
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormDateTimePicker;
