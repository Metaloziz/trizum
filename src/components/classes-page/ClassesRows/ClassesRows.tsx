import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Typography, IconButton } from '@mui/material';
import { DateTime } from 'app/enums/DateTime';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupStatus } from 'app/enums/GroupStatus';
import { StatusTypes } from 'app/enums/StatusTypes';
import groupStore from 'app/stores/groupStore';
import { toJS } from 'mobx';
import moment from 'moment';
import React, { FC } from 'react';

export type ClassesRowsProps = {
  groups: typeof groupStore.groups;
  openModal: typeof groupStore.openModal;
  deleteGroup: (id: string) => void;
  openShowModeForm: (id: string) => void;
};

export const ClassesRows: FC<ClassesRowsProps> = ({
  groups,
  openModal,
  deleteGroup,
  openShowModeForm,
}) => {
  const editGroup = (event: React.MouseEvent<HTMLButtonElement>, groupId: string) => {
    event.stopPropagation();
    console.log('event', toJS(event));

    openModal(groupId);
  };

  const deleteGroupCallBack = (event: React.MouseEvent<HTMLButtonElement>, groupId: string) => {
    event.stopPropagation();
    deleteGroup(groupId);
  };

  if (groups.length) {
    return (
      <>
        {groups.map(entity => (
          <TableRow
            key={entity.id}
            hover
            sx={{
              '& > td': {
                verticalAlign: 'top',
              },
            }}
            onClick={() => openShowModeForm(entity.id)}
          >
            <TableCell>
              <Typography variant="caption">{entity.name || ''}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">{GroupLevels[entity.level] || '—'}</Typography>
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
            <TableCell align="center">
              {entity.status
                ? GroupStatus[entity.status as keyof typeof GroupStatus]
                : entity.status}
            </TableCell>
            <TableCell align="right">
              <IconButton
                size="small"
                onClick={e => editGroup(e, entity.id)}
                color="primary"
                disabled={entity.status === StatusTypes.active}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={e => deleteGroupCallBack(e, entity.id)}
                color="error"
                disabled={entity.status === StatusTypes.archive}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
  return (
    <TableRow>
      <TableCell colSpan={6}>Данные отсутствуют...</TableCell>
    </TableRow>
  );
};
