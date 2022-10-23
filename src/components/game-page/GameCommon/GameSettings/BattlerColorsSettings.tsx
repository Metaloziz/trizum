import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type BattlerColorsSettingsPropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  blinksCount: string;
  setBlinksCount: (value: string) => void;
};
export const BattlerColorsSettings: FC<BattlerColorsSettingsPropsT> = props => {
  const { elementsTotal, setElementsTotal, blinksCount, setBlinksCount } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label={`Кол-во уровней в игре ${elementsTotal}`}
          value={elementsTotal}
          onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во цветов для игры"
          value={blinksCount}
          onChange={({ currentTarget: { value } }) => setBlinksCount(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
};
