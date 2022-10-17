import { FC, useEffect, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import Header from '../../header/Header';

import styles from './DefaultLayout.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import Sidebar from 'components/sidebar/Sidebar';

type Props = Record<string, any>;

const DefaultLayout: FC<Props> = observer(({ children, ...rest }) => {
  const { isLoggedIn, isInitialized, role } = appStore;

  useEffect(() => {
    appStore.loadme();
  }, []);
  return !isInitialized ? (
    <>Initialising...</>
  ) : (
    <div
      className={cn(
        styles.layout,
        role === Roles.Unauthorized && styles.layout_unauth,
        role === Roles.TeacherEducation && styles.layout_teacherEducation,
      )}
    >
      <Header className={styles.header} />
      {role !== Roles.TeacherEducation && <Sidebar />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
});

export default DefaultLayout;
