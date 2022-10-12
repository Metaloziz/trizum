import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import homeworkStore from 'app/stores/homeworkStore';
import { TableWorksRows } from 'components/methodist-main/components/TableWorksRows';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, ChangeEvent } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import styles from '../../users-page/UsersPage.module.scss';

export const TableWorks = observer(() => {
  const { currentCourse } = coursesStore;
  const { getHomeWorks, setSearchParams, pagination } = homeworkStore;

  useEffect(() => {
    // if (currentCourse?.type) {
    //   let type: string;
    //   switch (currentCourse?.type) {
    //     case 'blocks':
    //       type = 'block';
    //       break;
    //     case 'class':
    //     case 'olympiad':
    //       type = 'hw';
    //       break;
    //     default:
    //       type = '';
    //   }
    //
    // }
    setSearchParams({ status: 'active', type: '', page: 0, per_page: 5 });
    // setSearchParams({ status: 'active' });
    getHomeWorks();
  }, []);

  console.log('currentCourse', [currentCourse]);

  const [currentPage, setCurrentPage] = useState(pagination.page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setSearchParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    getHomeWorks();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                '& > th': {
                  backgroundColor: '#2e8dfd',
                  color: '#fff',
                  verticalAlign: 'top',
                },
              }}
            >
              <TableCell role="checkbox">Добавить</TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell width="auto">Описание</TableCell>
              <TableCell>Количество игр</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableWorksRows />
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <Pagination
          count={pagination.total}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
    </>
  );
});
