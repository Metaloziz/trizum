import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GroupLevels } from 'app/enums/GroupLevels';
import { Roles } from 'app/enums/Roles';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import usersService from 'app/services/usersService';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Button from 'components/button/Button';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOptionMui } from 'utils/getOption';
import { statusTypeOptions } from '../../statusTypeOptions';

const SearchBar = observer(() => {
  const { queryFields, getGroups, clearQueryFields } = groupStore;

  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [courseOptions, setCourseOptions] = useState<JSX.Element[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<JSX.Element[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    clearQueryFields();
  }, [pathname]);

  const levelOptionsNames = Object.values(GroupLevels);
  const levelOptions = Object.keys(GroupLevels).map((el, idx) =>
    getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
  );

  const getFranchises = async () => {
    const res = await franchiseService.getAll();
    const res1 = await coursesService.getAllCourses({ per_page: 10000 });
    const options = res.map(el => (el.id ? getOptionMui(el.id, el.shortName) : <></>));
    setFranchiseOptions(options);
    setCourseOptions(res1.items.map(el => (el.id ? getOptionMui(el.id, el.title) : <></>)));
  };

  useEffect(() => {
    if (appStore.role === Roles.Admin) {
      getFranchises();
    }
  }, []);

  const getTeachers = async () => {
    if (queryFields.franchiseId) {
      const res = await usersService.getAllUsers({
        perPage: 10000,
        franchiseId: queryFields.franchiseId,
        role: Roles.Teacher,
      });
      groupStore.teachers = res.items;
      setTeacherOptions(res.items.map(el => getOptionMui(el.id, el.firstName)));
    }
  };

  useEffect(() => {
    getTeachers();
  }, [queryFields.franchiseId]);

  /* temp */
  const [open, setOpen] = useState(false);
  /* temp */

  return (
    <Box sx={{ marginTop: 2 }}>
      <Accordion
        expanded={open}
        onChange={(_, expanded) => setOpen(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                value={queryFields.name}
                label="Название"
                onChange={({ currentTarget: { value } }) => (queryFields.name = value)}
              />
            </Grid>
            {appStore.role === Roles.Admin && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="franchise-search">Франчайзинг</InputLabel>
                  <Select
                    labelId="franchise-search"
                    label="Франчайзинг"
                    value={queryFields.franchiseId}
                    onChange={({ target: { value } }) => {
                      queryFields.franchiseId = value;
                      queryFields.teacherId = '';
                    }}
                  >
                    {franchiseOptions}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="level-search">Уровень</InputLabel>
                <Select
                  labelId="level-search"
                  label="Уровень"
                  value={queryFields.level}
                  onChange={({ target: { value } }) => (queryFields.level = value)}
                >
                  {levelOptions}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="course-search">Статус</InputLabel>
                <Select
                  label="Статус"
                  labelId="course-search"
                  value={queryFields.status}
                  onChange={({ target: { value } }) => (queryFields.status = value)}
                >
                  {statusTypeOptions}
                </Select>
              </FormControl>
            </Grid>
            {appStore.role === Roles.Admin && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="teacher-search">Учитель</InputLabel>
                  <Select
                    labelId="teacher-search"
                    label="Учитель"
                    value={queryFields.teacherId}
                    disabled={!queryFields.franchiseId}
                    onChange={({ target: { value } }) => (queryFields.teacherId = value)}
                  >
                    {teacherOptions}
                  </Select>
                  {!queryFields.franchiseId && (
                    <FormHelperText
                      sx={{ position: 'absolute', bottom: -24, left: 0, color: 'red' }}
                    >
                      Сначала выберите франчайзинг
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                onChange={value => value && (queryFields.dateSince = new Date(value))}
                value={queryFields.dateSince ? queryFields.dateSince : null}
                label="Дата действия с"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                onChange={value => {
                  value && (queryFields.dateUntil = new Date(value));
                }}
                value={queryFields.dateUntil ? queryFields.dateUntil : null}
                label="по"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            sx={{
              width: '100%',
              px: 1,
            }}
          >
            <Button onClick={clearQueryFields}>Сбросить</Button>
            <Button onClick={() => getGroups()}>Применить</Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});

export default SearchBar;
