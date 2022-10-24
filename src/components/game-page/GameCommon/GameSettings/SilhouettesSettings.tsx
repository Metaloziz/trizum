import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type SilhouettesSettingsPropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  sizeOptions: ReactNode;
  digitMax: string;
  setDigitMax: (value: string) => void;
};
export const SilhouettesSettings: FC<SilhouettesSettingsPropsT> = props => {
  const { elementsTotal, setElementsTotal, sizeOptions, digitMax, setDigitMax } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Кол-во фигур для угадывания</InputLabel>
          <Select
            value={elementsTotal}
            label="Кол-во силуэтов для угадывания"
            onChange={({ target: { value } }) => setElementsTotal(value)}
          >
            {sizeOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во фигур для угадывания"
          value={digitMax}
          onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
};
