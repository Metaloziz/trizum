import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import gamesStore from 'app/stores/gamesStore';

import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import { observer } from 'mobx-react-lite';
import React, { useEffect, ChangeEvent, useState } from 'react';
import homeworkStore from '../../app/stores/homeworkStore';
import styles from '../users-page/UsersPage.module.scss';

import { AddOrEditDialog } from './AddOrEditDialog';
import { HomeWorkItem } from './HomeWorkItem/HomeWorkItem';

export const HomeworkPage = observer(() => {
  const {
    setSearchParams,
    getHomeWorks,
    isLoading,
    success,
    error,
    openDialog,
    worksArray,
    remove,
    pagination,
    setSuccess,
    setError,
  } = homeworkStore;
  const { getGames, getPresets } = gamesStore;

  useEffect(() => {
    getHomeWorks();
    getGames();
    getPresets();
  }, []);

  const [currentPage, setCurrentPage] = useState(pagination.page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setSearchParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    getHomeWorks();
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <LoadingIndicator isLoading={isLoading} />
      <AddOrEditDialog />
      <Snackbar open={success !== null} autoHideDuration={6000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error?.message || 'Произошла ошибка!'}
        </Alert>
      </Snackbar>
      <Box p={2}>
        <Box mb={1}>
          <Stack spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={() => openDialog()}
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: '#2e8dfd',
              }}
            >
              Добавить домашнее задание
            </Button>
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
                <TableCell align="center" width="auto">
                  Описание
                </TableCell>
                <TableCell align="center">Количество игр</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {worksArray.length ? (
                worksArray.map(entity => (
                  <HomeWorkItem
                    key={entity.id}
                    entity={entity}
                    openDialogCallBack={() => openDialog(entity.id)}
                    removeCallBack={() => remove(entity.id!)}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>Данные отсутствуют...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(pagination.total / pagination.perPage)}
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
