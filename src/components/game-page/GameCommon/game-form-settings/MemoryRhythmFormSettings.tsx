import React, { ReactElement, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  MemoryRhythmFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';

import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { MEMORY_RHYTHM_FORM_SCHEMA } from './game-form-schema';

import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';

const DEFAULT_VALUES: MemoryRhythmFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  blinksCount: 2,
  digitMax: 3,
  levelMaxCompleted: 5,
  sound: 1,
  perSuccessLevel: 2,
  maxErrorLevel: 1,
  upgrade: 1,
  downgrade: 1,
};

export const MemoryRhythmFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const {
    levelMaxCompleted,
    timeComplete,
    description,
    blinksCount,
    digitMax,
    sound,
    perSuccessLevel,
    maxErrorLevel,
    upgrade,
    downgrade,
  } = settings[0];

  const defaultValues: MemoryRhythmFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          levelMaxCompleted,
          digitMax,
          blinksCount,
          sound,
          perSuccessLevel,
          maxErrorLevel,
          upgrade,
          downgrade,
        } as MemoryRhythmFormType);

  const methods = useForm<MemoryRhythmFormType>({
    resolver: yupResolver(MEMORY_RHYTHM_FORM_SCHEMA),
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
          gameName="ПАМЯТЬ И РИТМ"
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          status={status}
          createCopy={createCopy}
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
                  label="Кол-во уровней в игре "
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
              name="blinksCount"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Кол-во миганий."
                  options={TEN_DIGIT_MENU}
                  error={errors.blinksCount?.message}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="digitMax"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Количество шариков."
                  options={TEN_DIGIT_MENU}
                  error={errors.digitMax?.message}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="sound"
              render={({ field: { onChange, value, ref } }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        title="Музыка вкл/откл"
                        checked={value === 1}
                        onChange={({ target: { checked } }) =>
                          checked ? onChange(1) : onChange(0)
                        }
                        ref={ref}
                      />
                    }
                    label="Музыка вкл/откл"
                  />
                </FormGroup>
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
                  label="Кол-во уровней для увеличения бликов"
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
          <Grid item xs={12} sm={3}>
            <Controller
              name="maxErrorLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней для уменьшения бликов"
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
          <Grid item xs={12} sm={3}>
            <Controller
              name="upgrade"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во бликов для увеличения"
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
          <Grid item xs={12} sm={3}>
            <Controller
              name="downgrade"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во бликов для уменьшения"
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
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
