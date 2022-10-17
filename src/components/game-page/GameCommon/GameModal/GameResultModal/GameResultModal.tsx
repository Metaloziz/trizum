import { RESULT, GameT, ResultsT } from 'app/types/GameTypes';
import Button from 'components/button/Button';
import { Dialog } from 'components/rate/ui/Dialog';
import { GameIdentifiers } from 'games';
import React, { FC } from 'react';
import styles from './gameResultModal.module.scss';

type GameResultModalPropsT = {
  gameResult: ResultsT;
  onClose: () => void;
  open: boolean;
  onStart: () => void;
  game?: GameT;
};

export const GameResultModal: FC<GameResultModalPropsT> = props => {
  const { onClose, open, onStart, game, gameResult } = props;
  const result = RESULT[gameResult?.result];

  const onlyTextResult =
    game?.code !== GameIdentifiers.memoryRhythm &&
    game?.code !== GameIdentifiers.silhouettes &&
    game?.code !== GameIdentifiers.steamEngine;

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Ваш результат</h3>
        <div className={styles.resultWrapper}>
          {!onlyTextResult ? (
            <span className={styles.resultWrapper_result}>
              <span className={styles.resultWrapper_result_count}>{result}</span>
            </span>
          ) : (
            <>
              {game?.code !== GameIdentifiers.argus && (
                <span className={styles.resultWrapper_result}>
                  Время:
                  <span className={styles.resultWrapper_result_count}>{gameResult.time}</span>
                </span>
              )}
              {gameResult.success > 0 && (
                <span className={styles.resultWrapper_result}>
                  Верных ответов:
                  <span className={styles.resultWrapper_result_count}>{gameResult.success}</span>
                </span>
              )}
              {game?.code !== GameIdentifiers.fireflies && (
                <span className={styles.resultWrapper_result}>
                  Ошибок:
                  <span className={styles.resultWrapper_result_count}>{gameResult.failed}</span>
                </span>
              )}

              <span className={styles.resultWrapper_result_text}>
                <span className={styles.resultWrapper_result_count}>{result}</span>
              </span>
            </>
          )}
        </div>
        <div className={styles.btnBlock}>
          <Button onClick={onClose}>Закончить</Button>
          <Button onClick={onStart}>Ещё раз</Button>
        </div>
      </div>
    </Dialog>
  );
};
