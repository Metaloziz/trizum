import {
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupTypes } from 'app/enums/GroupTypes';
import { ShortStatusEnum, StatusEnum } from 'app/enums/StatusTypes';
import Button from 'components/button/Button';
import { TableWorks } from 'components/methodist-main/components/TableWorks';
import { isError } from 'components/methodist-main/utils/IsError';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { getOptionMui } from 'utils/getOption';
import homeworkStore from '../../app/stores/homeworkStore';
import methodistStore from '../../app/stores/methodistStore';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';

const groupTypesKeys = Object.keys(GroupTypes);
const statusTypesKeys = Object.keys(StatusEnum);
const levelKeys = Object.keys(GroupLevels);
const groupTypesOptions = Object.values(GroupTypes).map((el, index) =>
  getOptionMui(groupTypesKeys[index], el),
);

const levelOptions = Object.values(GroupLevels).map((el, index) =>
  getOptionMui(levelKeys[index], el),
);

export const AddOrEditDialog = observer(() => {
  const store = methodistStore;
  const { getHomeWorks } = homeworkStore;

  const statusTypesOptions = Object.values(
    store.currentCourse?.id ? StatusEnum : ShortStatusEnum,
  ).map((el, index) => getOptionMui(statusTypesKeys[index], el));

  useEffect(() => {
    if (store.currentCourse.type) {
      let type: string;
      switch (store.currentCourse.type) {
        case 'blocks':
          type = 'block';
          break;
        case 'class':
        case 'olympiad':
          type = 'hw';
          break;
        default:
          type = '';
      }
      getHomeWorks('active', 5, type);
    }
  }, [store.currentCourse.type]);

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={store.closeDialog}
      open={store.isDialogOpen}
    >
      <DialogTitle onClose={store.closeDialog}>
        {store.currentCourse?.id ? 'Редактирование курса' : 'Добавление нового курса'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={store.currentCourse.title}
                onChange={({ currentTarget: { value } }) => (store.currentCourse.title = value)}
                fullWidth
                variant="outlined"
                size="small"
                error={isError(store, 'title')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={store.currentCourse.level}
                  label="Уровень"
                  onChange={({ target: { value } }) => (store.currentCourse.level = value)}
                  error={isError(store, 'level')}
                >
                  {levelOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип</InputLabel>
                <Select
                  value={store.currentCourse.type}
                  label="Тип"
                  onChange={({ target: { value } }) => (store.currentCourse.type = value)}
                  error={isError(store, 'type')}
                >
                  {groupTypesOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={store.currentCourse.status}
                  label="Статус"
                  onChange={({ target: { value } }) => (store.currentCourse.status = value)}
                  error={isError(store, 'status')}
                >
                  {statusTypesOptions}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableWorks />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={store.addOrEdit}
          disabled={!store.validateSchema.isValidSync(store.currentCourse)}
        >
          {store.currentCourse?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
