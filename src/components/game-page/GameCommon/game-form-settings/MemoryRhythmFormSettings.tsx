import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { TEN_DIGIT_MENU } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  MemoryRhythmFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { MEMORY_RHYTHM_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: MemoryRhythmFormType = {
  name: '',
  level: GroupsLevelsValue.easy,
  status: StatusTypes.draft,
  description: undefined,
  timeComplete: 60,
  blinksCount: 2,
  digitMax: 3,
  levelMaxCompleted: 5,
  sound: 1,
};

export const MemoryRhythmFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { levelMaxCompleted, timeComplete, description, blinksCount, digitMax, sound } =
    settings[0];

  const defaultValues: MemoryRhythmFormType =
    id === ''
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
  } = methods;

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="ПАМЯТЬ И РИТМ"
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
                  title="Кол-во миганий."
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
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
