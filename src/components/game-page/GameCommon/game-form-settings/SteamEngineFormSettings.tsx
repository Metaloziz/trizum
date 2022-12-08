import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  SteamEngineFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { ChangeGage } from 'utils/gameUtils/changeGage';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { STEAM_ENGINE_FORM_SCHEMA } from './game-form-schema';

const DEFAULT_VALUES: SteamEngineFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  elementsTotal: 5,
  errorAacceptable: 1,
  gage: [{ id: 1, area: true, speed: 1 }],
  perSuccessLevel: 1,
  maxErrorLevel: 1,
  upgrade: 10,
  downgrade: 20,
};

export const SteamEngineFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const {
    elementsTotal,
    timeComplete,
    description,
    gage,
    errorAacceptable,
    perSuccessLevel,
    maxErrorLevel,
    upgrade,
    downgrade,
  } = settings[0];

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
          errorAacceptable,
          gage,
          perSuccessLevel,
          maxErrorLevel,
          upgrade,
          downgrade,
        } as SteamEngineFormType);

  const methods = useForm<SteamEngineFormType>({
    resolver: yupResolver(STEAM_ENGINE_FORM_SCHEMA),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = methods;

  const [countGage, setCountGage] = useState(getValues('gage'));

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
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
                  value={String(value.length)}
                  onChange={event => {
                    setCountGage(ChangeGage(event, value));
                    onChange(ChangeGage(event, value));
                  }}
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
          <Grid item xs={12} sm={6} />

          {countGage.map(({ speed, id: gageId, area }, index) => (
            <Grid key={gageId} item xs={12}>
              <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={`gage.${index}.speed`}
                    render={({ field: { value, onChange, ref } }) => (
                      <TextFieldCustom
                        type="text"
                        label={`Время кручения манометра №${index + 1}, c.`}
                        size="small"
                        fullWidth
                        inputProps={{ type: 'number' }}
                        error={errors.gage && errors.gage[index]?.speed?.message}
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
                    name={`gage.${index}.area`}
                    render={({ field: { onChange, value, ref } }) => (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              title="Музыка вкл/откл"
                              checked={value}
                              onChange={onChange}
                              ref={ref}
                            />
                          }
                          label={`Область нажатия манометра №${index + 1}  равна ${
                            value ? '1/6' : '1/8'
                          }`}
                        />
                      </FormGroup>
                    )}
                    control={control}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12} sm={3}>
            <Controller
              name="perSuccessLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во нажатий для увеличения скорости"
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
                  label="Кол-во нажатий для уменьшения скорости"
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
                  label="Процент увеличения скорости манометров"
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
                  label="Процент уменьшения скорости манометров"
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
