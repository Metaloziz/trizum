import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type FirefliesPropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
};
export const FirefliesSettings: FC<FirefliesPropsT> = ({ setElementsTotal, elementsTotal }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Кол-во светлячков"
        value={elementsTotal}
        onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
        fullWidth
        inputProps={{ type: 'number' }}
        variant="outlined"
        size="small"
      />
    </Grid>
  </Grid>
);
