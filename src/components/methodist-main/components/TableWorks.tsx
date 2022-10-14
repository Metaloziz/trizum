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
import React, { useState, ChangeEvent, FC } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import styles from '../../users-page/UsersPage.module.scss';

type Props = {
  worksArray: typeof homeworkStore.worksArray;
  getHomeWorks: typeof homeworkStore.getHomeWorks;
  setCurrentCourse: typeof coursesStore.setCurrentCourse;
  setSearchParams: typeof homeworkStore.setSearchParams;
  pagination: typeof homeworkStore.pagination;
  selectedWorks: typeof coursesStore.currentCourse.works;
};

export const TableWorks: FC<Props> = ({
  worksArray,
  getHomeWorks,
  setCurrentCourse,
  setSearchParams,
  pagination,
  selectedWorks,
}) => {
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
              <TableCell role="checkbox">Очерёдность</TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell width="auto">Описание</TableCell>
              <TableCell>Количество игр</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedWorks && (
              <TableWorksRows
                worksArray={worksArray}
                setCurrentCourse={setCurrentCourse}
                selectedWorks={selectedWorks}
              />
            )}
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
};
