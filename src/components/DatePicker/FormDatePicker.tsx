import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useFormContext } from 'react-hook-form';

export type FormDatePickerProps = {
  name: string;
  label?: string;
  inputFormat?: string;
};

const FormDatePicker = ({ name, label, inputFormat }: FormDatePickerProps) => {
  const { formState, control } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl error={!!errMessage}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              inputFormat={inputFormat || 'DD/MM/YYYY'}
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

export default FormDatePicker;
