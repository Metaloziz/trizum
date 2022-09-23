import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SexEnum } from 'app/enums/CommonEnums';
import appStore, { Roles } from 'app/stores/appStore';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { action } from 'components/users-page/student-page-franchisee-modal-add-user/utils/action';
import { isMethodistTutor } from 'components/users-page/student-page-franchisee-modal-add-user/utils/IsMethodistTutor';
import { isStudentCreated } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentCreated';
import { isStudentRole } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentRole';
import { isStudentTeacherEducation } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import { roleOptions } from 'components/users-page/student-page-franchisee-modal-add-user/utils/roleOptions';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_NAME } from 'constants/regExp';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertFranchiseeOptions } from 'utils/convertFranchiseeOptions';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { convertSexOptions } from 'utils/convertSexOptions';
import { convertTariffOptions } from 'utils/convertTariffOptions';
import { filterRoleOptions } from 'utils/filterRoleOptions';
import { removeEmptyFields } from 'utils/removeEmptyFields';
import * as yup from 'yup';
import TextFieldPhoneCustom from '../../text-field-phone-mui/TextFieldPhoneCustom';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

type Props = {
  onCloseModal: () => void;
  currentUser?: ResponseOneUser;
  visibility?: boolean;
};

export const StudentPageFranchiseeModalAddUser: FC<Props> = observer(
  ({ currentUser, onCloseModal, visibility }) => {
    const studentIdx = currentUser?.id;
    const { franchise } = franchiseeStore;
    const { groups, loadCurrentGroups } = groupStore;
    const { tariffs } = tariffsStore;
    const { role, user } = appStore;
    const franchiseOptions = convertFranchiseeOptions(franchise);
    const sexOptions = convertSexOptions();
    const groupOptions = convertGroupOptions(groups);
    const tariffsOptions = convertTariffOptions(tariffs);
    const [isParentShown, setIsParentShown] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [selectedRole, setSelectedRole] = useState<Roles>();
    const [currentFranchiseId, setCurrentFranchiseId] = useState<string>('');

    useEffect(() => {
      if (currentUser?.roleCode) {
        setSelectedRole(currentUser.roleCode as Roles);
      }
    }, []);
    const findSex = () => (currentUser?.sex ? sexOptions[0].value : sexOptions[1].value);
    const defaultValues = {
      firstName: currentUser?.firstName || '',
      middleName: currentUser?.middleName || '',
      lastName: currentUser?.lastName || '',
      role: '', // не изменяется при редактировании
      sex: findSex() || sexOptions[0].value,
      city: currentUser?.city || '',
      phone: currentUser?.phone || '',
      birthdate: currentUser?.birthdate?.date || '01.01.2000',
      email: currentUser?.email || '',
      franchise: '', // не изменяется при редактировании
      tariff: currentUser?.tariff?.id || '', // не изменяется при редактировании
      group: currentUser?.groups[0]?.groupId || '', // не изменяется при редактировании
      password: currentUser?.password || '', // не обязателен при редактировании
    };
    const maxBirthdayYearStudent = new Date().getFullYear() - 3;
    const maxBirthdayYearAll = new Date().getFullYear() - 18;
    const minBirthdayYear = new Date().getFullYear() - 102;

    const isFranchiseRole = role === Roles.Franchisee || role === Roles.FranchiseeAdmin;

    const schema = yup.object().shape(
      {
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
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`),
        // .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        lastName: yup
          .string()
          .required('Обязательное поле')
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
          .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        role: currentUser ? yup.string().notRequired() : yup.string().required('Обязательное поле'),
        sex: yup.string().required('Обязательное поле'),
        city: yup
          .string()
          .required('Обязательное поле')
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
          .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        phone:
          selectedRole === Roles.Student
            ? yup.string().notRequired()
            : yup.string().required('Обязательное поле'),
        /* .matches(REG_PHONE, 'необходим формат 7 ХХХ ХХХ ХХ ХХХ')
                                                                                                                                                                                                                                                                    .length(PHONE_LENGTH, `номер должен быть из ${PHONE_LENGTH} цифр`), */
        birthdate: yup
          .date()
          .required('Обязательное поле')
          .min(`01-01-${minBirthdayYear}`, 'Не верно выбран возраст')
          .max(
            `01-01-${selectedRole === Roles.Student ? maxBirthdayYearStudent : maxBirthdayYearAll}`,
            `${
              selectedRole === Roles.Student
                ? 'Ученик не может быть младше 3 лет'
                : 'Возраст выбран не верно'
            }`,
          ),
        email:
          selectedRole === Roles.Student
            ? yup.string().notRequired()
            : yup
                .string()
                .email('Обязательное поле')
                .matches(
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

                  'Введите валидный email',
                )
                .required('Обязательное поле'),
        franchise: currentUser
          ? yup.string().notRequired()
          : isMethodistTutor(selectedRole) && !isFranchiseRole
          ? yup.string().required('Обязательное поле')
          : yup.string().notRequired(),
        tariff:
          selectedRole === Roles.Student
            ? yup.string().required('Обязательное поле')
            : yup.string().notRequired(),
        password: currentUser?.id
          ? yup
              .string()
              .nullable()
              .notRequired()
              .nullable()
              .when('password', {
                is: (value: any) => value?.length,
                then: rule => rule.min(6, 'Минимум 6 символов').max(30, 'Максимум 30 символов'),
              })
          : yup
              .string()
              .required('Обязательное поле')
              .min(6, 'Минимум 6 символов')
              .max(30, 'Максимум 30 символов'),
      },
      [['password', 'password']],
    );

    const {
      handleSubmit,
      control,
      setError,
      resetField,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm<typeof defaultValues>({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues,
    });

    const onSubmit = handleSubmit(async values => {
      const newUserData: RequestRegister = {
        sex: (values.sex as SexEnum) === SexEnum.Male,
        franchiseId: values.franchise,
        birthdate: values.birthdate,
        city: values.city,
        role: values.role as Roles,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        phone: values.phone.replace(/[()\s+-]/g, ''),
        isSecondChild: false,
        tariffId: values.tariff,
        groupId: values.group,
        password: values.password,
      };

      await action(
        currentUser,
        removeEmptyFields(newUserData),
        setError,
        values.role as Roles,
        onCloseModal,
        reset,
        setStudentId,
        setIsParentShown,
        values.role,
        values.franchise,
        values.tariff,
        values.group,
      );
    });

    const getCurrentGroups = (franchiseId: string) => {
      resetField('group');
      loadCurrentGroups(selectedRole, { franchiseId, type: 'class' });
    };

    useEffect(() => {
      if (selectedRole !== Roles.Student) {
        setIsParentShown(false);
      }

      if (isStudentTeacherEducation(selectedRole)) {
        loadCurrentGroups(selectedRole, {
          franchiseId: franchiseOptions[0].value,
          type: 'class',
        });
      }

      resetField('franchise');
    }, [selectedRole]);

    return (
      <>
        <form onSubmit={onSubmit}>
          <Box className={styles.wrapper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 className={styles.tableTitle}>
                  {currentUser ? 'Редактирование пользователя' : 'Регистрация пользователя'}
                </h2>
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
              {isStudentCreated(isParentShown, studentId) && (
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
                  {!currentUser && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="role"
                          render={({ field }) => (
                            <CustomSelect
                              {...field}
                              onChange={e => {
                                setSelectedRole(e.target.value as Roles);
                                field.onChange(e);
                              }}
                              title="Роль"
                              options={filterRoleOptions(roleOptions, role)}
                              error={errors.role?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                      {isMethodistTutor(selectedRole) && !isFranchiseRole && (
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="franchise"
                            render={({ field }) => (
                              <CustomSelect
                                {...field}
                                onChange={e => {
                                  field.onChange(e);
                                  getCurrentGroups(e.target.value);
                                  setCurrentFranchiseId(e.target.value);
                                }}
                                title="Франшиза"
                                options={franchiseOptions}
                                error={errors.franchise?.message}
                              />
                            )}
                            control={control}
                          />
                        </Grid>
                      )}
                    </>
                  )}
                  {isStudentRole(selectedRole) && (
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
                  )}
                  {isStudentTeacherEducation(selectedRole) && (
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
                            // value=""
                            options={groupOptions}
                            error={errors.group?.message}
                          />
                        )}
                        control={control}
                      />
                    </Grid>
                  )}
                  {!isStudentRole(selectedRole) && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="phone"
                          render={({ field }) => (
                            <TextFieldPhoneCustom
                              {...field}
                              label="Телефон"
                              error={errors.phone?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="email"
                          render={({ field }) => (
                            <TextFieldCustom
                              type="text"
                              autoComplete="on"
                              {...field}
                              label="Почта"
                              error={errors.email?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="password"
                          render={({ field }) => (
                            <TextFieldCustom
                              type="text"
                              autoComplete="on"
                              {...field}
                              label="Пароль"
                              error={errors.password?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                    </>
                  )}
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
              )}
              <Grid xs={12} sm={12} margin="10px 14px" display="flex">
                <Grid item xs={12} sm={6.2}>
                  {currentUser && (
                    <SetStatusButton active={currentUser?.active} id={currentUser.id} />
                  )}
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Button type="submit" disabled={isSubmitSuccessful}>
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
        {currentUser?.roleCode === Roles.Student && (
          <div>
            {currentUser?.parents && (
              <StudentParentsFormContainer
                franchiseId={currentFranchiseId}
                studentId={currentUser.id ? currentUser.id : ''}
                onCloseModal={onCloseModal}
                parents={currentUser.parents}
                visibility={visibility}
              />
            )}
            {isParentShown && studentId && (
              <StudentParentsFormContainer
                franchiseId={currentFranchiseId}
                studentId={studentId}
                onCloseModal={onCloseModal}
                visibility={visibility}
              />
            )}
          </div>
        )}
      </>
    );
  },
);

export default StudentPageFranchiseeModalAddUser;
