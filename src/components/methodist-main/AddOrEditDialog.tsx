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
import { StatusEnum, StatusTypes, EditStatusEnum, AddStatusEnum } from 'app/enums/StatusTypes';
import Button from 'components/button/Button';
import { TableWorks } from 'components/methodist-main/components/TableWorks';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { getOptionMui } from 'utils/getOption';
import { WorkTypes } from '../../app/enums/WorkTypes';
import coursesStore from '../../app/stores/coursesStore';
import homeworkStore from '../../app/stores/homeworkStore';

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
  const { getHomeWorks, setSearchParams, pagination, worksArray } = homeworkStore;

  const {
    currentCourse,
    isDialogOpen,
    setIsDialogOpen,
    setCurrentCourse,
    editCourse,
    createCourse,
  } = coursesStore;

  const statusTypesOptions = Object.values(currentCourse?.id ? EditStatusEnum : AddStatusEnum).map(
    (el, index) => getOptionMui(statusTypesKeys[index], el),
  );

  useEffect(() => {
    if (currentCourse?.type) {
      let type: string;
      switch (currentCourse?.type) {
        case 'blocks':
          type = WorkTypes.BLOCK;
          break;
        case 'class':
        case 'olympiad':
          type = WorkTypes.HW;
          break;
        default:
          type = '';
      }
      setSearchParams({ status: 'active', type, page: 0, per_page: 5 });
      getHomeWorks();
    }
  }, [currentCourse?.type]);

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={() => setIsDialogOpen(false)}
      open={isDialogOpen}
    >
      <DialogTitle onClose={() => setIsDialogOpen(false)}>
        {currentCourse?.id ? 'Редактирование курса' : 'Добавление нового курса'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={currentCourse?.title}
                onChange={event =>
                  setCurrentCourse({
                    title: event.currentTarget.value,
                  })
                }
                fullWidth
                variant="outlined"
                size="small"
                // error={isError('title')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={currentCourse?.level}
                  label="Уровень"
                  onChange={event =>
                    setCurrentCourse({
                      level: event.target.value,
                    })
                  }
                  // error={isError('level')}
                >
                  {levelOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип</InputLabel>
                <Select
                  value={currentCourse?.type}
                  label="Тип"
                  onChange={event =>
                    setCurrentCourse({
                      type: event.target.value,
                    })
                  }
                  // error={isError('type')}
                >
                  {groupTypesOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={currentCourse?.status}
                  label="Статус"
                  onChange={event =>
                    setCurrentCourse({
                      status: event.target.value as StatusTypes,
                    })
                  }
                  // error={isError('status')}
                >
                  {statusTypesOptions}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableWorks
            worksArray={worksArray}
            setCurrentCourse={setCurrentCourse}
            setSearchParams={setSearchParams}
            getHomeWorks={getHomeWorks}
            pagination={pagination}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={currentCourse?.id ? editCourse : createCourse}
          // disabled={!validateSchema.isValidSync(currentCourse)}
        >
          {currentCourse?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
