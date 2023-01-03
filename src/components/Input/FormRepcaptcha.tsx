import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useFormContext } from "react-hook-form";

export type FormRecaptchaProps = {
  name: string;
  label?: string;
};

function FormRecaptcha({ name, label }: FormRecaptchaProps) {
  const { formState, control } = useFormContext();

  const [baseName, ...nestedNames] = name.split(".");

  let error = formState.errors[baseName] as any;

  if (error)
    for (let name of nestedNames) {
      if (error) error = error[name];
      else break;
    }

  const errMessage = error?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl
          sx={{ minWidth: 120 }}
          error={!!errMessage}
          ref={field.ref}
        >
          {label && <InputLabel>{label}</InputLabel>}

          <ReCAPTCHA
            onChange={field.onChange}
            sitekey="6Ld-ybQjAAAAAGLJplPYThGxCDr3YGSZaHBK1JO2"
          />
          {!!errMessage && <FormHelperText>{errMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default FormRecaptcha;
