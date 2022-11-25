import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Pagination } from '@mui/material';
import { AppRoutes } from 'app/enums/AppRoutes';
import { StatusEnum, StatusTypes } from 'app/enums/StatusTypes';
import testsStore from 'app/stores/testsStore';
import Button from 'components/button/Button';
import Table from 'components/table/Table';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './TestsList.module.scss';

const colNames = ['Наименование', 'Статус', 'Дата создания', 'Редактировать'];

export const TestsList = observer(() => {
  const { setTests, tests, total, perPage, page, setSearchParams, editTest } = testsStore;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    setSearchParams({ page: newCurrentPage - 1 });
    setTests();
  };

  useEffect(() => {
    setSearchParams({ page: 0, status: null });
    setTests();
  }, []);

  const markTestRemoval = (testId: string) => {
    editTest(testId, { status: StatusTypes.removal });
  };

  const showAddTestModal = () => {
    navigate(`${AppRoutes.TestEditor}/new-test`);
  };

  const showEditTestModal = (testId: string) => {
    navigate(`${AppRoutes.TestEditor}/${testId}`);
  };

  return (
    <div className={style.container}>
      <h2>Список тестов</h2>
      <Button onClick={showAddTestModal}>Добавить тест</Button>
      <Table colNames={colNames}>
        {tests.map(({ id, title, status, createdAt }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{StatusEnum[status]}</td>
            <td>{new Date(createdAt.date).toLocaleDateString()}</td>

            <td>
              <IconButton size="large" onClick={() => showEditTestModal(id)} color="primary">
                <EditIcon fontSize="large" />
              </IconButton>
              <IconButton
                size="large"
                onClick={() => markTestRemoval(id)}
                color="error"
                disabled={status === StatusTypes.archive || status === StatusTypes.removal}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </td>
          </tr>
        ))}
      </Table>

      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(total / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
});
