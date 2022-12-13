import { FormControl, FormHelperText, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useFormContext } from 'react-hook-form';

export type FormTimePickerProps = {
  name: string;
  label?: string;
};

const FormTimePicker = ({ name, label }: FormTimePickerProps) => {
  const { formState, control } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl error={!!errMessage}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label={label}
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <TextField sx={{ backgroundColor: 'white' }} {...params} />
              )}
            />
          </LocalizationProvider>
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormTimePicker;
