import { Roles } from 'app/enums/Roles';

import appStore from 'app/stores/appStore';

import cn from 'classnames';
import Sidebar from 'components/sidebar/Sidebar';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../header/Header';

import styles from './DefaultLayout.module.scss';

type Props = Record<string, any>;

const DefaultLayout: FC<Props> = observer(({ children, ...rest }) => {
  const { isInitialized, role, loadme } = appStore;

  useEffect(() => {
    loadme();
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
