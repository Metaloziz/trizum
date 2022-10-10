import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import methodistStore from 'app/stores/methodistStore';

export const TableWorksRows: FC = observer(() => {
  const { currentCourse } = methodistStore;
  const { worksArray } = homeworkStore;

  return (
    <>
      {worksArray.map(work => (
        <TableRow
          key={work.id}
          hover
          sx={{
            '& > td': {
              verticalAlign: 'top',
            },
          }}
        >
          <TableCell role="checkbox">
            <Checkbox
              checked={(currentCourse.works || []).some(w => w.id === work.id)}
              size="small"
              onChange={(__, checked) => {
                currentCourse.works = checked
                  ? [...(currentCourse.works || []), work]
                  : currentCourse.works?.filter(w => w.id !== work.id);
              }}
            />
          </TableCell>
          <TableCell>{work.title}</TableCell>
          <TableCell width="auto">{/* work.text */}</TableCell>
          <TableCell>{(work.gamePresets || []).length}</TableCell>
        </TableRow>
      ))}
    </>
  );
});
