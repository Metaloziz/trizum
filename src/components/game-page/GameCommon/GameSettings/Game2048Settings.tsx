import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type Game2048SettingsPropsT = {
  setGroupsCount: (value: string) => void;
  groupsCount: string;
  sizeOptions: ReactNode;
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
};
export const Game2048Settings: FC<Game2048SettingsPropsT> = props => {
  const { sizeOptions, groupsCount, setGroupsCount, setElementsTotal, elementsTotal } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Размер поля Х на Х</InputLabel>
          <Select
            value={groupsCount}
            label="Размер поля Х на Х"
            onChange={({ target: { value } }) => setGroupsCount(value)}
          >
            {sizeOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во начальных блоков"
          value={elementsTotal}
          onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
};
