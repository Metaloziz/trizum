import { OptionT } from 'app/types/OptionT';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';

type SelectBlockPropsT = {
  width: number;
  presetId: string;
  openModal: () => void;
  stopGame?: () => void;
  presetArrs: OptionT[];
  setPreset: (value: OptionT) => void;
  groupOptions: OptionT[];
};

export const SelectBlock: FC<SelectBlockPropsT> = props => {
  const { width, stopGame, presetId, openModal, presetArrs, setPreset, groupOptions } = props;
  const onChangePreset = (data: OptionT) => {
    stopGame && stopGame();
    setPreset(data);
  };

  return (
    <div style={{ width: `${width}px` }} className={styles.wrapGameBlock_header}>
      <div className={styles.wrapGameBlock_header_select}>
        <InformationItem
          variant="select"
          size="normal"
          placeholder="Шаблон"
          option={presetArrs}
          onChangeSelect={data => onChangePreset(data)}
        />
      </div>
      {/* <div className={styles.wrapGameBlock_header_select}> */}
      {/*  <InformationItem variant="select" size="normal" placeholder="Год" /> */}
      {/* </div> */}
      {/* <div className={styles.wrapGameBlock_header_select}> */}
      {/*  <InformationItem variant="select" size="normal" placeholder="Месяц" /> */}
      {/* </div> */}
      <div className={styles.wrapGameBlock_header_select}>
        <InformationItem
          variant="select"
          size="normal"
          placeholder="Группа"
          option={groupOptions}
        />
      </div>
      <Button onClick={openModal}>{presetId ? 'Изменить настройки' : 'Создать настройки'}</Button>
    </div>
  );
};
