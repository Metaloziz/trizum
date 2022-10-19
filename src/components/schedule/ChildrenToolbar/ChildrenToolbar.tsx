import { Grid, FormControl, InputLabel, Select } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '../../../app/stores/appStore';
import teacherMainStore from '../../../app/stores/scheduleStore';
import { checkRoleForClasses } from '../../../utils/checkRoleForClasses';
import { getOptionMui } from '../../../utils/getOption';

export const ChildrenToolbar: FC = observer(() => {
  const { role } = appStore;
  const { groups, setFilters, filters, teachers, franchisees } = teacherMainStore;

  const selectGroupOption = groups.length
    ? [{ groupId: '*', groupName: 'Все' }, ...groups].map(el =>
        getOptionMui(el.groupId, el.groupName),
      )
    : [];

  const teacherOptions = teachers.length
    ? [{ teacherId: '*', teacherName: 'Все' }, ...teachers].map(el =>
        getOptionMui(el.teacherId, el.teacherName),
      )
    : [];

  const franchiseOption = franchisees.length
    ? [{ franchise: '*', franchiseName: 'Все' }, ...franchisees].map(el =>
        getOptionMui(el.franchise, el.franchiseName),
      )
    : [];

  return (
    <Grid container>
      {checkRoleForClasses(role) ? (
        <Grid
          container
          columnSpacing={{ xs: 10, sm: 4, md: 1, lg: 1 }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel id="teacher">ФИО Учителя</InputLabel>
              <Select
                labelId="teacher"
                label="ФИО Учителя"
                value={filters.teacherId || '*'}
                fullWidth
                onChange={({ target: { value } }) => setFilters('teacherId', value)}
              >
                {teacherOptions}
              </Select>
            </FormControl>
          </Grid>

          {role === Roles.Admin && (
            <Grid item xs={12} sm={6} md>
              <FormControl fullWidth>
                <InputLabel id="franchise">Франшиза</InputLabel>
                <Select
                  labelId="franchise"
                  label="Франшиза"
                  value={filters.franchise || '*'}
                  fullWidth
                  onChange={({ target: { value } }) => setFilters('franchise', value)}
                >
                  {franchiseOption}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel id="select">Группа</InputLabel>
              <Select
                labelId="select"
                label="Группа"
                value={filters.groupId || '*'}
                fullWidth
                onChange={({ target: { value } }) => setFilters('groupId', value)}
              >
                {selectGroupOption}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select">Группа</InputLabel>
              <Select
                labelId="select"
                label="Группа"
                value={filters.groupId || '*'}
                fullWidth
                onChange={({ target: { value } }) => setFilters('groupId', value)}
              >
                {selectGroupOption}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
});
