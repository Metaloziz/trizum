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
  const store = homeworkStore;

  useEffect(() => {
    store.pull();
    gamesStore.getGames();
    gamesStore.getPresets();
  }, []);

  const [currentPage, setCurrentPage] = useState(store.pagination.page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    store.setSearchParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    store.pull();
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <LoadingIndicator isLoading={store.isLoading} />
      <AddOrEditDialog />
      <Snackbar
        open={store.success !== null}
        autoHideDuration={6000}
        onClose={() => (store.success = null)}
      >
        <Alert onClose={() => (store.success = null)} severity="success" sx={{ width: '100%' }}>
          {store.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={store.error !== null}
        autoHideDuration={6000}
        onClose={() => (store.error = null)}
      >
        <Alert onClose={() => (store.error = null)} severity="error" sx={{ width: '100%' }}>
          {store.error?.message || 'Произошла ошибка!'}
        </Alert>
      </Snackbar>
      <Box p={2}>
        <Box mb={1}>
          <Stack spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={() => store.openDialog()}
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
              {store.entities.length ? (
                store.entities.map(entity => (
                  <HomeWorkItem
                    key={entity.id}
                    entity={entity}
                    onClick={() => store.openDialog(entity.id)}
                    onClick1={() => store.remove(entity.id!)}
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
            count={Math.ceil(store.pagination.total / store.pagination.perPage)}
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
