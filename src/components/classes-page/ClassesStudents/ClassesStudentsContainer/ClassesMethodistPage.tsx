import coursesStore from 'app/stores/coursesStore';
import groupStore from 'app/stores/groupStore';
import CardStudent from 'components/card-student/CardStudent';
import { GroupsButtons } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/GroupsButtons/GroupsButtons';
import { HomeWorkDescription } from 'components/classes-page/homework-description/HomeWorkDescription';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { getOneGroup, selectedGroup, groups, getGroups, nullableSelectedGroup, setQueryFields } =
    groupStore;
  const { getCurrentCourse, currentCourse } = coursesStore;

  const loader = async () => {
    setQueryFields({ perPage: 100 });
    await getGroups();
    await getCurrentCourse(selectedGroup.course.id);
  };

  useEffect(() => {
    loader();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.tabs}>
          <GroupsButtons selectedGroup={selectedGroup} groups={groups} getOneGroup={getOneGroup} />
        </div>
        <div className={styles.blockGames}>
          <HomeWorkDescription selectedGroup={selectedGroup} currentCourse={currentCourse} />
        </div>
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
