import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type ArgusSettingsPropsT = {
  setElementsTotal: (value: string) => void;
  elementsTotal: string;
  errorAcceptable: string;
  setErrorAcceptable: (value: string) => void;
  setSpeed: (value: string) => void;
  speed: string;
};
export const ArgusSettings: FC<ArgusSettingsPropsT> = props => {
  const { errorAcceptable, setErrorAcceptable, speed, setSpeed, setElementsTotal, elementsTotal } =
    props;
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
          label={`Время на запоминание ${speed} в мс.`}
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
};
