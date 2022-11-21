import { SelectChangeEvent } from '@mui/material';
import { OptionT } from 'app/types/OptionT';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';
import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';

type SelectBlockPropsT = {
  width: number;
  presetId: string;
  openModal: () => void;
  stopGame?: () => void;
  presetArrs: OptionT[];
  setPreset: (value: string) => void;
  groupOptions: OptionT[];
  isLoading: boolean;
};

export const SelectBlock: FC<SelectBlockPropsT> = props => {
  const { width, stopGame, presetId, openModal, presetArrs, setPreset, isLoading } = props;
  const onChangePreset = (data: SelectChangeEvent) => {
    stopGame && stopGame();
    setPreset(data.target.value);
  };

  return (
    <div style={{ width: `${width}px` }} className={styles.wrapGameBlock_header}>
      <div className={styles.wrapGameBlock_header_select}>
        <CustomSelect
          title="Шаблон"
          options={presetArrs}
          onChange={data => onChangePreset(data)}
          value={presetId === '' ? 'newSample' : presetId}
          disabled={isLoading}
        />
      </div>
      {/* <div className={styles.wrapGameBlock_header_select}> */}
      {/*  <InformationItem variant="select" size="normal" placeholder="Год" /> */}
      {/* </div> */}
      {/* <div className={styles.wrapGameBlock_header_select}> */}
      {/*  <InformationItem variant="select" size="normal" placeholder="Месяц" /> */}
      {/* </div> */}
      {/* <div className={styles.wrapGameBlock_header_select}> */}
      {/*  <InformationItem */}
      {/*    variant="select" */}
      {/*    size="normal" */}
      {/*    placeholder="Группа" */}
      {/*    option={groupOptions} */}
      {/*  /> */}
      {/* </div> */}
      <Button disabled={isLoading} onClick={openModal}>
        {presetId ? 'Изменить настройки' : 'Создать настройки'}
      </Button>
    </div>
  );
};
