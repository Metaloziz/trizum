import { Button, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { PickersMonth } from '@mui/x-date-pickers/MonthPicker/PickersMonth';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import {
  ArcElement,
  CategoryScale,
  Chart,
  Decimation,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PointElement,
  RadarController,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import UserCard from 'components/atoms/userCard';
import { LineContainer } from 'components/results/LineContainer/LineContainer';
import { ResultsView } from 'components/results/mockData/mockData';
import Tablet from 'components/tablet/Tablet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Moment } from 'moment/moment';
import React, { FC, useState, useEffect } from 'react';
import { SingleValue } from 'react-select';

// ResultTable
import styles from './Results.module.scss';

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  RadarController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);

export type ValueLabelT = {
  value: string;
  label: string;
};

const Results: FC = observer(() => {
  const { playResults, getPlayResults, setPlayResultsSearchParams } = gamesStore;
  const { user, fullUserName } = appStore;

  const [createdSince, setCreatedSince] = useState<Moment | null>(null);
  const [createdUntil, setCreatedUntil] = useState<Moment | null>(null);

  const handleChangeCreatedSince = (newValue: Moment | null) => {
    setCreatedSince(newValue);
  };

  const handleChangeCreatedUntil = (newValue: Moment | null) => {
    setCreatedUntil(newValue);
  };

  console.log('playResults', toJS(playResults));
  console.log('user', toJS(user));

  useEffect(() => {
    setPlayResultsSearchParams({
      user_id: user.id,
      per_page: 1000,
      created_since: createdSince?.format('DD.MM.YYYY'),
      created_until: createdUntil?.format('DD.MM.YYYY'),
    });
    getPlayResults();
  }, [createdSince, createdUntil]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Tablet>
          <div className={styles.blockTop}>
            <div className={styles.user}>
              <UserCard city={user.city ?? ''} status="Ученик" fullName={fullUserName} />
            </div>
            <div className={styles.filters}>
              <div className={styles.badges} />
            </div>
          </div>

          {/* график */}

          <LineContainer playResults={playResults} />

          {/* график */}

          <div className={styles.buttons}>
            <DesktopDatePicker
              label="От"
              inputFormat="DD/MM/YYYY"
              value={createdSince}
              onChange={handleChangeCreatedSince}
              renderInput={params => <TextField {...params} fullWidth />}
            />
            <DesktopDatePicker
              label="По"
              inputFormat="DD/MM/YYYY"
              value={createdUntil}
              onChange={handleChangeCreatedUntil}
              renderInput={params => <TextField {...params} fullWidth />}
            />
          </div>
        </Tablet>
      </div>
    </div>
  );
});
export default Results;
