import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Typography, IconButton } from '@mui/material';
import moment from 'moment';
import React, { FC } from 'react';
import { DateTime } from '../../../app/enums/DateTime';
import { GroupLevels } from '../../../app/enums/GroupLevels';
import groupStore from '../../../app/stores/groupStore';

export type ClassesRowsProps = {
  groups: typeof groupStore.groups;
  openModal: typeof groupStore.openModal;
};

export const ClassesRows: FC<ClassesRowsProps> = ({ groups, openModal }) => {
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
            <TableCell align="right">
              <IconButton size="small" onClick={() => openModal(entity.id)} color="primary">
                <EditIcon fontSize="small" />
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
