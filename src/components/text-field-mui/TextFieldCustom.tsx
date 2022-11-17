import { FC, forwardRef } from 'react';

import { FormControl, FormHelperText, StandardTextFieldProps, TextField } from '@mui/material';

interface Props extends Omit<StandardTextFieldProps, 'error'> {
  error?: string;
}

const TextFieldCustom: FC<Props> = forwardRef(({ type, error, label, ...rest }, ref) => (
  <FormControl sx={{ width: '100%' }} error={!!error}>
    <TextField
      sx={{ width: '100%' }}
      ref={ref}
      error={!!error}
      label={label}
      id="outlined-error-helper-text"
      {...rest}
    />
    <FormHelperText error>{error}</FormHelperText>
  </FormControl>
));
export default TextFieldCustom;
