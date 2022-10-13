import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';

type PropsT = {
  started: boolean;
  gameTitle: string;
  presetDesc: string | undefined;
};

export const GameDesc: FC<PropsT> = ({ started, gameTitle, presetDesc }) => (
  <div className={styles.wrapGameBlock_footer}>
    <span className={styles.wrapGameBlock_footer_title}>{gameTitle}</span>
    {started ? (
      <span className={styles.wrapGameBlock_footer_desc}>
        Сейчас ты увидишь таблицу. <br />
        На ней будут расположены числа от 1 до 25. <br />
        Абсолютно случайным образом! Кликни мышкой на все числа по порядку от 1 до 25
        <br />
        <br />
        Постарайся делать быстро и без ошибок. <br />
        Если ошибешься - цифра подсветится красным. <br />
        Сверху от таблицы есть подсказка – какое число нужно найти следующим.
      </span>
    ) : (
      <span className={styles.wrapGameBlock_footer_desc}>
        {presetDesc ||
          ' Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: реализация намеченных плановых заданий создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке, превозмогая сложившуюся непростую экономическую ситуацию, своевременно верифицированы.'}
      </span>
    )}
  </div>
);
