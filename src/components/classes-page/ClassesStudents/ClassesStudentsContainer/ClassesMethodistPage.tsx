import Pagination from '@mui/material/Pagination';
import appStore from 'app/stores/appStore';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { UsersList } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/UsersList/UsersList';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { getCurrentCourse, currentCourse, setCurrentHomeWork, currentHomework } = coursesStore;
  const { getOneGroup, selectedGroup, groups, getGroups, nullableSelectedGroup, setQueryFields } =
    groupStore;

  const { setSelectedUserId } = appStore;

  console.log('selectedGroup', toJS(selectedGroup));
  console.log('currentCourse', toJS(currentCourse));

  const [workIndex, setWorkIndex] = useState(1);

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
        <div>Номер домашнего задания:</div>
        <Pagination
          count={Math.ceil(currentCourse?.works?.length || 1)}
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

        <HomeWorkDescription currentHomework={currentHomework} />
        <UsersList users={selectedGroup.users} setSelectedUserId={setSelectedUserId} />
      </div>
    </div>
  );
});
