import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { getConfig } from 'components/results/LineContainer/getConfig';
import styles from 'components/results/Results.module.scss';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export const LineContainer: FC = observer(() => {
  const { user } = appStore;
  const { playResults, getPlayResults } = gamesStore;

  useEffect(() => {
    getPlayResults(user.id);
  }, []);

  return <div>{playResults && <Line className={styles.canvas} {...getConfig(playResults)} />}</div>;
});
