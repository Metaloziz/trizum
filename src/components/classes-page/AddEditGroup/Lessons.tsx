import { Grid, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import groupStore from 'app/stores/groupStore';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

const Lessons: FC = observer(() => {
  const { schedule, changeLesson } = groupStore;

  return (
    <>
      {!!schedule.length &&
        schedule.map((el, index) => (
          <>
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
            <Grid sx={{ justifyContent: 'space-between', paddingTop: 2, paddingLeft: 2 }} container>
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
            </Grid>
          </>
        ))}
    </>
  );
});

export default Lessons;
