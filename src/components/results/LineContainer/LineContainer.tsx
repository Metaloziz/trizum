import { PlayResultsResponseT } from 'app/types/GameTypes';
import { getConfig } from 'components/results/LineContainer/getConfig';
import styles from 'components/results/Results.module.scss';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';

export type LineContainerProps = {
  playResults: PlayResultsResponseT;
};

export const LineContainer: FC<LineContainerProps> = observer(({ playResults }) => (
  <div>
    {!!playResults.items.length && <Line className={styles.canvas} {...getConfig(playResults)} />}
  </div>
));
