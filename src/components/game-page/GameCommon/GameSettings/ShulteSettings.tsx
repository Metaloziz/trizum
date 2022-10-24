import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import React, { FC, ReactNode } from 'react';

type ShulteSettingsPropsT = {
  groupsCount: string;
  setGroupsCount: (value: string) => void;
  elementsTotal: string;
  setElementsTotal: (value: string) => void;
  sizeOptions: ReactNode;
  setColorModal: (value: boolean) => void;
  colorsMap: string[];
  digitMin: string;
  setDigitMin: (value: string) => void;
  digitMax: string;
  setDigitMax: (value: string) => void;
};

export const ShulteSettings: FC<ShulteSettingsPropsT> = props => {
  const {
    groupsCount,
    setGroupsCount,
    elementsTotal,
    setElementsTotal,
    digitMin,
    setDigitMin,
    digitMax,
    setDigitMax,
    sizeOptions,
    setColorModal,
    colorsMap,
  } = props;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Минимальное число на поле"
            value={digitMin}
            onChange={({ currentTarget: { value } }) => setDigitMin(value)}
            fullWidth
            inputProps={{ type: 'number' }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Максимальное число на поле"
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
            <InputLabel>Размер поля Х на Х</InputLabel>
            <Select
              value={elementsTotal}
              label="Размер поля Х на Х"
              onChange={({ target: { value } }) => setElementsTotal(value)}
            >
              {sizeOptions}
            </Select>
          </FormControl>
        </Grid>
        <div className={styles.inputBlock}>
          <div className={styles.gameModalColorBtn}>
            <label>Необходимые цвета</label>
            <button onClick={() => setColorModal(true)}>Выбор цвета</button>
          </div>
          <div style={{ display: 'flex' }}>
            {colorsMap.map(color => (
              <div
                key={color}
                style={{ backgroundColor: `${color}` }}
                className={styles.colorTemplate}
              />
            ))}
          </div>
        </div>
      </Grid>
    </>
  );
};
