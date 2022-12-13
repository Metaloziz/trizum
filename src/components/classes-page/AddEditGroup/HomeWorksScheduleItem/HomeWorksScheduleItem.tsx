import { TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import groupStore from 'app/stores/groupStore';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import style from './HomeWorksScheduleItem.module.scss';

export const HomeWorksScheduleItem: FC = observer(() => {
  const { scheduleHomeWorks, changeScheduleHomeWork, isDisableEditForm } = groupStore;

  return (
    <div className={style.container}>
      {!!scheduleHomeWorks.length && (
        <>
          <span>Расписание домашних работ</span>
          {scheduleHomeWorks.map((work, index) => (
            <div className={style.body} key={work.index}>
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
                Домашняя работа №{index + 1}
              </Typography>
              <div className={style.date}>
                <DatePicker
                  label="Время начала домашней работы"
                  value={scheduleHomeWorks[index]?.start}
                  onChange={e =>
                    e &&
                    changeScheduleHomeWork({
                      index,
                      start: new Date(e),
                    })
                  }
                  disabled={isDisableEditForm}
                  renderInput={e => (
                    <TextField {...e} onKeyDown={event => event.preventDefault()} />
                  )}
                />
                <DatePicker
                  label="Время окончания домашней работы"
                  value={scheduleHomeWorks[index]?.end}
                  onChange={e =>
                    e &&
                    changeScheduleHomeWork({
                      index,
                      end: new Date(e),
                    })
                  }
                  disabled={isDisableEditForm}
                  renderInput={e => (
                    <TextField {...e} onKeyDown={event => event.preventDefault()} />
                  )}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
});
