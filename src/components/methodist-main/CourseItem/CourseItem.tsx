import { TableRow, TableCell, Stack } from '@mui/material';
import { StatusEnum, StatusTypes } from '../../../app/enums/StatusTypes';
import { CourseViewModel } from '../../../app/viewModels/CourseViewModel';
import { transformDate } from '../../../utils/transformData';
import { DeleteCourseIcon } from '../components/DeleteCourseIcon';
import { EditCourseIcon } from '../components/EditCourseIcon';
import { translateStatus } from '../helpers';

export const CourseItem = (props: {
  entity: CourseViewModel;
  onClick: () => void;
  onClick1: () => Promise<void>;
}) => {
  const name = props.entity.status as StatusTypes;

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
      <TableCell>{props.entity.title}</TableCell>
      {/* <TableCell>{LevelHomeWork[entity.level]}</TableCell> */}
      <TableCell align="center">{translateStatus(props.entity.level)}</TableCell>
      <TableCell align="center">{props.entity.worksCount}</TableCell>
      <TableCell align="center">{transformDate(props.entity?.createdAt?.date || '')}</TableCell>
      <TableCell align="center">{status}</TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="flex-end">
          <EditCourseIcon status={props.entity.status} onClick={props.onClick} />

          <DeleteCourseIcon status={props.entity.status} onClick={props.onClick1} />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
