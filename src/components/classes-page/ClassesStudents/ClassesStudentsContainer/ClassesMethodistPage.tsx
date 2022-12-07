import Pagination from '@mui/material/Pagination';
import appStore from 'app/stores/appStore';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { HomeWorkFilter } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/HomeWorkFilter/HomeWorkFilter';
import { UsersList } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/UsersList/UsersList';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import { Dayjs } from 'dayjs';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, ChangeEvent, FC } from 'react';
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

  const getCurrentHomeWork = async () => {
    setWorkIndex(1);
    await getCurrentCourse(selectedGroup.course.id);
    await setCurrentHomeWork(0);
  };

  // переключение по домашкам
  useEffect(() => {
    setCurrentHomeWork(workIndex - 1);
  }, [workIndex]);

  // получение всех групп
  useEffect(() => {
    setQueryFields({ perPage: 1000 });
    getGroups();
    // getCurrentHomeWork();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

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

  // переключение по группам
  useEffect(() => {
    getCurrentHomeWork();
    resetDate();
  }, [selectedGroup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        <HomeWorkFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          workIndex={workIndex}
          setWorkIndex={setWorkIndex}
          setCurrentHomeWork={setCurrentHomeWork}
          setFilteredWHomeByDates={setFilteredWHomeByDates}
          resetDate={resetDate}
        />
        <div className={styles.buttons}>
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
