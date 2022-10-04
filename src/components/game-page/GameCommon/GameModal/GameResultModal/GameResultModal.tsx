import Button from 'components/button/Button';
import { Dialog } from 'components/rate/ui/Dialog';
import React from 'react';
import styles from './gameResultModal.module.scss';

export const GameResultModal = (props: any) => {
  const { time, error, onClose, open, success, onStart } = props;
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Ваш результат</h3>
        <div className={styles.resultWrapper}>
          <span className={styles.resultWrapper_result}>
            Время: <span className={styles.resultWrapper_result_count}>{time}</span>
          </span>
          {success && (
            <span className={styles.resultWrapper_result}>
              Верных ответов: <span className={styles.resultWrapper_result_count}>{success}</span>
            </span>
          )}
          <span className={styles.resultWrapper_result}>
            Ошибок: <span className={styles.resultWrapper_result_count}>{error}</span>
          </span>
        </div>
        <div className={styles.btnBlock}>
          <Button onClick={onClose}>Закончить</Button>
          <Button onClick={onStart}>Ещё раз</Button>
        </div>
      </div>
    </Dialog>
  );
};