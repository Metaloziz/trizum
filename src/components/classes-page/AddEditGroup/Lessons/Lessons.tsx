import { Grid, Typography, TextField, Button } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import groupStore from 'app/stores/groupStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import style from './Lessons.module.scss';

const Lessons: FC = observer(() => {
  const { schedule, changeLesson } = groupStore;

  console.log('schedule', toJS(schedule));

  const addLesson = () => {
    groupStore.schedule.push({
      id: Math.random().toString(),
      from: new Date(),
      to: new Date(),
      name: '',
      date: new Date(),
    });
  };

  return (
    <>
      {!!schedule.length && (
        <div className={style.container}>
          <span>Расписание уроков</span>
          {schedule.map((el, index) => (
            <Grid key={el.id} sx={{ alignItems: 'center', width: '100%' }} container>
              <Typography
                sx={{
                  paddingLeft: 2,
                  paddingTop: 2,
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                Урок №{index + 1}
              </Typography>
              <Grid item xs={12} sx={{ margin: '2' }}>
                <TextField
                  fullWidth
                  label="Название урока"
                  value={el.name}
                  onChange={({ currentTarget: { value } }) => changeLesson(el.id, 'name', value)}
                />
              </Grid>
              <Grid
                sx={{
                  justifyContent: 'space-between',
                  paddingTop: 2,
                  // paddingLeft: 2,
                  gap: 4,
                }}
                container
              >
                <DatePicker
                  value={el.date}
                  onChange={e => e && changeLesson(el.id, 'date', new Date(e))}
                  label="Дата урока"
                  defaultCalendarMonth="1"
                  renderInput={e => <TextField {...e} />}
                />
                <TimePicker
                  label="Начало урока"
                  value={el.from}
                  onChange={e => e && changeLesson(el.id, 'from', new Date(e))}
                  renderInput={e => <TextField {...e} />}
                />
                <TimePicker
                  label="Конец урока"
                  value={schedule[index].to}
                  onChange={e => e && changeLesson(el.id, 'to', new Date(e))}
                  renderInput={e => <TextField {...e} />}
                />
              </Grid>
            </Grid>
          ))}
          <Button onClick={addLesson} variant="outlined">
            Добавить урок
          </Button>
        </div>
      )}
    </>
  );
});
export default Lessons;
