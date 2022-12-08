import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GroupLevels } from 'app/enums/GroupLevels';
import { ShortCourseType } from 'app/types/CourseTypes';
import { ResponseGroups } from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { OlympiadFormType } from 'app/types/OlympiadPayloadType';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_NAME } from 'constants/regExp';
import { STATUS_MENU } from 'constants/selectMenu';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertCourseOptions } from 'utils/convertCourseOptions';
import { convertEnumOptions } from 'utils/convertEnumOptions';
import { convertFranchiseeOptions } from 'utils/convertFranchiseeOptions';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { filterSelectMenu } from 'utils/filterSelectMenu';
import * as yup from 'yup';

import style from './OlympiadForm.module.scss';

const SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required('Обязательное поле')
    .matches(REG_NAME, 'допустима только кириллица')
    .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
    .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
  dateSince: yup.date().required('Обязательное поле').nullable(),
  dateStart: yup.date().notRequired().nullable(),
  franchiseId: yup.string().notRequired().nullable(),
  courseId: yup.string().required('Обязательное поле').nullable(),
  forGroupId: yup.string().when('franchiseId', franchiseId => {
    if (franchiseId !== null) {
      return yup.string().required('Обязательное поле');
    }
    return yup.string().notRequired();
  }),
  level: yup.string().required('Обязательное поле').nullable(),
  status: yup.string().notRequired(),
  description: yup.string().notRequired(),
});

type Props = {
  setShowModal: (value: boolean) => void;
  defaultValues: OlympiadFormType;
  title: string;
  franchise: FranchisingViewModel[];
  onSubmitForm: (value: OlympiadFormType) => void;
  courses: Nullable<ShortCourseType[]>;
  groups: ResponseGroups[];
  getGroups: (franchiseId: string) => void;
};

export const OlympiadForm: FC<Props> = ({
  setShowModal,
  defaultValues,
  onSubmitForm,
  title,
  franchise,
  courses,
  groups,
  getGroups,
}) => {
  const franchiseOptions = convertFranchiseeOptions(franchise);
  const courseOptions = convertCourseOptions(courses);
  const groupsOptions = convertGroupOptions(groups);
  const levelOptions = convertEnumOptions(GroupLevels);
  const menu = filterSelectMenu(defaultValues.status, STATUS_MENU);

  const {
    handleSubmit,
    setValue,
    watch,
    resetField,
    register,
    control,
    formState: { errors },
  } = useForm<OlympiadFormType>({ resolver: yupResolver(SCHEMA), defaultValues });

  const FRANCHISE_ID = watch('franchiseId');

  const onSubmit = handleSubmit(async values => {
    onSubmitForm(values);
  });

  useEffect(() => {
    if (FRANCHISE_ID) {
      getGroups(FRANCHISE_ID);
      resetField('forGroupId');
    }
    if (FRANCHISE_ID === '') {
      setValue('franchiseId', '');
      setValue('forGroupId', '');
    }
  }, [FRANCHISE_ID]);

  return (
    <BasicModal visibility changeVisibility={setShowModal}>
      <div className={style.modalOlympiad}>
        <h2>{title}</h2>
        <form>
          <Grid direction="row" container spacing={2} marginTop={1} marginBottom={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    type="text"
                    label="Название олимпиады"
                    size="small"
                    fullWidth
                    error={errors.name?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dateSince"
                render={({ field: { value, onChange, ref } }) => (
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    renderInput={params => (
                      <TextField
                        {...register('dateSince')}
                        {...params}
                        label="Дата анонса"
                        size="small"
                        fullWidth
                        error={!!errors?.dateSince}
                        helperText={errors.dateSince?.message}
                      />
                    )}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dateStart"
                render={({ field: { value, onChange, ref } }) => (
                  <DateTimePicker
                    value={value || ''}
                    onChange={onChange}
                    ref={ref}
                    renderInput={params => (
                      <TextField
                        {...register('dateStart')}
                        {...params}
                        label="Дата старта"
                        size="small"
                        fullWidth
                        error={!!errors?.dateStart}
                        helperText={errors.dateStart?.message}
                      />
                    )}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Статус"
                    options={menu}
                    error={errors.status?.message}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="level"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value || ''}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Уровень"
                    options={levelOptions}
                    error={errors.level?.message}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="courseId"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value || ''}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Курс"
                    options={courseOptions}
                    error={errors.courseId?.message}
                    ref={ref}
                    disabled={!!defaultValues.id}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="franchiseId"
                render={({ field: { value, onChange, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value || ''}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Франшиза"
                    options={franchiseOptions}
                    error={errors.franchiseId?.message}
                    ref={ref}
                    disabled={!!defaultValues.id}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="forGroupId"
                render={({ field: { value, onChange, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value || ''}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Группа"
                    options={groupsOptions}
                    error={errors.forGroupId?.message}
                    ref={ref}
                    disabled={!FRANCHISE_ID || !!defaultValues.id}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="description"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    type="text"
                    label="Описание"
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                    error={errors.description?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            {/* <h4 className={style.error}>{errorMessage}</h4> */}
            <div className={style.saveBtn}>
              <Button onClick={onSubmit}>Сохранить</Button>
            </div>
          </Grid>
        </form>
      </div>
    </BasicModal>
  );
};
