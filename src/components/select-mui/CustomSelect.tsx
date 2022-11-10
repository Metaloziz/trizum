import { FormControlPropsSizeOverrides } from '@mui/material/FormControl/FormControl';
import { OverridableStringUnion } from '@mui/types';
import React, { FC, forwardRef, RefAttributes, useId } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';

export type Option = { label: string; value: string };

interface Props {
  options: Option[];
  placeholder?: string;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
  title?: string;
  error?: string;
  value: string;
  defaultValue?: Option;
  size?: OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides>;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CustomSelect: FC<Props & RefAttributes<HTMLInputElement>> = forwardRef((props, ref) => {
  const { options, onChange, title, value, error, size = 'medium', disabled, sx } = props;
  const id = useId();

  return (
    <div>
      <FormControl size={size} fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          error={!!error}
          ref={ref}
          sx={sx}
          labelId="demo-simple-select-label"
          id={id}
          label={title}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={error ? { color: 'red' } : {}}> {error}</FormHelperText>
      </FormControl>
    </div>
  );
});

export default CustomSelect;
