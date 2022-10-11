import Button from 'components/button/Button';
import React, { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import style from './OlympiadForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REG_NAME } from 'constants/regExp';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import franchiseeStore from 'app/stores/franchiseeStore';
import { convertFranchiseeOptions } from 'utils/convertFranchiseeOptions';
import { observer } from 'mobx-react-lite';
import coursesStore from 'app/stores/coursesStore';
import { convertCourseOptions } from 'utils/convertCourseOptions';
import { convertEnumOptions } from 'utils/convertEnumOptions';
import groupsService from 'app/services/groupsService';
import { OlympiadPayloadType } from 'app/types/OlympiadPayloadType';
import groupStore from 'app/stores/groupStore';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { getAllOptionsMUI } from 'utils/getOption';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GroupStatusTypes } from 'app/types/GroupStatusTypes';
import { ResponseGroups } from 'app/types/GroupTypes';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupStatus } from 'app/enums/GroupStatus';
import { convertServerDateToUTCString } from 'utils/convertServerDateToUTCString';

type UseFormAddType = Omit<OlympiadPayloadType, 'type'> & { status?: GroupStatusTypes };

type Props = {
  setShowModal: (value: boolean) => void;
  group?: ResponseGroups;
  mode?: 'edite' | 'add';
};

export const OlympiadForm: FC<Props> = observer(({ setShowModal, mode = 'add', group }) => {
  const IS_ADD_MODE = mode === 'add';

  const title = <h2>{IS_ADD_MODE ? 'Добавление' : 'Редактирование'} олимпиады</h2>;

  const { franchise } = franchiseeStore;
  const { courses } = coursesStore;
  const { groups, getGroups } = groupStore;

  const franchiseOptions = convertFranchiseeOptions(franchise);
  const courseOptions = convertCourseOptions(courses);
  const levelOptions = convertEnumOptions(GroupLevels);
  const groupsOptions = convertGroupOptions(groups);
  const statusOptions = convertEnumOptions(GroupStatus);

  const [errorMessage, setErrorMessage] = useState('');
  const [dateSince, setDateSince] = useState<string | null>(null);
  const [dateUntil, setDateUntil] = useState<string | null>(null);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    dateSince: yup.string().required('Обязательное поле'),
    dateUntil: yup.string().required('Обязательное поле'),
    franchiseId: IS_ADD_MODE
      ? yup.string().required('Обязательное поле')
      : yup.string().notRequired(),
    courseId: IS_ADD_MODE ? yup.string().required('Обязательное поле') : yup.string().notRequired(),
    forGroupId: IS_ADD_MODE
      ? yup.string().required('Обязательное поле')
      : yup.string().notRequired(),
    level: yup.string().required('Обязательное поле'),
    status: IS_ADD_MODE ? yup.string().notRequired() : yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    clearErrors,
    setValue,
    watch,
    resetField,
    register,
    formState: { errors },
  } = useForm<UseFormAddType>({ resolver: yupResolver(schema) });

  const FRANCHISE_ID = watch('franchiseId');

  const onSubmit = handleSubmit(async values => {
    if (IS_ADD_MODE) {
      const response = await groupsService.addOlympiadGroup({ ...values, type: 'olympiad' });

      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setShowModal(false);
      }
      return;
    }

    if (group) {
      const response = await groupsService.editGroup(values, group.id);

      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setShowModal(false);
      }
    }
  });

  useEffect(() => {
    if (group) {
      const startDate = convertServerDateToUTCString(group.startedAt.date);

      setDateSince(startDate);
      setValue('dateSince', startDate, {
        shouldValidate: true,
        shouldDirty: true,
      });

      const endDate = convertServerDateToUTCString(group.endedAt.date);

      setDateUntil(endDate);
      setValue('dateUntil', endDate, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [group]);

  useEffect(() => {
    if (FRANCHISE_ID) {
      const result = getGroups({ franchiseId: FRANCHISE_ID, type: 'class' });
      resetField('forGroupId');
    }
  }, [FRANCHISE_ID]);

  return (
    <form>
      <div className={style.modalOlympiad}>
        {title}
        <div className={style.modalName}>
          <TextField
            {...register('name')}
            helperText={errors.name?.message}
            defaultValue={group?.name || ''}
            error={!!errors?.name}
            label="Название олимпиады"
            style={{ width: '400px' }}
          />
        </div>

        <div className={style.modalSelect}>
          <div>
            <div className={style.selectBlock}>
              <DateTimePicker
                value={dateSince}
                onChange={newValue => {
                  setDateSince(newValue);
                  clearErrors('dateSince');
                  if (newValue) {
                    setValue('dateSince', newValue, { shouldValidate: true, shouldDirty: true });
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...register('dateSince')}
                    {...params}
                    label="Дата начала"
                    error={!!errors?.dateSince}
                    helperText={errors.dateSince?.message}
                  />
                )}
              />
            </div>
            {IS_ADD_MODE && (
              <>
                <div className={style.selectBlock}>
                  <TextField
                    {...register('franchiseId')}
                    label="Франшиза"
                    select
                    defaultValue=""
                    helperText={errors.franchiseId?.message}
                    error={!!errors?.franchiseId}
                  >
                    {getAllOptionsMUI(franchiseOptions)}
                  </TextField>
                </div>

                <div className={style.selectBlock}>
                  <TextField
                    {...register('courseId')}
                    select
                    label="Курс"
                    defaultValue=""
                    helperText={errors.courseId?.message}
                    error={!!errors?.courseId}
                  >
                    {getAllOptionsMUI(courseOptions)}
                  </TextField>
                </div>
              </>
            )}

            {!IS_ADD_MODE && (
              <>
                <div className={style.selectBlock}>
                  <TextField
                    {...register('status')}
                    label="Статус"
                    select
                    defaultValue={group?.status || ''}
                    helperText={errors.status?.message}
                    error={!!errors?.status}
                  >
                    {getAllOptionsMUI(statusOptions)}
                  </TextField>
                </div>
              </>
            )}
          </div>

          <div>
            <div className={style.selectBlock}>
              <DateTimePicker
                value={dateUntil}
                onChange={newValue => {
                  setDateUntil(newValue);
                  clearErrors('dateUntil');
                  if (newValue) {
                    setValue('dateUntil', newValue, { shouldValidate: true, shouldDirty: true });
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...register('dateUntil')}
                    {...params}
                    label="Дата окончания"
                    error={!!errors?.dateUntil}
                    helperText={errors.dateUntil?.message}
                  />
                )}
              />
            </div>

            <div className={style.selectBlock}>
              <TextField
                {...register('level')}
                select
                label="Уровень"
                defaultValue={group?.level || ''}
                helperText={errors.level?.message}
                error={!!errors?.level}
              >
                {getAllOptionsMUI(levelOptions)}
              </TextField>
            </div>
            {IS_ADD_MODE && (
              <div className={style.selectBlock}>
                <TextField
                  {...register('forGroupId')}
                  select
                  label="Для класса"
                  defaultValue=""
                  helperText={errors.forGroupId?.message}
                  error={!!errors?.forGroupId}
                  disabled={!groups.length}
                >
                  {getAllOptionsMUI(groupsOptions)}
                </TextField>
              </div>
            )}
          </div>
        </div>

        <h4 className={style.error}>{errorMessage}</h4>
        <div className={style.saveBtn}>
          <Button onClick={onSubmit}>Сохранить</Button>
        </div>
      </div>
    </form>
  );
});
