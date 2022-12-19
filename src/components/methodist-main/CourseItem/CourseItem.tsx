import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell, Stack, IconButton } from '@mui/material';
import { FC } from 'react';
import { StatusTypes } from 'app/enums/StatusTypes';
import { ShortCourseType } from 'app/types/CourseTypes';
import { getNameFromEnum } from 'utils/getNameFromEnum';
import { transformDate } from 'utils/transformData';
import { translateStatus } from '../helpers';

type Props = {
  course: ShortCourseType;
  openDialogCallBack: () => void;
  removeCallBack: () => void;
};

export const CourseItem: FC<Props> = ({ course, openDialogCallBack, removeCallBack }) => {
  const isDisableDelete = course.status === StatusTypes.archive;

  const isDisableEdit = course.status !== StatusTypes.draft;

  return (
    <TableRow
      hover
      sx={{
        '& > td': {
          verticalAlign: 'top',
        },
      }}
    >
      <TableCell>{course.title}</TableCell>
      <TableCell align="center">{translateStatus(course.level)}</TableCell>
      <TableCell align="center">{course.worksCount}</TableCell>
      <TableCell align="center">{transformDate(course.createdAt?.date)}</TableCell>
      <TableCell align="center">{getNameFromEnum(course.status)}</TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton
            size="small"
            onClick={openDialogCallBack}
            color="primary"
            disabled={isDisableEdit}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={removeCallBack}
            color="error"
            disabled={isDisableDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
