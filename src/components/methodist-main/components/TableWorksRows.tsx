import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import methodistStore from 'app/stores/methodistStore';
import coursesStore, { NewCourseType, NewWorkType } from '../../../app/stores/coursesStore';
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';

export const TableWorksRows: FC = observer(() => {
  // const { currentCourse } = methodistStore;
  const { worksArray } = homeworkStore;

  const draftArray: NewWorkType[] = worksArray.map(el => ({
    index: Number(el.id),
    workId: el.id,
  }));

  const { currentCourse, setCurrentCourse } = coursesStore;

  const [works, setWorks] = useState<NewWorkType[]>([]);

  const addWork = (e: any, value: boolean, work: HomeworkViewModel) => {
    if (value) {
      works.push({ index: works.length, workId: work.id });

      setWorks(works);
    } else {
      const result = works.filter(el => el.workId !== work.id);
      setWorks(result);
    }

    console.log('works', [works, value]);

    setCurrentCourse({ works });
  };

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
              // checked={(currentCourse.works || []).some(w => w.id === work.id)}
              size="small"
              onChange={(e, value) => addWork(e, value, work)}

              // onChange={(__, checked) => {
              //   currentCourse.works = checked
              //     ? [...(currentCourse.works || []), work]
              //     : currentCourse.works?.filter(w => w.id !== work.id);
              // }}
            />
          </TableCell>
          <TableCell>{work.title}</TableCell>
          <TableCell width="auto">{work.text}</TableCell>
          <TableCell>{(work.gamePresets || []).length}</TableCell>
        </TableRow>
      ))}
    </>
  );
});
