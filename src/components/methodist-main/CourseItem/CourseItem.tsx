import { TableRow, TableCell, Stack } from '@mui/material';
import { FC } from 'react';
import { StatusEnum, StatusTypes } from '../../../app/enums/StatusTypes';
import { ShortCourseType } from '../../../app/types/CourseTypes';
import { CourseViewModel } from '../../../app/viewModels/CourseViewModel';
import { transformDate } from '../../../utils/transformData';
import { DeleteCourseIcon } from '../components/DeleteCourseIcon';
import { EditCourseIcon } from '../components/EditCourseIcon';
import { translateStatus } from '../helpers';

type Props = { course: ShortCourseType; onClick: any; onClick1: any };

export const CourseItem: FC<Props> = ({ course, onClick, onClick1 }) => {
  const name = course.status as StatusTypes;

  const status = StatusEnum[name].toLowerCase();

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
      {/* <TableCell>{LevelHomeWork[level]}</TableCell> */}
      <TableCell align="center">{translateStatus(course.level)}</TableCell>
      <TableCell align="center">{course.worksCount}</TableCell>
      <TableCell align="center">{transformDate(course.createdAt?.date || '')}</TableCell>
      <TableCell align="center">{status}</TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="flex-end">
          <EditCourseIcon status={status} onClick={onClick} />

          <DeleteCourseIcon status={status} onClick={onClick1} />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
