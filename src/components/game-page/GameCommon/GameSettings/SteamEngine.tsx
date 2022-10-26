import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type SteamEnginePropsT = {
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  errorAcceptable: string;
  setErrorAcceptable: (value: string) => void;
  speed: string;
  setSpeed: (value: string) => void;
  groupsCount: string;
  setGroupsCount: (value: string) => void;
  sizeOptions: ReactNode;
  area: number | string;
  setArea: (value: number | string) => void;
  sizeArea: ReactNode;
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
    sizeOptions,
    area,
    setArea,
    sizeArea,
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
        <FormControl fullWidth size="small">
          <InputLabel>Кол-во снятых единиц за промах</InputLabel>
          <Select
            value={errorAcceptable}
            label="Кол-во снятых единиц за промах"
            onChange={({ target: { value } }) => setErrorAcceptable(value)}
          >
            {sizeOptions}
          </Select>
        </FormControl>
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
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Область нажатия</InputLabel>
          <Select
            value={area}
            label="Область нажатия"
            onChange={({ target: { value } }) => setArea(value)}
          >
            {sizeArea}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
