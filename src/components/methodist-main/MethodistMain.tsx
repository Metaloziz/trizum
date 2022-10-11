import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import { observer } from 'mobx-react-lite';
import React, { useEffect, ChangeEvent, useState } from 'react';
import { StatusTypes } from '../../app/enums/StatusTypes';
import coursesStore from '../../app/stores/coursesStore';
import methodistStore from '../../app/stores/methodistStore';
import styles from '../users-page/UsersPage.module.scss';

import { AddOrEditDialog } from './AddOrEditDialog';
import { CourseItem } from './CourseItem/CourseItem';
import { Filter } from './Filter';

export enum LevelHomeWork {
  easy = 'Младшая группа',
  medium = 'Средняя группа',
  hard = 'Старшая группа',
}

const MethodistMain = observer(() => {
  const store = methodistStore;

  const { getCourses, getCoursesArray, pagination, setSearchCoursesParams } = coursesStore;

  const [currentPage, setCurrentPage] = useState(pagination.page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setSearchCoursesParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    getCourses();
  };

  useEffect(() => {
    getCourses();
    // store.pull();
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <LoadingIndicator isLoading={store.isLoading} />
      <AddOrEditDialog />

      <Box p={2}>
        <Box mb={1}>
          <Stack spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={() => store.openDialog({ status: StatusTypes.draft })}
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: '#2e8dfd',
              }}
            >
              Добавить курс
            </Button>
            <Filter onChange={store.onChangeFilter} />
          </Stack>
        </Box>
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
                <TableCell>Наименование</TableCell>
                <TableCell align="center">Уровень</TableCell>
                <TableCell align="center">Количество домашних заданий</TableCell>
                <TableCell align="center">Дата создания</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {getCoursesArray ? (
                getCoursesArray.map(course => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    // onClick={() => store.openDialog(course)}
                    onClick={() => {}}
                    // onClick1={() => store.remove(course.id!)}
                    onClick1={() => store.remove(course.id!)}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>Данные отсутствуют...</TableCell>
                </TableRow>
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
      </Box>
    </Box>
  );
});

export default MethodistMain;
