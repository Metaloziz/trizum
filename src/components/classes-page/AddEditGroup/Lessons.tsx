import { Grid, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import groupStore from 'app/stores/groupStore';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

const Lessons: FC = observer(() => {
  const { schedule, changeLesson, scheduleHomeWorks, changeScheduleHomeWork } = groupStore;

  return (
    <>
      {!!schedule.length &&
        schedule.map((el, index) => (
          <div key={Math.random()}>
            <Typography
              sx={{
                paddingLeft: 2,
                paddingTop: 2,
                fontSize: '1.2rem',
                textAlign: 'center',
                width: '100%',
              }}
            >
              Урок №{index + 1}
            </Typography>
            <Grid item xs={12} key={el.id}>
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
                paddingLeft: 2,
                gap: 4,
              }}
              container
            >
              <DatePicker
                value={el.date}
                onChange={e => e && changeLesson(el.id, 'date', new Date(e))}
                label="Дата урока"
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

              <Grid
                sx={{
                  paddingTop: 2,
                  gap: 4,
                }}
                container
              >
                <DatePicker
                  label="Время начала домашней работы"
                  value={scheduleHomeWorks[index]?.start}
                  onChange={e => e && changeScheduleHomeWork({ index, start: new Date(e) })}
                  renderInput={e => (
                    <TextField {...e} onKeyDown={event => event.preventDefault()} />
                  )}
                />
                <DatePicker
                  label="Время окончания домашней работы"
                  value={scheduleHomeWorks[index]?.end}
                  onChange={e => e && changeScheduleHomeWork({ index, end: new Date(e) })}
                  renderInput={e => (
                    <TextField {...e} onKeyDown={event => event.preventDefault()} />
                  )}
                />
              </Grid>
            </Grid>
          </div>
        ))}
    </>
  );
});

export default Lessons;
