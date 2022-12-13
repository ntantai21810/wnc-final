import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export type FormRadioGroupProps = {
  name: string;
  label?: string;
  id?: string;
  options: {
    label: string;
    value: string | number;
  }[];
};

const FormRadioGroup = ({ name, options, label, id }: FormRadioGroupProps) => {
  const { control, formState } = useFormContext();

  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl error={!!errMessage}>
          {label && (
            <FormLabel id={id} sx={{ textAlign: 'start' }}>
              {label}
            </FormLabel>
          )}
          <RadioGroup
            aria-labelledby={id}
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;
