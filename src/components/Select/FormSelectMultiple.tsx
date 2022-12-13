import { Autocomplete, Checkbox, TextField } from '@mui/material';
import * as React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Controller, useFormContext } from 'react-hook-form';

export interface IFormSelectMultipleProps {
  name: string;
  options: { label: string; value: string | number }[];
  label?: string;
  placeholder?: string;
}

export default function FormSelectMultiple({
  name,
  options,
  label = 'Options',
  placeholder = 'Choose option',
}: IFormSelectMultipleProps) {
  const form = useFormContext();

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div ref={ref}>
          <Autocomplete
            multiple
            value={value}
            onBlur={onBlur}
            onChange={(_, values) => onChange(values)}
            options={options}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder={placeholder} />
            )}
          />
        </div>
      )}
    />
  );
}
