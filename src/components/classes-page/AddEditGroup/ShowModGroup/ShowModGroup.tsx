import { Grid, TextField, FormControl, InputLabel, Select, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupStatus } from 'app/enums/GroupStatus';
import groupStore from 'app/stores/groupStore';
import { GroupStatusTypes } from 'app/types/GroupStatusTypes';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import { HomeWorksScheduleItem } from 'components/classes-page/AddEditGroup/HomeWorksScheduleItem/HomeWorksScheduleItem';
import Lessons from 'components/classes-page/AddEditGroup/Lessons/Lessons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { getMUIOptionsFromEnum } from 'utils/getMUIOptionsFromEnum';

export const ShowModGroup = observer(() => {
  const { selectedGroup, isShowModeForm, setIsShowMode } = groupStore;
  console.log();

  const onClose = () => {
    setIsShowMode(false);
  };
  return (
    <BasicModal fullWidth title="Просмотр" visibility={isShowModeForm} changeVisibility={onClose}>
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              p: 1,
              width: '100%',
              // height: 128,
            },
          }}
        >
          <Paper elevation={3}>
            <h4>Название</h4>
            <p>{selectedGroup?.name}</p>
          </Paper>
          <Paper elevation={3}>{selectedGroup?.name}</Paper>
          <Paper elevation={3}>{selectedGroup?.name}</Paper>
          <Paper elevation={3}>{selectedGroup?.name}</Paper>
          <Paper elevation={3}>{selectedGroup?.name}</Paper>
        </Box>

        {/* <Grid item xs={12} sm={6}> */}
        {/*  <h4>Франшиза</h4> */}
        {/*  <Paper variant="outlined">{selectedGroup?.franchise?.shortName}</Paper> */}
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6}> */}
        {/*  <FormControl fullWidth> */}
        {/*    <InputLabel id="level">Уровень</InputLabel> */}
        {/*    <Select */}
        {/*      labelId="level" */}
        {/*      label="Уровень" */}
        {/*      placeholder="Уровень" */}
        {/*      fullWidth */}
        {/*      disabled={isDisableEditForm} */}
        {/*      // @ts-ignore */}
        {/*      onChange={event => (modalFields.level = event.target.value)} */}
        {/*      value={modalFields.level} */}
        {/*    > */}
        {/*      {getMUIOptionsFromEnum(GroupLevels)} */}
        {/*    </Select> */}
        {/*  </FormControl> */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6}> */}
        {/*  <FormControl fullWidth> */}
        {/*    <InputLabel id="teacher">Учитель</InputLabel> */}
        {/*    <Select */}
        {/*      labelId="teacher" */}
        {/*      label="Учитель" */}
        {/*      fullWidth */}
        {/*      onChange={event => (modalFields.teacherId = event.target.value)} */}
        {/*      value={modalFields.teacherId} */}
        {/*      disabled={isDisableEditForm || isDisableTeacherSelector} */}
        {/*    > */}
        {/*      {teacherOptions} */}
        {/*    </Select> */}
        {/*  </FormControl> */}
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6}> */}
        {/*  <FormControl fullWidth> */}
        {/*    <InputLabel id="course">{courseLabel}</InputLabel> */}
        {/*    <Select */}
        {/*      labelId="course" */}
        {/*      label={courseLabel} */}
        {/*      disabled={!modalFields.level || isDisableEditForm} */}
        {/*      fullWidth */}
        {/*      onChange={({ target: { value } }) => { */}
        {/*        const course = groupStore.courses.find(el => el.id === value); */}
        {/*        course && setSchedule(course.worksCount); */}
        {/*        modalFields.courseId = value; */}
        {/*      }} */}
        {/*      value={modalFields.courseId} */}
        {/*    > */}
        {/*      {courseOptions} */}
        {/*    </Select> */}
        {/*  </FormControl> */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6}> */}
        {/*  <FormControl fullWidth> */}
        {/*    <InputLabel id="status">Статус</InputLabel> */}
        {/*    <Select */}
        {/*      labelId="status" */}
        {/*      label="Статус" */}
        {/*      fullWidth */}
        {/*      onChange={event => (modalFields.status = event.target.value as GroupStatusTypes)} */}
        {/*      value={modalFields.status} */}
        {/*    > */}
        {/*      {getMUIOptionsFromEnum(GroupStatus)} */}
        {/*    </Select> */}
        {/*  </FormControl> */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
        {/*  <DatePicker */}
        {/*    disabled={isDisableEditForm} */}
        {/*    onChange={e => e && (modalFields.dateSince = new Date(e))} */}
        {/*    value={modalFields.dateSince} */}
        {/*    renderInput={e => <TextField {...e} sx={{ width: '48%' }} />} */}
        {/*    label="Период работы группы с" */}
        {/*  /> */}
        {/*  <DatePicker */}
        {/*    disabled={isDisableEditForm} */}
        {/*    onChange={e => e && (modalFields.dateUntil = new Date(e))} */}
        {/*    value={modalFields.dateUntil} */}
        {/*    renderInput={e => <TextField {...e} sx={{ width: '48%' }} />} */}
        {/*    label="по" */}
        {/*  /> */}
        {/* </Grid> */}

        {/* <Grid item> */}
        {/*  <Lessons /> */}
        {/* </Grid> */}

        {/* <Grid item sx={{ width: '100%' }}> */}
        {/*  <HomeWorksScheduleItem /> */}
        {/* </Grid> */}
      </Grid>
    </BasicModal>
  );
});
