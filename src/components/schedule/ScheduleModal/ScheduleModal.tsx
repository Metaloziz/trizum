import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormControl, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { EditLessonPayload } from '../../../app/types/EditLessonPayload';
import { MAX_NAMES_LENGTH } from '../../../constants/constants';
import { ScheduleEvent } from '../types/ScheduleEvent';

import styles from './ScheduleModal.module.scss';

type Lesson = {
  date: Date;

  from: Date;

  name: string;

  to: Date;
};

type ScheduleModalProps = {
  event: ScheduleEvent;
  onApply: (event: EditLessonPayload) => void;
};

export const ScheduleModal: FC<ScheduleModalProps> = props => {
  const { event, onApply } = props;

  const defaultValues: Lesson = {
    name: event.lesson,
    date: event.start,
    from: event.start,
    to: event.end,
  };

  const validation = yup.string().required('обязательное поле');

  const schema = yup.object().shape({
    date: validation,
    from: validation,
    name: validation.max(MAX_NAMES_LENGTH, `максимальная длинна: ${MAX_NAMES_LENGTH} символов`),
    to: validation,
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Lesson>({ resolver: yupResolver(schema), defaultValues });

  const handle = handleSubmit((data: Lesson) => {
    const draft: Pick<EditLessonPayload, 'schedule'> = {
      schedule: {
        name: data.name,
        date: new Date(data.date).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' }),
        from: new Date(data.from)
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          .split(' ')[0],
        to: new Date(data.to)
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          .split(' ')[0],
      },
    };

    onApply({ schedule: draft.schedule, groupId: event?.groupId || '', lessonIndex: event.id });
  });

  return (
    <div className={styles.wrapperModal}>
      <h4>Редактирование урока</h4>
      <form>
        <div className={styles.lesson}>
          <div className={styles.dateLesson}>
            <TextField
              {...register('name')}
              helperText={errors.name?.message}
              error={!!errors?.name}
              label="Заголовок"
              fullWidth
            />
          </div>
          <div className={styles.choiceTime}>
            <Controller
              name="date"
              render={({ field }) => (
                <FormControl fullWidth>
                  <DatePicker
                    onChange={(date: Date | null) => {
                      field.onChange(date);
                    }}
                    value={field.value}
                    renderInput={e => (
                      <TextField
                        {...e}
                        sx={{ width: '100%' }}
                        label="Дата урока"
                        error={!!errors.date?.message}
                        helperText={errors.date?.message}
                      />
                    )}
                  />
                </FormControl>
              )}
              control={control}
            />

            <Controller
              name="from"
              render={({ field }) => (
                <FormControl fullWidth>
                  <TimePicker
                    onChange={(date: Date | null) => {
                      field.onChange(date);
                    }}
                    value={field.value}
                    renderInput={e => (
                      <TextField
                        {...e}
                        sx={{ width: '100%' }}
                        label="Время начала"
                        error={!!errors.from?.message}
                        helperText={errors.from?.message}
                      />
                    )}
                  />
                </FormControl>
              )}
              control={control}
            />

            <Controller
              name="to"
              render={({ field }) => (
                <FormControl fullWidth>
                  <TimePicker
                    onChange={(date: Date | null) => {
                      field.onChange(date);
                    }}
                    value={field.value}
                    renderInput={e => (
                      <TextField
                        {...e}
                        sx={{ width: '100%' }}
                        label="Время окончания"
                        error={!!errors.to?.message}
                        helperText={errors.to?.message}
                      />
                    )}
                  />
                </FormControl>
              )}
              control={control}
            />
          </div>
        </div>
        <div className={styles.save}>
          <Button onClick={handle} variant="contained">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
