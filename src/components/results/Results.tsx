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
import BlueButton from 'components/atoms/GameResultItem/BlueButton';
import UserCard from 'components/atoms/userCard';
import Button from 'components/button/Button';
import CalendarResults from 'components/molecules/CalendarResults';
import SelectResults from 'components/molecules/SelectResults/SelectResults';
import { LineContainer } from 'components/results/LineContainer/LineContainer';
import { gamesAr, ResultsView, gamesArr } from 'components/results/mockData/mockData';
import Tablet from 'components/tablet/Tablet';
import { observer } from 'mobx-react-lite';
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
  const [selectedGames, setSelectedGames] = useState<ValueLabelT[]>([]);
  const [view, setView] = useState(ResultsView.Table);
  const [selectValue, setSelectValue] = useState<SingleValue<ValueLabelT>>();

  const mockSelectData: ValueLabelT[] = [{ value: 'value', label: 'label' }];
  const { playResults, getPlayResults } = gamesStore;
  const { user } = appStore;
  console.log('user', user);

  useEffect(() => {
    getPlayResults(user.id);
  }, []);

  const onGameNameClick = (selectedGame: ValueLabelT) => {
    if (selectedGame.value === 'total' && !selectedGames.includes(selectedGame)) {
      setSelectedGames([selectedGame]);
      return;
    }
    if (selectedGame.value !== 'total' && selectedGames.find(el => el.value === 'total')) {
      const newGames = selectedGames.filter(game => game.value !== 'total');
      setSelectedGames([...newGames, selectedGame]);
      return;
    }
    if (selectedGames.includes(selectedGame)) {
      setSelectedGames(selectedGames.filter(elem => elem.value !== selectedGame.value));
    } else {
      setSelectedGames([...selectedGames, selectedGame]);
    }
  };

  const onChangeSelect = (value: SingleValue<ValueLabelT>) => {
    setSelectValue(value);
  };

  const onViewChangeClick = (value: ResultsView) => {
    if (view === value) {
      // true
    } else {
      setView(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Tablet>
          <div className={styles.blockTop}>
            <div className={styles.user}>
              <UserCard city="Москва" status="Ученик" fullName="Днепровская А.А." />
            </div>
            <div className={styles.filters}>
              <div className={styles.badges} />
            </div>
          </div>

          {/* график */}

          {playResults && <LineContainer />}

          {/* график */}

          <div className={styles.buttons}>
            <div className={styles.buttonsView}>
              <BlueButton
                title="Таблица"
                onClick={() => onViewChangeClick(ResultsView.Table)}
                isActive={view === ResultsView.Table}
                type="small"
              />
              <BlueButton
                title="График"
                isActive={view === ResultsView.Chart}
                onClick={() => onViewChangeClick(ResultsView.Chart)}
                type="small"
              />
            </div>
            <div className={styles.buttonsColumn}>
              <div className={styles.gamesSelect}>
                <div className={styles.gamesSelect_items}>
                  {gamesAr.map(game => (
                    <BlueButton
                      key={game.value}
                      title={game.label}
                      onClick={() => onGameNameClick(game)}
                      isActive={selectedGames.includes(game)}
                    />
                  ))}
                  <SelectResults
                    // TODO: мультивыбор
                    options={gamesArr}
                    minWidth="150px"
                    onChange={onChangeSelect}
                    className={styles.gamesSelect_select}
                  />
                </div>
                <Button variant="primary" size="thin">
                  Найти
                </Button>
              </div>
              <div className={styles.gamesFields}>
                <CalendarResults value="" onChange={() => console.log('asd')} />
                <CalendarResults value="" onChange={() => console.log('asd')} />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
              </div>
            </div>
          </div>
        </Tablet>
      </div>
    </div>
  );
});
export default Results;
