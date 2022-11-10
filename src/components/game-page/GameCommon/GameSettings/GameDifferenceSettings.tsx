import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type ArgusSettingsPropsT = {
  setElementsTotal: (value: string) => void;
  elementsTotal: string;
  errorAcceptable: string;
  setErrorAcceptable: (value: string) => void;
  setSpeed: (value: string) => void;
  speed: string;
  delayOptions: ReactNode;
  digitMax: string;
  setDigitMax: (value: string) => void;
};
export const GameDifferenceSettings: FC<ArgusSettingsPropsT> = props => {
  const {
    errorAcceptable,
    setErrorAcceptable,
    speed,
    setSpeed,
    setElementsTotal,
    elementsTotal,
    delayOptions,
    digitMax,
    setDigitMax,
  } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во правильных ответов"
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
          label="Кол-во возможных ошибок"
          value={errorAcceptable}
          onChange={({ currentTarget: { value } }) => setErrorAcceptable(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во заданий"
          value={digitMax}
          onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Время на запоминание в мс.</InputLabel>
          <Select
            value={speed}
            label="Время на запоминание в мс."
            onChange={({ target: { value } }) => setSpeed(value)}
          >
            {delayOptions}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
