import { FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type FormInputProps = {
  name: string;
  label?: string;
};

function FormSwitch(props: FormInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormControlLabel
          ref={field.ref}
          control={
            <Switch
              ref={field.ref}
              checked={field.value}
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          }
          label={props.label}
        />
      )}
    />
  );
}

export default FormSwitch;
