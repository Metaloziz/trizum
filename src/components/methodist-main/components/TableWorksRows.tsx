import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import homeworkStore from 'app/stores/homeworkStore';
import methodistStore from 'app/stores/methodistStore';

export const TableWorksRows: FC = observer(() => {
  const { editingEntity } = methodistStore;
  const { entities } = homeworkStore;

  return (
    <>
      {entities.map(work => (
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
              checked={(editingEntity.works || []).some(w => w.id === work.id)}
              size="small"
              onChange={(__, checked) => {
                editingEntity.works = checked
                  ? [...(editingEntity.works || []), work]
                  : editingEntity.works?.filter(w => w.id !== work.id);
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
