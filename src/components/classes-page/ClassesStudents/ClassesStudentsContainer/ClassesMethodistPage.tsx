import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import appStore from 'app/stores/appStore';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { UsersList } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/UsersList/UsersList';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import dayjs, { Dayjs } from 'dayjs';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { getLocalDateEuropeRegion } from 'utils/getLocalDateEuropeRegion';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { getCurrentCourse, currentCourse, setCurrentHomeWork, currentHomework } = coursesStore;
  const { getOneGroup, selectedGroup, groups, getGroups, nullableSelectedGroup, setQueryFields } =
    groupStore;

  const { setSelectedUserId } = appStore;

  const homeWorkDate = selectedGroup.schedule.homeworks[currentHomework.index];

  console.log('selectedGroup', toJS(selectedGroup));
  console.log('currentCourse', toJS(currentCourse));

  const [workIndex, setWorkIndex] = useState(1);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [filteredSchedule, setFilteredSchedule] = useState(selectedGroup.schedule.homeworks);

  console.log('filteredSchedule', toJS(filteredSchedule));
  console.log('date', toJS(date?.format('DD/MM/YYYY')));

  // const [filteredHomeWork, setValue] = useState(1);

  useEffect(() => {
    setFilteredSchedule(selectedGroup.schedule.homeworks);
  }, [selectedGroup]);

  const getCurrentHomeWork = async () => {
    setWorkIndex(1);
    await getCurrentCourse(selectedGroup.course.id);
    await setCurrentHomeWork(0);
  };

  const onChangeWorkIndex = (event: ChangeEvent<unknown>, newWorkIndex: number) => {
    setWorkIndex(newWorkIndex);
  };

  // переключение по домашкам
  useEffect(() => {
    setCurrentHomeWork(workIndex - 1);
  }, [workIndex]);

  // переключение по группам
  useEffect(() => {
    getCurrentHomeWork();
  }, [selectedGroup]);

  // получение всех групп
  useEffect(() => {
    setQueryFields({ perPage: 1000 });
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        <DatePicker
          views={['year', 'month']}
          label="год и месяц"
          value={date}
          onChange={newValue => {
            setDate(newValue);
            console.log('newValue', toJS(newValue?.toDate()));
          }}
          renderInput={params => <TextField {...params} helperText={null} />}
        />
        <div>Номер домашнего задания:</div>
        <Pagination
          count={Math.ceil(filteredSchedule?.length || 1)}
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
