import DeleteIcon from '@mui/icons-material/Delete';
import { TableRow, TableCell, Typography, IconButton } from '@mui/material';
import { FC } from 'react';

type Props = {
  nameGamePreset: string | undefined;
  namePreset: string | undefined;
  onClick: () => void;
};

export const PresetElement: FC<Props> = ({ namePreset, nameGamePreset, onClick }) => (
  <TableRow
    hover
    sx={{
      '& > td': {
        verticalAlign: 'top',
      },
    }}
  >
    <TableCell>
      <Typography>{nameGamePreset || ''}</Typography>
    </TableCell>
    <TableCell>
      <Typography>{namePreset || ''}</Typography>
    </TableCell>
    <TableCell align="right">
      <IconButton size="small" onClick={onClick} color="error">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </TableCell>
  </TableRow>
);
