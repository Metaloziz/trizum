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
import { StatusTypes, EditStatusEnum, AddStatusEnum } from 'app/enums/StatusTypes';
import Button from 'components/button/Button';
import { TableWorks } from 'components/methodist-main/components/TableWorks';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { getOptionMui } from 'utils/getOption';
import { WorkTypes } from '../../app/enums/WorkTypes';
import coursesStore from '../../app/stores/coursesStore';
import homeworkStore from '../../app/stores/homeworkStore';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';
import { LoadingIndicator } from '../franchising-page/ui/LoadingIndicator';
import { defaultSearchHomeWorksParams } from './utils/const';
import { levelOptions, groupTypesOptions, statusTypesKeys } from './utils/utils';

export const AddOrEditDialog = observer(() => {
  const { getHomeWorks, setSearchParams, pagination, worksArray } = homeworkStore;

  const {
    currentCourse,
    isDialogOpen,
    setIsDialogOpen,
    setCurrentCourse,
    editCourse,
    createCourse,
    isLoading,
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
      setSearchParams({ ...defaultSearchHomeWorksParams, type });
      getHomeWorks();
    }
  }, [currentCourse?.type]);

  const setDialogClose = () => {
    setIsDialogOpen(false);
    setSearchParams(defaultSearchHomeWorksParams);
  };

  const editCourseCallBack = () => {
    editCourse();
    setDialogClose();
  };

  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />;
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={setDialogClose}
      open={isDialogOpen}
    >
      <DialogTitle onClose={setDialogClose}>
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
          {currentCourse.type && (
            <TableWorks
              worksArray={worksArray}
              setCurrentCourse={setCurrentCourse}
              setSearchParams={setSearchParams}
              getHomeWorks={getHomeWorks}
              pagination={pagination}
              selectedWorks={currentCourse.works}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={currentCourse?.id ? editCourseCallBack : createCourse}
          disabled={!currentCourse?.title?.length}
        >
          {currentCourse?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
