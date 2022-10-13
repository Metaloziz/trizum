import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import { FC } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import { NewWorkType } from '../../../app/types/NewWorkType';
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';
import { getEnumName } from '../../../utils/getEnumName';

type Props = {
  worksArray: typeof homeworkStore.worksArray;
  setCurrentCourse: typeof coursesStore.setCurrentCourse;
  selectedWorks: NewWorkType[];
};

export const TableWorksRows: FC<Props> = ({ worksArray, setCurrentCourse, selectedWorks }) => {
  const addWork = (work: HomeworkViewModel) => {
    const result = selectedWorks.find(el => el.workId === work.id);

    if (result) {
      const res = selectedWorks.filter(el => el.workId !== result.workId);
      setCurrentCourse({ works: res });
    } else {
      const res = [...selectedWorks, { index: selectedWorks.length, workId: work.id }];
      setCurrentCourse({ works: res });
    }
  };

  const position = (work: HomeworkViewModel) => {
    const res = selectedWorks.find(el => el.workId === work.id);
    if (res) {
      return selectedWorks.indexOf(res) + 1;
    }
    return 0;
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
          <TableCell role="checkbox" width="auto" align="center">
            <Checkbox
              size="small"
              checked={!!position(work)}
              onChange={() => addWork(work)}
              checkedIcon={
                <div style={{ fontWeight: '900', fontSize: '15px' }}>{position(work)}</div>
              }
            />
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
