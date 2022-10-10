import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Typography, Stack, IconButton } from '@mui/material';
import { FC } from 'react';
import { StatusEnum, StatusTypes } from '../../../app/enums/StatusTypes';
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';

type Props = {
  entity: HomeworkViewModel;
  openDialogCallBack: () => Promise<void>;
  removeCallBack: () => void;
};

export const HomeWorkItem: FC<Props> = ({ entity, openDialogCallBack, removeCallBack }) => {
  const name = entity.status as StatusTypes;

  const status = StatusEnum[name].toLowerCase();

  const isDisable = entity.status === StatusTypes.archive;

  return (
    <TableRow
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
      <TableCell align="center">
        <Typography>{entity.text || '—'}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{entity.gamePresetsCount || '0'}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{status || ''}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton
            size="small"
            onClick={openDialogCallBack}
            color="primary"
            disabled={isDisable}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={removeCallBack} color="error" disabled={isDisable}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
