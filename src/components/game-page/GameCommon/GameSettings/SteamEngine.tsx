import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type SteamEnginePropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  errorAcceptable: string;
  setErrorAcceptable: (value: string) => void;
  speed: string;
  setSpeed: (value: string) => void;
  groupsCount: string;
  setGroupsCount: (value: string) => void;
};

export const SteamEngine: FC<SteamEnginePropsT> = props => {
  const {
    elementsTotal,
    setElementsTotal,
    setGroupsCount,
    groupsCount,
    setSpeed,
    speed,
    setErrorAcceptable,
    errorAcceptable,
  } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во успешных нажатий на манометр"
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
          label="Кол-во снятых единиц за промах"
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
          label="Скорость кручения стрелки манометра в сек."
          value={speed}
          onChange={({ currentTarget: { value } }) => setSpeed(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во манометров"
          value={groupsCount}
          onChange={({ currentTarget: { value } }) => setGroupsCount(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
};
