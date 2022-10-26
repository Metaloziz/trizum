import { GameT, ResultsNewT } from 'app/types/GameTypes';
import Button from 'components/button/Button';
import { Dialog } from 'components/rate/ui/Dialog';
import React, { FC } from 'react';
import styles from './gameResultModal.module.scss';

const GAMES_WITH_LEVEL = [
  'fireflies',
  'bigFish',
  'frazes',
  'difference',
  'memoryRhythm',
  'FindWordsNumbersShapes',
];

type GameResultModalPropsT = {
  gameResult: ResultsNewT;
  onClose: () => void;
  open: boolean;
  onStart: () => void;
  game?: GameT;
};

export const GameResultModal: FC<GameResultModalPropsT> = props => {
  const { onClose, open, onStart, gameResult } = props;

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Ваш результат</h3>
        <div className={styles.resultWrapper}>
          <span className={styles.resultWrapper_result}>
            Время:
            <span className={styles.resultWrapper_result_count}>{gameResult.time}</span>
          </span>
        </div>

        <div className={styles.resultWrapper}>
          <span className={styles.resultWrapper_result}>
            Заработано баллов:
            <span className={styles.resultWrapper_result_count}>{gameResult.success}</span>
          </span>
        </div>

        {GAMES_WITH_LEVEL.includes(gameResult.gameCode) && (
          <div className={styles.resultWrapper}>
            <span className={styles.resultWrapper_result}>
              Пройдено уровней:
              <span className={styles.resultWrapper_result_count}>
                {gameResult.levelMaxCompleted}
              </span>
            </span>
          </div>
        )}

        <div className={styles.btnBlock}>
          <Button onClick={onClose}>Закончить</Button>
          <Button onClick={onStart}>Ещё раз</Button>
        </div>
      </div>
    </Dialog>
  );
};
