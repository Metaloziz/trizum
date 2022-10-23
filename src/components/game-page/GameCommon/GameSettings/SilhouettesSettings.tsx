import { FormControl, Grid, InputLabel, Select } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type SilhouettesSettingsPropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  sizeOptions: ReactNode;
};
export const SilhouettesSettings: FC<SilhouettesSettingsPropsT> = props => {
  const { elementsTotal, setElementsTotal, sizeOptions } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Кол-во фигур для угадывания</InputLabel>
          <Select
            value={elementsTotal}
            label="Кол-во фигур для угадывания"
            onChange={({ target: { value } }) => setElementsTotal(value)}
          >
            {sizeOptions}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
