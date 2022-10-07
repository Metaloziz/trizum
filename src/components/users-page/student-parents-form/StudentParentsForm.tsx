import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { maxBirthdayYearAll, minBirthdayYear } from 'utils/dateMask';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentT, ResponseOneUser, ResponseParenting } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect from 'components/select-mui/CustomSelect';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import { action } from 'components/users-page/student-parents-form/utils/action';
import { sexOptions } from 'components/users-page/student-parents-form/utils/sexOptions';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_EMAIL, REG_NAME } from 'constants/regExp';
import { OptionT } from 'app/types/OptionT';
import TextFieldCustom from '../../text-field-mui/TextFieldCustom';
import TextFieldPhoneCustom from '../../text-field-phone-mui/TextFieldPhoneCustom';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  localParentFormID: number;
  studentId: string;
  franchiseId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number, parentingId?: string) => void;
  setSuccessForm: (isSuccess: boolean, id: number, parentingData?: ResponseParenting) => void;
  deleteParenting: (parentingId: string) => void;
  parent?: ParentT;
  isSuccessSubmit: boolean;
  isViewMode?: boolean;
  currentUser?: ResponseOneUser;
};

type CreateParentPayloadT = Omit<
  RequestRegister,
  'tariffId' | 'franchiseId' | 'isSecondChild' | 'role' | 'groupId' | 'sex'
> & { sex: OptionT | undefined | any; isMain: boolean };

const StudentParentsForm: FC<Props> = observer(
  ({
    setSuccessForm,
    studentId,
    franchiseId,
    localParentFormID,
    isMainParent,
    setIsMainParent,
    parent,
    isSuccessSubmit,
    isViewMode,
    currentUser,
    deleteParenting,
  }) => {
    const [isDisableSubmit, setIsDisableSubmit] = useState(false);

    const radioChangeHandler = () => {
      setIsMainParent(!isMainParent, localParentFormID, parent?.id);
    };

    const deleteParentingHandler = () => {
      if (parent) {
        deleteParenting(parent.id);
      }
    };

    const userFranchiseId: string | undefined = currentUser?.franchise?.id as string | undefined;

    const schema = yup.object().shape(
      {
        firstName: yup
          .string()
          .required('Обязательное поле')
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
          .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        middleName: yup
          .string()
          .notRequired()
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`),
        // .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        lastName: yup
          .string()
          .required('Обязательное поле')
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
          .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        city: yup
          .string()
          .required('Обязательное поле')
          .matches(REG_NAME, 'Допустима только кириллица')
          .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
          .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
        phone: yup.string().required('Обязательное поле'),
        email: yup
          .string()
          .email('Обязательное поле')
          .matches(REG_EMAIL, 'Введите валидный email')
          .required('Обязательное поле'),
        birthdate: yup
          .date()
          .required('Обязательное поле')
          .min(`01-01-${minBirthdayYear}`, 'Не верно выбран возраст')
          .max(`01-01-${maxBirthdayYearAll}`, 'Возраст выбран не верно'),
        sex: yup.string().required('Обязательное поле'),
        isMain: yup.boolean().required('Обязательное поле'),
        password: yup
          .string()
          .nullable()
          .notRequired()
          .nullable()
          .when('password', {
            is: (value: any) => value?.length,
            then: rule => rule.min(6, 'Минимум 6 символов').max(30, 'Максимум 30 символов'),
          }),
      },
      [['password', 'password']],
    );

    const defaultValues = {
      firstName: parent?.firstName || '',
      middleName: parent?.middleName || '',
      lastName: parent?.lastName || '',
      city: parent?.city || '',
      phone: parent?.phone || '',
      email: parent?.email || '',
      birthdate: parent?.birthdate?.date || '01.01.2000',
      sex: sexOptions[0]?.value,
      isMain: parent?.main || false,
      franchiseId: userFranchiseId,
      password: parent?.password || '',
    };

    const {
      handleSubmit,
      control,
      setError,
      formState: { errors },
    } = useForm<typeof defaultValues>({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateParentPayloadT> = async values => {
      const newParent: RequestRegister = {
        sex: (values.sex as SexEnum) === SexEnum.Male,
        phone: values.phone?.replace(/[()\s+-]/g, ''),
        middleName: values.middleName,
        city: values.city,
        lastName: values.lastName,
        firstName: values.firstName,
        franchiseId: userFranchiseId,
        email: values.email,
        birthdate: values.birthdate,
        role: Roles.Parent,
        password: values.password,
      };

      await action(
        setIsDisableSubmit,
        parent,
        newParent,
        setError,
        studentId,
        values.isMain,
        setSuccessForm,
        localParentFormID,
      );
    };

    return (
      <form>
        <Box className={styles.wrapper}>
          {isViewMode && <div className={styles.block} />}
          <Grid container spacing={2}>
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
                    {...field}
                    label="Отчество"
                    error={errors.middleName?.message}
                  />
                )}
                control={control}
              />
            </Grid>
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
                name="phone"
                render={({ field }) => (
                  <TextFieldPhoneCustom {...field} label="Телефон" error={errors.phone?.message} />
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
                      {...field}
                      onChange={(date: Date | null) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      value={field.value ? new Date(field.value) : null}
                      renderInput={props => (
                        <TextField
                          {...props}
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="isMain"
                control={control}
                render={({ field }) => (
                  <div className={styles.selectWrapper}>
                    <div className={styles.label}>
                      <>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={isMainParent}
                                onChange={e => {
                                  if (!isMainParent) {
                                    field.onChange(e);
                                    radioChangeHandler();
                                  }
                                }}
                              />
                            }
                            label="Основной"
                          />
                          <FormHelperText error={!errors.isMain?.message}>
                            {errors.isMain?.message}
                          </FormHelperText>
                        </FormGroup>
                        {isMainParent && (
                          <Image src={iconMedal} width="20" height="20" alt="medal" />
                        )}
                      </>
                    </div>
                  </div>
                )}
              />
            </Grid>
            {isViewMode || (
              <div className={styles.buttons}>
                <Button type="submit" disabled={isDisableSubmit} onClick={handleSubmit(onSubmit)}>
                  Сохранить
                </Button>
                {!isMainParent && (
                  <Button variant="reset" size="thin" onClick={deleteParentingHandler}>
                    Удалить
                  </Button>
                )}
              </div>
            )}
          </Grid>
        </Box>
      </form>
    );
  },
);

export default StudentParentsForm;
