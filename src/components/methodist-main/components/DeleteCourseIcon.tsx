import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { StatusTypes } from 'app/enums/StatusTypes';

type Props = {
  onClick: () => void;
  status: string | null;
};

export const DeleteCourseIcon: FC<Props> = ({ status, onClick }) => (
  <IconButton size="small" onClick={onClick} color="error" 
  disabled={status === StatusTypes.archive}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
);
