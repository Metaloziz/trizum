import { TextField, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import appStore from 'app/stores/appStore';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { UsersList } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/UsersList/UsersList';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import { Dayjs } from 'dayjs';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { getCurrentCourse, currentCourse, setCurrentHomeWork, currentHomework } = coursesStore;
  const {
    getOneGroup,
    selectedGroup,
    groups,
    getGroups,
    nullableSelectedGroup,
    setQueryFields,
    setFilteredWHomeByDates,
    filteredHomeWork,
    resetFilteredHomeWorkByDates,
  } = groupStore;

  const { setSelectedUserId } = appStore;

  const homeWorkDate = selectedGroup.schedule.homeworks[currentHomework.index];

  console.log('selectedGroup', toJS(selectedGroup));
  console.log('currentCourse', toJS(currentCourse));

  const [workIndex, setWorkIndex] = useState(1);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const isDisableFilter = !(!!startDate && !!endDate);

  // переключение по домашкам
  useEffect(() => {
    setCurrentHomeWork(workIndex - 1);
  }, [workIndex]);

  // получение всех групп
  useEffect(() => {
    setQueryFields({ perPage: 1000 });
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  const getCurrentHomeWork = async () => {
    setWorkIndex(1);
    await getCurrentCourse(selectedGroup.course.id);
    await setCurrentHomeWork(0);
  };

  const onChangeWorkIndex = (event: ChangeEvent<unknown>, newWorkIndex: number) => {
    console.log('newWorkIndex', toJS(newWorkIndex));
    console.log('event', toJS(event));

    setWorkIndex(newWorkIndex);
  };

  const resetDate = () => {
    setStartDate(null);
    setEndDate(null);
    resetFilteredHomeWorkByDates();
    setWorkIndex(1);
    setCurrentHomeWork(workIndex - 1);
  };

  const setFilter = () => {
    if (startDate && endDate) {
      setFilteredWHomeByDates(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
      setWorkIndex(1);
      setCurrentHomeWork(workIndex - 1);
    }
  };

  // переключение по группам
  useEffect(() => {
    getCurrentHomeWork();
    resetDate();
  }, [selectedGroup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
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
        <Button onClick={setFilter} disabled={isDisableFilter}>
          применить
        </Button>
        <Button onClick={resetDate}>сбросить</Button>
        <div>Номер домашнего задания:</div>
        <Pagination
          count={Math.ceil(filteredHomeWork?.length || 1)}
          color="primary"
          size="small"
          page={workIndex}
          boundaryCount={1}
          onChange={onChangeWorkIndex}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.tabs}>
          <GroupsButtons selectedGroup={selectedGroup} groups={groups} getOneGroup={getOneGroup} />
        </div>

        <HomeWorkDescription homeWorkDate={homeWorkDate} currentHomework={currentHomework} />
        <UsersList users={selectedGroup.users} setSelectedUserId={setSelectedUserId} />
      </div>
    </div>
  );
});
