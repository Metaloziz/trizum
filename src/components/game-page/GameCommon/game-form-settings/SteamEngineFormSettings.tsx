import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { TEN_DIGIT_MENU } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  SteamEngineFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { STEAM_ENGINE_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: SteamEngineFormType = {
  name: '',
  level: GroupsLevelsValue.easy,
  status: StatusTypes.draft,
  description: undefined,
  timeComplete: 60,
  elementsTotal: 5,
  errorAacceptable: 1,
  gage: [{ area: true, speed: 1 }],
};

export const SteamEngineFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { elementsTotal, timeComplete, description } = settings[0];

  const defaultValues: SteamEngineFormType =
    id === ''
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          elementsTotal,
        } as SteamEngineFormType);

  const methods = useForm<SteamEngineFormType>({
    resolver: yupResolver(STEAM_ENGINE_FORM_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(values => {
    console.log(values);
    // onFormSubmit(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="ПАРО-ВИК"
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
              name="gage"
              render={({ field: { onChange, value, ref } }) => (
                <CustomSelect
                  size="small"
                  value={String(value)}
                  onChange={onChange}
                  title="Количество манометров."
                  options={TEN_DIGIT_MENU}
                  error={errors.gage?.message}
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
                  label="Кол-во единиц на которое уменьшится кол-во успешных нажатий."
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
              name="elementsTotal"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во успешных нажатий на манометр для выигрыша."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.elementsTotal?.message}
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
