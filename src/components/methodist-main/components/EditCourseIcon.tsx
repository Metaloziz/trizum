import { StatusTypes } from 'app/enums/StatusTypes';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FC } from 'react';

type Props = {
  onClick: () => void;
  status: string | null;
};

export const EditCourseIcon: FC<Props> = ({ onClick, status }) => (
  <IconButton
    size="small"
    onClick={onClick}
    color="primary"
    // disabled={status !== StatusTypes.draft}
  >
    <EditIcon fontSize="small" />
  </IconButton>
);
