import React, { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import styles from './ClassesPage.module.scss';

import { DateTime } from 'app/enums/DateTime';
import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Button from 'components/button/Button';
import CardStudent from 'components/card-student/CardStudent';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import BlockGames from 'components/classes-page/block-games/BlockGames';
import SearchBar from 'components/classes-page/search-bar/SearchBar';
import { checkRoleForClasses } from 'utils/checkRoleForClasses';

const levelRu = {
  easy: 'Младшая группа',
  medium: 'Средняя группа',
  hard: 'Старшая группа',
};

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
        <div className={styles.searchBar}>
          {checkRoleForClasses(appStore.role) && (
            <Button onClick={() => openModal()}>Добавить группу</Button>
          )}
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
                  {groups.length ? (
                    groups.map(entity => (
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
                          <Typography variant="caption">{entity.name || ''}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="caption">{levelRu[entity.level] || '—'}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <>
                            <Typography variant="caption">
                              {entity.startedAt.date
                                ? moment(entity.startedAt.date).format(DateTime.DdMmYyyy)
                                : '—'}
                            </Typography>
                            <br />
                            <Typography variant="caption">
                              {entity.endedAt.date
                                ? moment(entity.endedAt.date).format(DateTime.DdMmYyyy)
                                : '—'}
                            </Typography>
                          </>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => openModal(entity.id)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
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
