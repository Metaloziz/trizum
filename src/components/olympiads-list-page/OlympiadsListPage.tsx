import Button from '@mui/material/Button';
import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Table from 'components/table/Table';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFullYearsFromDate } from 'utils/getFullYearsFromDate';

import styles from './OlympiadsListPage.module.scss';

export const colNames = ['№', 'ФИО', 'Возраст', 'Количество баллов', 'Результаты'];

const OlympiadsListPage = observer(() => {
  const { selectedGroup } = groupStore;
  const { user, role } = appStore;

  const navigate = useNavigate();
  const { users } = selectedGroup; // todo доделать локальную пагинацию

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const redirectToHomeWork = (userId: string) => {
    navigate(`${AppRoutes.Olympiads}/${selectedGroup.id}/${userId}`);
  };

  const isShowResult = users[0] && users[0] !== undefined;

  return (
    <div className={styles.container}>
      <h2>Результат олимпиады</h2>
      <div className={styles.tableBlock}>
        {isShowResult ? (
          <Table loading={false} colNames={colNames}>
            {users.map(
              (
                { id, user: { firstName, middleName, lastName, birthdate, id: userId }, stats },
                index,
              ) => {
                // @ts-ignore
                const { total } = stats;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{middleName + ' ' + firstName + ' ' + lastName}</td>
                    <td>{getFullYearsFromDate(birthdate.date)}</td>
                    <td>{total !== undefined ? total : '-'}</td>
                    <td>
                      {(role === Roles.Methodist ||
                        role === Roles.Admin ||
                        (role === Roles.Student && user.id === userId)) && (
                        <Button onClick={() => redirectToHomeWork(userId)}>перейти</Button>
                      )}
                    </td>
                  </tr>
                );
              },
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
