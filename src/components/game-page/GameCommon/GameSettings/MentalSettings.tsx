import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type MentalSettingsPropsT = {
  setDelay: (value: string) => void;
  setDigitMax: (value: string) => void;
  delay: string;
  digitMax: string;
};
export const MentalSettings: FC<MentalSettingsPropsT> = props => {
  const { setDelay, delay, digitMax, setDigitMax } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Пауза при появлении цифр в мс"
          value={delay}
          onChange={({ currentTarget: { value } }) => setDelay(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Минимальное слагаемое"
          // value={min}
          // onChange={({ currentTarget: { value } }) => setMin(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Максимальное слагаемое"
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
          label="Использовать вычитание"
          // value={digitMax}
          // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          // inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Результат не больше, чем по формуле"
          // value={subtract}
          // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          // inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Результат не больше, чем по формуле"
          // value={restriction}
          // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          // inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во слагаемых в 1 задаче"
          // value={length}
          // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во задач"
          // value={count}
          // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
};
