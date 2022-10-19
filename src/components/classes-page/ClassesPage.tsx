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
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import cn from 'classnames';
import CardStudent from 'components/card-student/CardStudent';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import BlockGames from 'components/classes-page/block-games/BlockGames';
import SearchBar from 'components/classes-page/search-bar/SearchBar';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { checkRoleForClasses } from 'utils/checkRoleForClasses';

import styles from './ClassesPage.module.scss';
import { ClassesRows } from './ClassesRows/ClassesRows';

const ClassesPage = observer(() => {
  const {
    getGroups,
    groups,
    getOneGroup,
    openModal,
    total,
    perPage,
    queryFields,
    selectedGroup,
    nullableSelectedGroup,
  } = groupStore;

  const [currentPage, setCurrentPage] = useState((queryFields.page || 0) + 1);

  useEffect(() => {
    typeof queryFields.page === 'number' && setCurrentPage(queryFields.page + 1);
  }, [queryFields.page]);

  const onGroupClick = async (id: string) => {
    await getOneGroup(id);
  };

  useEffect(() => {
    getGroups();
    return () => {
      nullableSelectedGroup();
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={() => openModal()} variant="contained">
          Добавить класс
        </Button>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>

        {checkRoleForClasses(appStore.role) && (
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
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ClassesRows groups={groups} openModal={openModal} />
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
        )}
        {!checkRoleForClasses(appStore.role) && (
          <div className={styles.row}>
            <div className={styles.tabs}>
              <div className={styles.tabsWrapper}>
                {!!groups.length &&
                  groups.map(group => (
                    <div
                      className={cn(
                        styles.button,
                        selectedGroup?.id === group.id && styles.button_active,
                      )}
                      key={group.id}
                      title={group.name}
                      onClick={() => onGroupClick(group.id)}
                    >
                      <span>{group.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.blockGames}>
              <BlockGames />
            </div>
            {!!selectedGroup?.users.length && (
              <div className={styles.blockCardStudents}>
                {selectedGroup &&
                  !!selectedGroup.users.length &&
                  selectedGroup.users.map(user => (
                    <CardStudent key={user.user.id} user={user.user} />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      <AddEditGroup />
    </>
  );
});

export default ClassesPage;
