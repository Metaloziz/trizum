import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import { FC } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import { NewWorkType } from '../../../app/types/NewWorkType';
import { HomeworkViewModel } from '../../../app/viewModels/HomeworkViewModel';
import { getEnumNameStatus } from '../../../utils/getEnumNameStatus';

type Props = {
  worksArray: typeof homeworkStore.worksArray;
  setCurrentCourse: typeof coursesStore.setCurrentCourse;
  selectedWorks: NewWorkType[];
};

export const TableWorksRows: FC<Props> = ({ worksArray, setCurrentCourse, selectedWorks }) => {
  const switchWorkInclude = (work: HomeworkViewModel) => {
    const currentWork = selectedWorks.find(el => el.workId === work.id);

    if (currentWork) {
      setCurrentCourse({ works: selectedWorks.filter(el => el.workId !== currentWork.workId) });
    } else {
      setCurrentCourse({
        works: [...selectedWorks, { index: selectedWorks.length, workId: work.id }],
      });
    }
  };

  const position = (work: HomeworkViewModel) => {
    const currentWork = selectedWorks.find(el => el.workId === work.id);
    if (currentWork) {
      return selectedWorks.indexOf(currentWork) + 1;
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
              onChange={() => switchWorkInclude(work)}
              checkedIcon={
                <div style={{ fontWeight: '900', fontSize: '15px' }}>{position(work)}</div>
              }
            />
          </TableCell>
          <TableCell>{work.title}</TableCell>
          <TableCell width="auto">{work.text}</TableCell>
          <TableCell>{work.gamePresetsCount}</TableCell>
          <TableCell width="auto">{getEnumNameStatus(work.status)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
