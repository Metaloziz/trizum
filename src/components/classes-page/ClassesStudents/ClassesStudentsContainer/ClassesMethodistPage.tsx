import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import groupStore from '../../../../app/stores/groupStore';
import CardStudent from '../../../card-student/CardStudent';
import BlockGames from '../../block-games/BlockGames';
import styles from '../../ClassesMainPage.module.scss';

export const ClassesMethodistPage: FC = observer(() => {
  const { getOneGroup, selectedGroup, groups, getGroups, nullableSelectedGroup } = groupStore;

  useEffect(() => {
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.tabs}>
          <div className={styles.tabsWrapper}>
            {!!groups.length &&
              groups.map(group => (
                <div
                  className={cn(
                    styles.button,
                    selectedGroup?.id === group.id && styles.button_active,
                  )}
                  key={group.id}
                  title={group.name}
                  onClick={() => getOneGroup(group.id)}
                >
                  <span>{group.name}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.blockGames}>
          <BlockGames />
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
