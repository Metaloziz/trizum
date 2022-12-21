import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  SilhouettesFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { SILHOUETTES_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: SilhouettesFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  elementsTotal: 2,
  digitMax: 4,
  perSuccessLevel: 3,
  maxErrorLevel: 1,
  upgrade: 1,
  downgrade: 2,
};

export const SilhouettesFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const {
    timeComplete,
    description,
    elementsTotal,
    digitMax,
    perSuccessLevel,
    maxErrorLevel,
    upgrade,
    downgrade,
  } = settings[0];

  const defaultValues: SilhouettesFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          elementsTotal,
          digitMax,
          perSuccessLevel,
          maxErrorLevel,
          upgrade,
          downgrade,
        } as SilhouettesFormType);

  const methods = useForm<SilhouettesFormType>({
    resolver: yupResolver(SILHOUETTES_FORM_SCHEMA),
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
          gameName="БИРЮЛЬКИ"
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
              name="elementsTotal"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Кол-во силуэтов для угадывания."
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
              name="digitMax"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Кол-во фигур для угадывания."
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
              name="perSuccessLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Среднее время нажатий для пересчета кол-ва фигур для угадывания, c."
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="maxErrorLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во нажатий для замера"
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
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
