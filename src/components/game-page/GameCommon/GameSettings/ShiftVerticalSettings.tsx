import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type ShiftVerticalSettingsPropsT = {
  cycleTime: string;
  setCycleTime: (value: string) => void;
  setElementsTotal: (value: string) => void;
  elementsTotal: string;
  groupsCount: string;
  setGroupsCount: (value: string) => void;
  blinksCount: string;
  setBlinksCount: (value: string) => void;
  sizeOptions: ReactNode;
};

export const ShiftVerticalSettings: FC<ShiftVerticalSettingsPropsT> = props => {
  const {
    cycleTime,
    setCycleTime,
    setBlinksCount,
    blinksCount,
    groupsCount,
    setGroupsCount,
    setElementsTotal,
    elementsTotal,
    sizeOptions,
  } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={`Задержка ${cycleTime} сек.`}
            value={cycleTime}
            onChange={({ currentTarget: { value } }) => setCycleTime(value)}
            fullWidth
            inputProps={{ type: 'number' }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Количество уровней в игре"
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
            <InputLabel>Кол-во цветов</InputLabel>
            <Select
              value={groupsCount}
              label="Кол-во цветов"
              onChange={({ target: { value } }) => setGroupsCount(value)}
            >
              {sizeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Формы</InputLabel>
            <Select
              value={blinksCount}
              label="Формы"
              onChange={({ target: { value } }) => setBlinksCount(value)}
            >
              {sizeOptions}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
