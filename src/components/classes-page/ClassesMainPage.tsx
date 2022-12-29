import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Roles } from 'app/enums/Roles';
import groupStore from 'app/stores/groupStore';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import { ShowModGroup } from 'components/classes-page/AddEditGroup/ShowModGroup/ShowModGroup';
import SearchBar from 'components/classes-page/search-bar/SearchBar';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { whoCanUseIt } from 'utils/whoCanUseIt';

import styles from './ClassesMainPage.module.scss';
import { ClassesRows } from './ClassesRows/ClassesRows';

export const ClassesMainPage = observer(() => {
  const {
    getGroups,
    groups,
    openModal,
    total,
    perPage,
    queryFields,
    nullableSelectedGroup,
    deleteGroup,
    setIsShowMode,
    getOneGroup,
  } = groupStore;

  const [currentPage, setCurrentPage] = useState((queryFields.page || 0) + 1);

  useEffect(() => {
    typeof queryFields.page === 'number' && setCurrentPage(queryFields.page + 1);
  }, [queryFields.page]);

  useEffect(() => {
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  const deleteCurrentCourse = (groupId: string) => {
    deleteGroup(groupId);
  };

  const openShowModeForm = (groupId: string) => {
    openModal(groupId);
    setIsShowMode(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* методист и учитель не может видеть эту кнопку  */}
        {!whoCanUseIt([Roles.Methodist, Roles.Teacher]) && (
          <Button onClick={() => openModal()} variant="contained">
            Добавить группу
          </Button>
        )}
        <div className={styles.searchBar}>
          <SearchBar />
        </div>

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
                  <TableCell>Название</TableCell>
                  <TableCell align="center">Уровень</TableCell>
                  <TableCell align="center">Время действия</TableCell>
                  <TableCell align="center">Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ClassesRows
                  groups={groups}
                  openModal={openModal}
                  deleteGroup={deleteCurrentCourse}
                  openShowModeForm={openShowModeForm}
                />
              </TableBody>
            </Table>
          </TableContainer>
          {/* <p>Total: {total}</p> */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            <Pagination
              count={Math.ceil(total / perPage)}
              color="primary"
              page={currentPage}
              onChange={(e, pageNum) => {
                queryFields.page = pageNum - 1;
                getGroups();
              }}
            />
          </Box>
        </>
      </div>
      <AddEditGroup />
    </>
  );
});
