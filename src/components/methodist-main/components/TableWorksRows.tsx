import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import { useState, FC } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import {NewWorkType} from "../../../app/types/NewWorkType";
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';
import { getEnumName } from '../../../utils/getEnumName';

type Props = {
  worksArray: typeof homeworkStore.worksArray;
  setCurrentCourse: typeof coursesStore.setCurrentCourse;
};

export const TableWorksRows: FC<Props> = ({ worksArray, setCurrentCourse }) => {
  const [works, setWorks] = useState<NewWorkType[]>([]);

  const addWork = (work: HomeworkViewModel) => {
    const result = works.find(el => el.workId === work.id);

    if (result) {
      const res = works.filter(el => el.workId !== result.workId);
      setWorks(res);
      setCurrentCourse({ works: res });
    } else {
      const res = [...works, { index: works.length, workId: work.id }];
      setWorks(res);
      setCurrentCourse({ works: res });
    }
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
            <Checkbox size="small" onChange={() => addWork(work)} />
          </TableCell>
          <TableCell>{work.title}</TableCell>
          <TableCell width="auto">{work.text}</TableCell>
          <TableCell>{(work.gamePresets || []).length}</TableCell>
          <TableCell width="auto">{getEnumName(work.status)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
