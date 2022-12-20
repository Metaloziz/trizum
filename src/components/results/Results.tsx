import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
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
import Tablet from 'components/tablet/Tablet';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Moment } from 'moment/moment';
import React, { FC, useState, useEffect } from 'react';
import { convertEngRoleToRu } from 'utils';

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
  const { user, fullUserName, selectedUserId } = appStore;
  const { playResults, getPlayResults, setPlayResultsSearchParams } = gamesStore;

  const [createdSince, setCreatedSince] = useState<Moment | null>(null);
  const [createdUntil, setCreatedUntil] = useState<Moment | null>(moment());

  const handleChangeCreatedSince = (newValue: Moment | null) => {
    setCreatedSince(newValue);
  };

  const handleChangeCreatedUntil = (newValue: Moment | null) => {
    setCreatedUntil(newValue);
  };

  const start = createdSince?.format('DD.MM.YYYY');

  const getData = () => {
    setPlayResultsSearchParams({
      user_id: selectedUserId ?? user.id,
      per_page: 1000,
      created_since: start,
      // created_until: end,
    });
    getPlayResults();
  };

  useEffect(getData, [createdSince, createdUntil]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Tablet>
          <div className={styles.blockTop}>
            <div className={styles.user}>
              <UserCard
                city={user.city ?? ''}
                status={convertEngRoleToRu(user.role)}
                fullName={fullUserName}
              />
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
              renderInput={params => (
                <TextField {...params} onKeyDown={event => event.preventDefault()} fullWidth />
              )}
            />
            <DesktopDatePicker
              label="По"
              inputFormat="DD/MM/YYYY"
              value={createdUntil}
              onChange={handleChangeCreatedUntil}
              renderInput={params => (
                <TextField {...params} onKeyDown={event => event.preventDefault()} fullWidth />
              )}
            />
          </div>
        </Tablet>
      </div>
    </div>
  );
});
export default Results;
