import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Button from 'components/button/Button';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import React, { FC, useState } from 'react';

type PropsT = {
  onClose: () => void;
  setColor: (data: ColorObj[]) => void;
  colors: ColorObj[];
  changeColor: (index: number) => void;
};
export type ColorObj = { label: string; value: boolean; hex: string; id: number };

export const GameColorPicker: FC<PropsT> = props => {
  const { onClose, setColor, colors, changeColor } = props;

  const sendColor = () => {
    setColor(colors);
    onClose();
  };

  return (
    <div className={styles.colorsWrapper}>
      <div className={styles.colorsContainer}>
        <h4>Выберите необходимые цвета</h4>
        <FormGroup className={styles.colorsFormControl}>
          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(0)} checked={colors[0].value} />}
              label={colors[0].label}
            />
            <div style={{ backgroundColor: `${colors[0].hex}` }} className={styles.colorTemplate} />
          </div>

          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(1)} checked={colors[1].value} />}
              label={colors[1].label}
            />
            <div style={{ backgroundColor: `${colors[1].hex}` }} className={styles.colorTemplate} />
          </div>

          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(2)} checked={colors[2].value} />}
              label={colors[2].label}
            />
            <div style={{ backgroundColor: `${colors[2].hex}` }} className={styles.colorTemplate} />
          </div>

          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(3)} checked={colors[3].value} />}
              label={colors[3].label}
            />
            <div style={{ backgroundColor: `${colors[3].hex}` }} className={styles.colorTemplate} />
          </div>

          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(4)} checked={colors[4].value} />}
              label={colors[4].label}
            />
            <div style={{ backgroundColor: `${colors[4].hex}` }} className={styles.colorTemplate} />
          </div>

          <div className={styles.colorsFormControl_colorSettings}>
            <FormControlLabel
              control={<Checkbox onClick={() => changeColor(5)} checked={colors[5].value} />}
              label={colors[5].label}
            />
            <div style={{ backgroundColor: `${colors[5].hex}` }} className={styles.colorTemplate} />
          </div>
        </FormGroup>
        {/* Dodelat` knopky */}
        <Button size="small" onClick={sendColor}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};
