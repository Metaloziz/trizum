import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_NAME } from 'constants/regExp';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { convertSexOptions } from 'utils/convertSexOptions';
import { convertTariffOptions } from 'utils/convertTariffOptions';
import { maxBirthdayYearStudent, minBirthdayYear } from 'utils/dateMask';
import * as yup from 'yup';
import { action } from './action/action';

import style from './AddSecondChildForm.module.scss';

type Props = {
  onCloseModal: () => void;
};

export const AddSecondChildForm: FC<Props> = observer(({ onCloseModal }) => {
  const { currentUser } = usersStore;
  const { groups } = groupStore;
  const { tariffs } = tariffsStore;

  const sexOptions = convertSexOptions();
  const groupOptions = convertGroupOptions(groups);
  const tariffsOptions = convertTariffOptions(tariffs);

  const defaultValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    sex: sexOptions[0].value,
    city: '',
    birthdate: '01.01.2000',
    tariff: '',
    group: '',
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'Допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    middleName: yup
      .string()
      .notRequired()
      .matches(REG_NAME, 'Допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    lastName: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'Допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    sex: yup.string().required('Обязательное поле'),
    city: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'Допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    birthdate: yup
      .date()
      .required('Обязательное поле')
      .min(`01-01-${minBirthdayYear}`, 'Не верно выбран возраст')
      .max(`01-01-${maxBirthdayYearStudent}`, 'Ученик не может быть младше 3 лет'),

    tariff: yup.string().required('Обязательное поле'),
    group: yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<typeof defaultValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async values => {
    const newUserData: RequestRegister = {
      sex: (values.sex as SexEnum) === SexEnum.Male,
      franchiseId: currentUser?.franchise?.id,
      birthdate: values.birthdate,
      city: values.city,
      role: Roles.Student,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      isSecondChild: true,
      tariffId: values.tariff,
      groupId: values.group,
      phone: '',
      password: '',
      email: '',
    };

    action(newUserData, onCloseModal);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box className={style.wrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2 className={style.tableTitle}>Добавление ребёнка</h2>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    label="Фамилия"
                    error={errors.lastName?.message}
                    {...field}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    label="Имя"
                    error={errors.firstName?.message}
                    {...field}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="middleName"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    label="Отчество"
                    error={errors.middleName?.message}
                    {...field}
                  />
                )}
                control={control}
              />
            </Grid>
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  render={({ field }) => (
                    <TextFieldCustom
                      type="text"
                      autoComplete="on"
                      {...field}
                      label="Город"
                      error={errors.city?.message}
                    />
                  )}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="tariff"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                      }}
                      title="Тариф"
                      options={tariffsOptions}
                      error={errors?.tariff?.message?.toString()}
                    />
                  )}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="group"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                      }}
                      title="Группа"
                      options={groupOptions}
                      error={errors.group?.message}
                    />
                  )}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="birthdate"
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
                            label="Дата рождения"
                            error={!!errors.birthdate?.message}
                            helperText={errors.birthdate?.message}
                            onKeyDown={event => event.preventDefault()} // убирает
                            // ввод с клавиатуры
                          />
                        )}
                      />
                    </FormControl>
                  )}
                  control={control}
                />
              </Grid>
              <Grid item xs={13} sm={6}>
                <Controller
                  name="sex"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      title="Пол"
                      options={sexOptions}
                      error={errors.sex?.message}
                    />
                  )}
                  control={control}
                />
              </Grid>
            </>
            <div className={style.buttonsBox}>
              <div className={style.button}>
                <Button type="submit" disabled={isSubmitSuccessful}>
                  Сохранить
                </Button>
              </div>
            </div>
          </Grid>
        </Box>
      </form>
    </>
  );
});
