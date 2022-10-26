import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type FirefliesPropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  digitMax: string;
  setDigitMax: (value: string) => void;
  levelMaxCompleted: string;
  setLevelMaxCompleted: (value: string) => void;
  speed: string;
  setSpeed: (value: string) => void;
};
export const FirefliesSettings: FC<FirefliesPropsT> = ({
  speed,
  setSpeed,
  setElementsTotal,
  elementsTotal,
  digitMax,
  setDigitMax,
  levelMaxCompleted,
  setLevelMaxCompleted,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Кол-во светлячков при старте"
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
        label="Всего светлячков на поле"
        value={digitMax}
        onChange={({ currentTarget: { value } }) => setDigitMax(value)}
        fullWidth
        inputProps={{ type: 'number' }}
        variant="outlined"
        size="small"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Кол-во уровней"
        value={levelMaxCompleted}
        onChange={({ currentTarget: { value } }) => setLevelMaxCompleted(value)}
        fullWidth
        inputProps={{ type: 'number' }}
        variant="outlined"
        size="small"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Скорость движения светлячков"
        value={speed}
        onChange={({ currentTarget: { value } }) => setSpeed(value)}
        fullWidth
        inputProps={{ type: 'number' }}
        variant="outlined"
        size="small"
      />
    </Grid>
  </Grid>
);
