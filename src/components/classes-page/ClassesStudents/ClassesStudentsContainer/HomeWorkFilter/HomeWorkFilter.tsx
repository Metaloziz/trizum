import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import style from './HomeWorkFilter.module.scss';
import Button from 'components/button/Button';

type Props = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setWorkIndex: (value: number) => void;
  workIndex: number;
  setFilteredWHomeByDates: (start: string, end: string) => void;
  setCurrentHomeWork: (workIndex: number) => void;
  setStartDate: (value: Dayjs | null) => void;
  setEndDate: (value: Dayjs | null) => void;
  resetDate: () => void;
};

export const HomeWorkFilter: FC<Props> = ({
  startDate,
  endDate,
  setWorkIndex,
  setFilteredWHomeByDates,
  workIndex,
  setCurrentHomeWork,
  setStartDate,
  setEndDate,
  resetDate,
}) => {
  const isDisableFilter = !(!!startDate && !!endDate);

  const setFilter = () => {
    if (startDate && endDate) {
      setFilteredWHomeByDates(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
      setWorkIndex(1);
      setCurrentHomeWork(workIndex - 1);
    }
  };

  return (
    <div className={style.container}>
      <p>Дата начала домашней работы:</p>
      <div>
        <DatePicker
          label="С"
          value={startDate}
          onChange={newValue => {
            setStartDate(newValue);
          }}
          renderInput={params => <TextField {...params} />}
        />
        <DatePicker
          label="По"
          value={endDate}
          onChange={newValue => {
            setEndDate(newValue);
          }}
          renderInput={params => <TextField {...params} />}
        />
      </div>
      <div className={style.buttons}>
        <Button onClick={setFilter} type="button" size="small" disabled={isDisableFilter}>
          применить
        </Button>
        <Button onClick={resetDate} variant="reset" size="small" disabled={isDisableFilter}>
          сбросить
        </Button>
      </div>
    </div>
  );
};
