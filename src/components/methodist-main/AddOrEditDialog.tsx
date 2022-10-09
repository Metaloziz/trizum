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
  const { pull } = homeworkStore;

  const statusTypesOptions = Object.values(
    store.editingEntity?.id ? StatusEnum : ShortStatusEnum,
  ).map((el, index) => getOptionMui(statusTypesKeys[index], el));

  useEffect(() => {
    if (store.editingEntity.type) {
      let type: string;
      switch (store.editingEntity.type) {
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
      pull('active', 5, type);
    }
  }, [store.editingEntity.type]);

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
        {store.editingEntity?.id ? 'Редактирование курса' : 'Добавление нового курса'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={store.editingEntity.title}
                onChange={({ currentTarget: { value } }) => (store.editingEntity.title = value)}
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
                  value={store.editingEntity.level}
                  label="Уровень"
                  onChange={({ target: { value } }) => (store.editingEntity.level = value)}
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
                  value={store.editingEntity.type}
                  label="Тип"
                  onChange={({ target: { value } }) => (store.editingEntity.type = value)}
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
                  value={store.editingEntity.status}
                  label="Статус"
                  onChange={({ target: { value } }) => (store.editingEntity.status = value)}
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
          disabled={!store.validateSchema.isValidSync(store.editingEntity)}
        >
          {store.editingEntity?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
