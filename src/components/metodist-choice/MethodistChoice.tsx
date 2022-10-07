import { FC } from 'react';

import styles from './MethodistChoice.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const MethodistChoice: FC = () => (
  <div className={styles.methodistChoice}>
    <div>
      <InformationItem variant="input" title="Название" />
      <div className={styles.calendarBlock}>
        <InformationItem variant="calendar" title="Дата создания" />
      </div>
    </div>
    <div>
      <InformationItem
        className={styles.selectBlock}
        variant="select"
        title="Уровень группы"
        placeholder="Активен"
      />
      <div className={styles.inputWrap}>
        <InformationItem
          className={styles.input}
          variant="input"
          title="Количество уроков"
          placeholder="От"
        />
        <InformationItem className={styles.input} variant="input" placeholder="До" />
      </div>
    </div>
    <div className={styles.btnWrap}>
      <div className={styles.btnBlock}>
        <Button>Добавить</Button>
      </div>
      <Button>Найти</Button>
    </div>
  </div>
);

export default MethodistChoice;
