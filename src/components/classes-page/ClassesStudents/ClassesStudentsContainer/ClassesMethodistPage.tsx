import Pagination from '@mui/material/Pagination';
import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import worksStore from 'app/stores/WorksStore';
import CardStudent from 'components/card-student/CardStudent';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { currentHomework, getCurrentWork } = worksStore;
  const { getCurrentCourse, currentCourse } = coursesStore;
  const { getOneGroup, selectedGroup, groups, getGroups, nullableSelectedGroup, setQueryFields } =
    groupStore;

  const [workIndex, setWorkIndex] = useState(1);

  const getCurrentHomeWork = async () => {
    await getCurrentCourse(selectedGroup.course.id);

    if (currentCourse?.works) {
      const workId = currentCourse?.works[workIndex - 1];

      await getCurrentWork(workId?.workId);
    }
  };

  const onChangeWorkIndex = (event: ChangeEvent<unknown>, newWorkIndex: number) => {
    setWorkIndex(newWorkIndex);
    getCurrentHomeWork();
  };

  useEffect(() => {
    setQueryFields({ perPage: 100 });
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  useEffect(() => {
    setWorkIndex(1);
    getCurrentHomeWork();
  }, [selectedGroup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        <div>Номер урока:</div>
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

        <HomeWorkDescription
          selectedGroup={selectedGroup}
          currentCourse={currentCourse}
          currentHomework={currentHomework}
        />

        {!!selectedGroup?.users.length && (
          <div className={styles.blockCardStudents}>
            {selectedGroup &&
              !!selectedGroup.users.length &&
              selectedGroup.users.map(user => <CardStudent key={user.user.id} user={user.user} />)}
          </div>
        )}
      </div>
    </div>
  );
});
