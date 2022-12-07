import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  ShiftVerticalFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { SHIFT_VERTICAL_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: ShiftVerticalFormType = {
  ...BASE_DEFAULT_VALUES,
  blinksCount: 2,
  cycleTime: 5,
  elementsTotal: 2,
  groupsCount: 2,
  timeComplete: undefined,
};

export const ShiftVerticalFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { blinksCount, cycleTime, elementsTotal, groupsCount, timeComplete, description } =
    settings[0];

  const defaultValues: ShiftVerticalFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          blinksCount,
          cycleTime,
          elementsTotal,
          groupsCount,
          timeComplete,
          description,
        } as ShiftVerticalFormType);

  const methods = useForm<ShiftVerticalFormType>({
    resolver: yupResolver(SHIFT_VERTICAL_FORM_SCHEMA),
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
          gameName="Сдвиг по вертикали"
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
                  label="Время на прохождение всех уровней игры, с."
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
              name="cycleTime"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Время на запоминание, мс."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.cycleTime?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="elementsTotal"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней в игре"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.elementsTotal?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="groupsCount"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Кол-во цветов для игры"
                  options={TEN_DIGIT_MENU}
                  error={errors.groupsCount?.message}
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
                  title="Кол-во форм для игры"
                  options={TEN_DIGIT_MENU}
                  error={errors.blinksCount?.message}
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
