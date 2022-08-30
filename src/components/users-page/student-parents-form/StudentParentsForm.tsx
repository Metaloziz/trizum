import React, { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentDataT } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import CustomSelect from 'components/select-mui/CustomSelect';
// import TextField from 'components/text-field/TextField';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import { action } from 'components/users-page/student-parents-form/utils/action';
import { sexOptions } from 'components/users-page/student-parents-form/utils/sexOptions';
import { MAIN_PARENT_ID } from 'components/users-page/student-parrents-form-container/store/store';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH, PHONE_LENGTH } from 'constants/constants';
import { REG_NAME, REG_PHONE } from 'constants/regExp';
import user from 'public/svgs/user.svg';
import { OptionT } from 'app/types/OptionT';
import TextFieldCustom from "../../text-field-mui/TextFieldCustom";
import TextFieldPhoneCustom from "../../text-field-phone-mui/TextFieldPhoneCustom";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  localParentFormID: number;
  studentId: string;
  franchiseId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number) => void;
  setIsSubmitSuccessful: (isSuccess: boolean, id: number) => void;
  parent?: ParentDataT;
  isSubmitAnyForm: boolean;
};

type CreateParentPayloadT = Omit<
  RequestRegister,
  'tariffId' | 'franchiseId' | 'isSecondChild' | 'role' | 'groupId' | 'sex'
> & { sex: OptionT | undefined | any; isMain: boolean };

const StudentParentsForm: FC<Props> = ({
  setIsSubmitSuccessful,
  studentId,
  franchiseId,
  localParentFormID,
  isMainParent,
  setIsMainParent,
  parent,
  isSubmitAnyForm,
}) => {
  const [isDisableSubmit, setIsDisableSubmit] = useState(false);

  const handlerRadioChange = () => {
    setIsMainParent(!isMainParent, localParentFormID);
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    middleName: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    lastName: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    city: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    phone: yup
      .string()
      .required('Обязательное поле'),
    email: yup.string().required('Обязательное поле').email(),
    birthdate: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
    sex: yup.string().required('Обязательное поле'),
    isMain: yup.boolean().required('Обязательное поле'),
  });

  const defaultValues = {
    firstName: parent?.parent.firstName || '',
    middleName: parent?.parent.middleName || '',
    lastName: parent?.parent.lastName || '',
    city: parent?.parent.city || '',
    phone: parent?.parent.phone || '',
    email: parent?.parent.email || '',
    birthdate: '01.01.2000',
    sex: sexOptions[0].value,
    isMain: parent?.isMain || false,
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange', defaultValues, resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<CreateParentPayloadT> = async values => {
    const newParent: RequestRegister = {
      sex: (values.sex as SexEnum) === SexEnum.Male,
      phone: values.phone?.replace(/[()\s+-]/g, ''),
      middleName: values.middleName,
      city: values.city,
      lastName: values.lastName,
      firstName: values.firstName,
      franchiseId,
      email: values.email,
      birthdate: values.birthdate,
      role: Roles.Parent,
    };

    action(
      setIsDisableSubmit,
      parent,
      newParent,
      setError,
      studentId,
      values.isMain,
      setIsSubmitSuccessful,
      localParentFormID,
    );
  };

  return (
    <div className={styles.row}>
      <div className={styles.table}>
        <form>
          <Controller
              name="lastName"
              render={({ field }) => (
                  <TextFieldCustom {...field} label="Фамилия" error={errors.lastName?.message} />
              )}
              control={control}
          />
          <Controller
              name="firstName"
              render={({ field }) => (
                  <TextFieldCustom {...field} label="Имя" error={errors.firstName?.message} />
              )}
              control={control}
          />
          <Controller
            name="middleName"
            render={({ field }) => (
              <TextFieldCustom {...field} label="Отчество" error={errors.middleName?.message} />
            )}
            control={control}
          />
          <Controller
            name="city"
            render={({ field }) => (
              <TextFieldCustom {...field} label="Город" error={errors.city?.message} />
            )}
            control={control}
          />
          <Controller
            name="phone"
            render={({ field }) => (
              <TextFieldPhoneCustom {...field} label="Телефон" error={errors.phone?.message} />
            )}
            control={control}
          />
          <div className={styles.infoItem}>
            <Controller
              name="birthdate"
              render={({ field }) => (
                  <FormControl fullWidth>
                    {/* <InputLabel htmlFor="birthdate">Дата рождения</InputLabel> */}
                    <DatePicker
                        onChange={(date: Date | null) => {
                            if (date) {
                                field.onChange(date.toISOString());
                            }
                            }
                        }
                        value={field.value}
                        renderInput={(props) =>(
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
          </div>
          <Controller
            name="email"
            render={({ field }) => (
              <TextFieldCustom {...field} label="Почта" error={errors.email?.message} />
            )}
            control={control}
          />
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

          <Controller
            name="isMain"
            control={control}
            render={({ field }) => (
              <div className={styles.selectWrapper}>
                <div className={styles.label}>
                  {localParentFormID === MAIN_PARENT_ID && (
                    <>
                      <FormGroup>
                        <FormControlLabel control={
                          <Checkbox
                              color="primary"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                                          label="Основной"/>
                      </FormGroup>
                      <div className={styles.medal}>
                        <Image src={iconMedal} width="20" height="20" alt="medal" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          />
          <Button type="submit" disabled={isDisableSubmit} onClick={handleSubmit(onSubmit)}>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentParentsForm;
