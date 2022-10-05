import React, { FC } from 'react';

import styles from './AdminMain.module.scss';

import ReportPage from 'components/report-page';

type Props = Record<string, unknown>;

const AdminMain: FC<Props> = props => (
  // <div className={styles.container}>
    <ReportPage />
  // </div>
);

export default AdminMain;
