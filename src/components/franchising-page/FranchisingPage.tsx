import { useEffect, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';

import Button from '../button/Button';

import { AddOrEditDialog } from './AddOrEditDialog';
import { Filter } from './Filter';
import { LoadingIndicator } from './ui/LoadingIndicator';

import { FranchisingStore } from 'components/franchising-page/stores';
import { Roles } from 'app/stores/appStore';

const FranchisingPage = observer(() => {
  const store = useMemo(() => new FranchisingStore(), []);

  useEffect(() => {
    store.pull();
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
            <Stack
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              sx={{
                width: '100%',
                px: 1,
              }}
            >
              <Button size="small" variant="addUser" onClick={() => store.openDialog()}>
                Добавить франшизу
              </Button>
            </Stack>
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
                <TableCell>
                  Полное, сокращенное
                  <br />
                  наименование
                </TableCell>
                <TableCell>
                  Город,
                  <br />
                  Юр. адрес
                </TableCell>
                <TableCell>
                  Телефон,
                  <br />
                  E-mail
                </TableCell>
                <TableCell>
                  Расчётный счёт,
                  <br />
                  ОГРН, ИНН, КПП
                </TableCell>
                <TableCell>
                  Наименование, Кор. счёт,
                  <br />
                  БИК, ИНН, КПП банка
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {store.filteredEntities.length ? (
                store.filteredEntities.map(entity => (
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
                      {/* {entity && (
                        <>
                          <Typography variant="caption">{entity.shortName || ''}</Typography>
                          <br />
                        </>
                      )} */}
                      <Typography variant="caption">{entity.shortName || ''}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">Город: {entity.city || '—'}</Typography>
                      <br />
                      <Typography variant="caption">
                        Юр. адрес: {entity.legalAddress || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">Телефон: {entity.phone || '—'}</Typography>
                      <br />
                      <Typography variant="caption">E-mail: {entity.email || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        Расчётный счёт: {entity.checkingAccount || '—'}
                      </Typography>
                      <br />
                      <Typography variant="caption">ОГРН: {entity.ogrn || '—'}</Typography>
                      <br />
                      <Typography variant="caption">ИНН: {entity.inn || '—'}</Typography>
                      <br />
                      <Typography variant="caption">КПП: {entity.kpp || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        Наименование: {entity.bankName || '—'}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Корр. счёт банка: {entity.bankBill || '—'}
                      </Typography>
                      <br />
                      <Typography variant="caption">БИК: {entity.bankBik || '—'}</Typography>
                      <br />
                      <Typography variant="caption">ИНН: {entity.bankInn || '—'}</Typography>
                      <br />
                      <Typography variant="caption">КПП: {entity.bankKpp || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <IconButton
                          size="small"
                          onClick={() => store.openDialog(entity)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        {Roles.Tutor ? null : <IconButton
                          size="small"
                          onClick={() => store.remove(entity.id!)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>Данные отсутствуют...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
});

export default FranchisingPage;
