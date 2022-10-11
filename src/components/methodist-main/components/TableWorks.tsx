import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { StatusTypes } from 'app/enums/StatusTypes';
import homeworkStore from 'app/stores/homeworkStore';
import { TableWorksRows } from 'components/methodist-main/components/TableWorksRows';
import methodistStore from 'app/stores/methodistStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import { LoadingIndicator } from '../../franchising-page/ui/LoadingIndicator';

export const TableWorks: FC = observer(() => {
  const { currentCourse } = coursesStore;
  const { pagination, changePage, getHomeWorks } = homeworkStore;

  console.log('currentCourse', [currentCourse]);

  useEffect(() => {
    getHomeWorks('', 5);
  }, []);

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
              <TableCell role="checkbox" />
              <TableCell>Наименование</TableCell>
              <TableCell width="auto">Описание</TableCell>
              <TableCell>Количество игр</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableWorksRows />
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[pagination.perPage]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.perPage}
        page={pagination.page}
        onPageChange={(__, page) => changePage(page)}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`
        }
      />
    </>
  );
});
