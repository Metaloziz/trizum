import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Typography, Stack, IconButton } from '@mui/material';
import { FC } from 'react';
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';

type Props = {
  entity: HomeworkViewModel;
  onClick: () => Promise<void>;
  onClick1: () => Promise<void>;
};

export const HomeWorkItem: FC<Props> = ({ entity, onClick, onClick1 }) => (
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
    <TableCell>
      <Stack direction="row" justifyContent="flex-end">
        <IconButton size="small" onClick={onClick} color="primary">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={onClick1} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </TableCell>
  </TableRow>
);
