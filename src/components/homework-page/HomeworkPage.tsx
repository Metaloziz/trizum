import gamesStore from 'app/stores/gamesStore';
import { useEffect, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  IconButton,
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
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { AddOrEditDialog } from './AddOrEditDialog';
import { HomeworkStore } from './stores';

import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';

export const HomeworkPage = observer(() => {
  const store = useMemo(() => new HomeworkStore(), []);

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
      <AddOrEditDialog store={store} />
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
                <TableCell width="auto">Описание</TableCell>
                <TableCell>Количество игр</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {store.entities.length > 0 ? (
                store.entities.map(entity => (
                  <TableRow
                    key={entity.id}
                    hover
                    sx={{
                      '& > td': {
                        verticalAlign: 'top',
                      },
                    }}
                  >
                    <TableCell>
                      <Typography>{entity.title || ''}</Typography>
                    </TableCell>
                    <TableCell>{/* <Typography>{entity.text || "—"}</Typography> */}</TableCell>
                    <TableCell>
                      {/* <Typography>{entity.gamePresets.length || "0"}</Typography> */}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => store.openDialog(entity)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => store.remove(entity.id!)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
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
