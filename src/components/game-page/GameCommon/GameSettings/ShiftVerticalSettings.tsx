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
  colorsOptions: ReactNode;
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
    colorsOptions,
  } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Задержка, {cycleTime} сек</InputLabel>
            <Select
              value={cycleTime}
              label="Задержка, сек"
              onChange={({ target: { value } }) => setCycleTime(value)}
            >
              {sizeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Количество уровней в игре {elementsTotal} </InputLabel>
            <Select
              value={cycleTime}
              label="Количество уровней в игре"
              onChange={({ target: { value } }) => setElementsTotal(value)}
            >
              {sizeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Кол-во цветов</InputLabel>
            <Select
              value={groupsCount}
              label="Кол-во цветов"
              onChange={({ target: { value } }) => setGroupsCount(value)}
            >
              {colorsOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Кол-во форм</InputLabel>
            <Select
              value={blinksCount}
              label="Кол-во форм"
              onChange={({ target: { value } }) => setBlinksCount(value)}
            >
              {colorsOptions}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
