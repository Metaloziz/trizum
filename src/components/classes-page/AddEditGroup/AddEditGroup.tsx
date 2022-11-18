import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GroupLevels } from 'app/enums/GroupLevels';
import { Roles } from 'app/enums/Roles';
import usersService from 'app/services/usersService';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Lessons from 'components/classes-page/AddEditGroup/Lessons';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { getOptionMui } from 'utils/getOption';
import { GroupStatus } from 'app/enums/GroupStatus';
import { GroupStatusTypes } from 'app/types/GroupStatusTypes';
import { getMUIOptionsFromEnum } from 'utils/getMUIOptionsFromEnum';
import { getNameFromEnum } from 'utils/getNameFromEnum';

const AddEditGroup: FC = observer(() => {
  const {
    modalFields,
    franchise,
    filteredCourses,
    selectedGroup,
    isModalOpen,
    loadInitialModal,
    addGroup,
    cleanModalValues,
    closeModal,
    editGroup,
  } = groupStore;

  const { role, user } = appStore;

  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);

  const getTeachers = async () => {
    const res = await usersService.getAllUsers({
      perPage: 10000,
      franchiseId: modalFields.franchiseId || undefined,
      role: Roles.Teacher,
    });
    groupStore.teachers = res.items;
    setTeacherOptions(
      res.items.map(el => getOptionMui(el.id, `${el.lastName} ${el.firstName} ${el.middleName}`)),
    );
  };

  useEffect(() => {
    loadInitialModal();
  }, []);

  useEffect(() => {
    if (appStore.role === Roles.Admin && !!franchise?.length) {
      setFranchiseOptions(franchise.map(t => getOptionMui(t.id || '', t.shortName)));
    }
  }, [groupStore.franchise]);

  useEffect(() => {
    if (appStore.user.role !== Roles.Admin && appStore.user?.franchise?.id) {
      modalFields.franchiseId = appStore.user.franchise.id;
      getTeachers();
    }
    if (appStore.user.role === Roles.Admin) {
      getTeachers();
    }
  }, []);

  useEffect(() => {
    const cOptions = filteredCourses.length
      ? filteredCourses.map(t =>
          getOptionMui(t.id || '', `${t.title} - ${getNameFromEnum(t.status)} - ${t.worksCount}`),
        )
      : [];
    setCourseOptions(cOptions);
  }, [modalFields.level, filteredCourses]);

  const onClose = () => {
    closeModal();
    cleanModalValues();
  };

  const isFranchiseRole = role === Roles.Franchisee || role === Roles.FranchiseeAdmin;

  const courseLabel = `Курс: ${GroupLevels[modalFields.level]}`;

  return (
    <BasicModal
      fullWidth
      title={selectedGroup.id ? 'Редактировать группу' : 'Добавить группу'}
      visibility={isModalOpen}
      changeVisibility={onClose}
    >
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: 2,
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="Название"
            value={modalFields.name}
            fullWidth
            disabled={!!selectedGroup.id && modalFields.status !== 'active'}
            onChange={({ currentTarget: { value } }) => (modalFields.name = value)}
            // error={!validateSchema.fields.name.isValidSync(modalFields.name)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="teacher">Учитель</InputLabel>
            <Select
              labelId="teacher"
              label="Учитель"
              fullWidth
              onChange={event => (modalFields.teacherId = event.target.value)}
              value={modalFields.teacherId}
            >
              {teacherOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="level">Уровень</InputLabel>
            <Select
              labelId="level"
              label="Уровень"
              placeholder="Уровень"
              fullWidth
              // @ts-ignore
              onChange={event => (modalFields.level = event.target.value)}
              value={modalFields.level}
            >
              {getMUIOptionsFromEnum(GroupLevels)}
            </Select>
          </FormControl>
        </Grid>

        {!isFranchiseRole && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="franchise">Франшиза</InputLabel>
              <Select
                labelId="franchise"
                label="Франшиза"
                fullWidth
                onChange={event => (modalFields.franchiseId = event.target.value)}
                value={modalFields.franchiseId}
              >
                {franchiseOptions}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="course">{courseLabel}</InputLabel>
            <Select
              labelId="course"
              label={courseLabel}
              disabled={!modalFields.level || !!selectedGroup.id}
              fullWidth
              onChange={({ target: { value } }) => {
                const course = groupStore.courses.find(el => el.id === value);
                course &&
                  (groupStore.schedule = groupStore.setEmptyScheduleItems(course.worksCount + 1));
                modalFields.courseId = value;
              }}
              value={modalFields.courseId}
            >
              {courseOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status">Статус</InputLabel>
            <Select
              labelId="status"
              label="Статус"
              fullWidth
              onChange={event => (modalFields.status = event.target.value as GroupStatusTypes)}
              value={modalFields.status}
            >
              {getMUIOptionsFromEnum(GroupStatus)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            onChange={e => e && (modalFields.dateSince = new Date(e))}
            value={modalFields.dateSince}
            renderInput={e => <TextField {...e} sx={{ width: '48%' }} />}
            label="Период работы группы с"
          />
          <DatePicker
            onChange={e => e && (modalFields.dateUntil = new Date(e))}
            value={modalFields.dateUntil}
            renderInput={e => <TextField {...e} sx={{ width: '48%' }} />}
            label="по"
          />
        </Grid>

        {/* lessons */}
        <Lessons />

        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Button
            onClick={() =>
              selectedGroup.id
                ? editGroup()
                : isFranchiseRole
                ? addGroup(user.franchise.id)
                : addGroup()
            }
          >
            {selectedGroup.id ? 'Изменить' : 'Добавить'}
          </Button>
        </Grid>
      </Grid>
    </BasicModal>
  );
});

export default AddEditGroup;
