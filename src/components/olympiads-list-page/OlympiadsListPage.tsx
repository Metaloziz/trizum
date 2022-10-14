import React, { useEffect, useState } from 'react';

import styles from './OlympiadsListPage.module.scss';

import Table from 'components/table/Table';
import { Pagination } from '@mui/material';
import groupStore from 'app/stores/groupStore';
import Button from '@mui/material/Button';
import { getFullYearsFromDate } from 'utils/getFullYearsFromDate';
import { observer } from 'mobx-react-lite';

export const colNames = ['№', 'ФИО', 'Возраст', 'Дата', 'Количество баллов', 'Результаты'];

const OlympiadsListPage = observer(() => {
  const { selectedGroup } = groupStore;

  const { users } = selectedGroup; // todo доделать локальную пагинацию

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const isShowResult = users[0] && users[0] !== undefined;

  return (
    <div className={styles.container}>
      <h2>Результат олимпиады</h2>
      <div className={styles.tableBlock}>
        {isShowResult ? (
          <Table loading={false} colNames={colNames}>
            {users.map(
              ({ id, user: { firstName, middleName, lastName, birthdate }, stats }, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{middleName + ' ' + firstName + ' ' + lastName}</td>
                  <td>{getFullYearsFromDate(birthdate.date)}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <Button>перейти</Button>
                  </td>
                </tr>
              ),
            )}
          </Table>
        ) : (
          <h3 className={styles.title}>нету данных</h3>
        )}
      </div>
      <div className={styles.pagination}>
        {/* <Pagination */}
        {/*  count={Math.floor(10 / 3)} */}
        {/*  color="primary" */}
        {/*  size="large" */}
        {/*  page={currentPage} */}
        {/*  boundaryCount={1} */}
        {/*  onChange={handleChange} */}
        {/* /> */}
      </div>
    </div>
  );
});

export default OlympiadsListPage;
