import React, { ReactElement, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { BULLS_AND_COWS_FORM_SCHEMA } from './game-form-schema';

import { BASE_DEFAULT_VALUES } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  BullsAndCowsFormType,
  FormSettingsType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';

import { BaseFormGameSettings } from './BaseFormGameSettings';

const DEFAULT_VALUES: BullsAndCowsFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 120,
  levelMaxCompleted: 2,
  errorAacceptable: 10,
  digitMax: 4,
};

export const BullsAndCowsSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { timeComplete, description, levelMaxCompleted, errorAacceptable, digitMax } = settings[0];

  const defaultValues: BullsAndCowsFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          digitMax,
          errorAacceptable,
          levelMaxCompleted,
        } as BullsAndCowsFormType);

  const methods = useForm<BullsAndCowsFormType>({
    resolver: yupResolver(BULLS_AND_COWS_FORM_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
  });

  useEffect(() => {
    if (status === 'copiyed') {
      reset({ ...defaultValues, status: 'draft' });
    }
  }, [status]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="БЫКИ И КОРОВЫ"
          deletedPreset={deletedPreset}
          createCopy={createCopy}
          usedInWorks={usedInWorks}
          status={status}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              name="timeComplete"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Время на прохождение игры, с."
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
              name="levelMaxCompleted"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней"
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
              name="errorAacceptable"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во возможных ошибок на одном уровне"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.errorAacceptable?.message}
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
                  label="Кол-во цифр для угадывания"
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
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
