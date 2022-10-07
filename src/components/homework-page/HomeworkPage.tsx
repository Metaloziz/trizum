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
  TablePagination,
  TableRow,
} from '@mui/material';
import gamesStore from 'app/stores/gamesStore';

import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import homeworkStore from '../../app/stores/homeworkStore';

import { AddOrEditDialog } from './AddOrEditDialog';
import { HomeWorkItem } from './HomeWorkItem/HomeWorkItem';

export const HomeworkPage = observer(() => {
  const store = homeworkStore;

  useEffect(() => {
    store.pull();
    gamesStore.getGames();
    gamesStore.getPresets();
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
        <TablePagination
          rowsPerPageOptions={[store.pagination.rowsPerPage]}
          component="div"
          count={store.pagination.total}
          rowsPerPage={store.pagination.rowsPerPage}
          page={store.pagination.page}
          onPageChange={(_, page) => store.changePage(page)}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`
          }
        />
      </Box>
    </Box>
  );
});
