import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FirefliesFormType,
  FormSettingsType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { FIREFLIES_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: FirefliesFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  elementsTotal: 1,
  levelMaxCompleted: null,
  digitMax: 10,
  speed: null,
  perSuccessLevel: 1,
  maxErrorLevel: 1,
  upgrade: 10,
  downgrade: 20,
};

export const FirefliesFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const {
    elementsTotal,
    timeComplete,
    description,
    levelMaxCompleted,
    digitMax,
    speed,
    perSuccessLevel,
    maxErrorLevel,
    upgrade,
    downgrade,
  } = settings[0];

  const defaultValues: FirefliesFormType =
    id === ''
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          elementsTotal,
          levelMaxCompleted,
          digitMax,
          speed,
          perSuccessLevel,
          maxErrorLevel,
          upgrade,
          downgrade,
        } as FirefliesFormType);

  const methods = useForm<FirefliesFormType>({
    resolver: yupResolver(FIREFLIES_FORM_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="Светлячки"
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          status={status}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              name="timeComplete"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Время отслеживания светлячков, с."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.timeComplete?.message}
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
              name="elementsTotal"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Сумма светлячков появляющихся первыми."
                  options={TEN_DIGIT_MENU}
                  error={errors.elementsTotal?.message}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="levelMaxCompleted"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Количество уровней."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.levelMaxCompleted?.message}
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
              name="digitMax"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Всего светлячков на поле."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.digitMax?.message}
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
              name="speed"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Скорость движения светлячков, мс."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.speed?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="perSuccessLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней для увеличения скорости"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.perSuccessLevel?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="maxErrorLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней для уменьшения скорости"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.maxErrorLevel?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="upgrade"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Процент увеличения скорости светлячков"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.upgrade?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="downgrade"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Процент уемньшения скорости светлячков"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.downgrade?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
