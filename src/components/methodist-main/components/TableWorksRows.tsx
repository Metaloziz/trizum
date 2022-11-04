import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import { FC } from 'react';
import coursesStore from '../../../app/stores/coursesStore';
import { NewWorkType } from 'app/types/NewWorkType';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';
import { getNameFromEnum } from 'utils/getNameFromEnum';

type Props = {
  worksArray: typeof homeworkStore.worksArray;
  setCurrentCourse: typeof coursesStore.setCurrentCourse;
  selectedWorks: NewWorkType[];
};

export const TableWorksRows: FC<Props> = ({ worksArray, setCurrentCourse, selectedWorks }) => {
  const switchWorkInclude = (work: HomeworkViewModel) => {
    const currentWork = selectedWorks.find(el => el.id === work.id);

    if (currentWork) {
      setCurrentCourse({ works: selectedWorks.filter(el => el.id !== currentWork.id) });
    } else {
      setCurrentCourse({
        // todo возможно здесь будет ошибка с ID
        works: [...selectedWorks, { index: selectedWorks.length, id: work.id, work }],
      });
    }
  };

  const position = (work: HomeworkViewModel) => {
    const currentWork = selectedWorks.find(el => el.id === work.id);
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
          <TableCell width="auto">{getNameFromEnum(work.status)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
