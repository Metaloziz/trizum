import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from 'components/button/Button';
import { Button as EditButton, Pagination } from '@mui/material';
import testsStore from 'app/stores/testsStore';
import { observer } from 'mobx-react-lite';
import Table from 'components/table/Table';
import style from './TestsList.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import { TestEditForm } from 'pages/testing/TestsList/TestEditForm/TestEditForm';

const colNames = ['№', 'Наименование', 'Редактировать'];

export const TestsList = observer(() => {
  const {
    setTests,
    tests,
    total,
    perPage,
    page,
    setSearchParams,
    editTest,
    postTest,
    isSuccessPost,
    setIsSuccessPost,
    setOneTest,
    currentTest,
    isLoading,
  } = testsStore;

  const [currentPage, setCurrentPage] = useState(page + 1);
  const [isShowAddTestModal, setIsShowAddTestModal] = useState(false);
  const [isShowEditTestModal, setIsShowEditTestModal] = useState(false);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    setSearchParams({ page: newCurrentPage - 1 });
    setTests();
  };

  useEffect(() => {
    setSearchParams({ page: 0 });
    setTests();
  }, []);

  const markTestRemoval = (testId: string) => {
    editTest(testId, { status: 'removal' });
  };

  const showAddTestModal = () => {
    setIsShowAddTestModal(true);
  };

  const showEditTestModal = (testId: string) => {
    setOneTest(testId);
    setIsShowEditTestModal(true);
  };

  return (
    <div className={style.container}>
      <h2>Список тестов</h2>
      <Button onClick={showAddTestModal}>Добавить тест</Button>
      <Table colNames={colNames}>
        {tests.map(({ id, title }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>
              <EditButton onClick={() => showEditTestModal(id)}>Редактировать</EditButton>
              <EditButton color="error" onClick={() => markTestRemoval(id)}>
                Удалить
              </EditButton>
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
      <BasicModal visibility={isShowAddTestModal} changeVisibility={setIsShowAddTestModal}>
        <TestEditForm
          changeVisibility={setIsShowAddTestModal}
          postTest={postTest}
          isSuccessPost={isSuccessPost}
          setIsSuccessPost={setIsSuccessPost}
          setTests={setTests}
        />
      </BasicModal>
      <BasicModal visibility={isShowEditTestModal} changeVisibility={setIsShowEditTestModal}>
        <TestEditForm
          changeVisibility={setIsShowEditTestModal}
          postTest={postTest}
          isSuccessPost={isSuccessPost}
          setIsSuccessPost={setIsSuccessPost}
          setTests={setTests}
          testData={currentTest}
          isLoading={isLoading}
        />
      </BasicModal>
    </div>
  );
});
