import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Typography, IconButton } from '@mui/material';
import { StatusTypes } from 'app/enums/StatusTypes';
import moment from 'moment';
import React, { FC } from 'react';
import { DateTime } from 'app/enums/DateTime';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupStatus } from 'app/enums/GroupStatus';
import groupStore from 'app/stores/groupStore';

export type ClassesRowsProps = {
  groups: typeof groupStore.groups;
  openModal: typeof groupStore.openModal;
  deleteGroup: (id: string) => void;
};

export const ClassesRows: FC<ClassesRowsProps> = ({ groups, openModal, deleteGroup }) => {
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
              <IconButton size="small" onClick={() => openModal(entity.id)} color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => deleteGroup(entity.id)}
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
