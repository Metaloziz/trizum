import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { OptionT } from 'app/types/OptionT';
import {
  BASE_DEFAULT_VALUES,
  TEN_DIGIT_MENU,
} from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  ShulteFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import { CustomMultiSelect } from 'components/multiSelect/CustomMultiSelect';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertArrayToNull, convertNullToArray } from 'utils/convertNull';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { SHULTE_FORM_SCHEMA } from './game-form-schema';

const COLOR_OPTIONS: OptionT[] = [
  { label: 'Выбор цвета:', value: 'null' },
  { label: 'Зелёный', value: '#076d4d' },
  { label: 'Чёрный', value: '#000000' },
  { label: 'Красный', value: '#e30d00' },
  { label: 'Синий', value: '#699deb' },
  { label: 'Фиолетовый', value: '#c3b8f9' },
  { label: 'Оранжевый', value: '#f88e36' },
  { label: 'Розовый', value: '#e99aff' },
  { label: 'Коричневый', value: '#441d00' },
  { label: 'Жёлтый', value: '#fff900' },
  { label: 'Голубой', value: '#00c1ee' },
];

const DEFAULT_VALUES: ShulteFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  elementsTotal: 3,
  digitMin: 1,
  colorsMap: ['null'],
};

export const ShulteFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { elementsTotal, colorsMap, timeComplete, description, digitMin } = settings[0];

  const defaultValues: ShulteFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          elementsTotal: elementsTotal || 1,
          digitMin,
          colorsMap: colorsMap || ['null'],
        } as ShulteFormType);

  const methods = useForm<ShulteFormType>({
    resolver: yupResolver(SHULTE_FORM_SCHEMA),
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
          gameName="ТАБЛИЦА ШУЛЬТЕ"
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
              name="digitMin"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Минимальное число на поле"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.digitMin?.message}
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
                  title="Размер поля"
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
              name="colorsMap"
              render={({ field: { onChange, value: valueField } }) => (
                <CustomMultiSelect
                  onChange={event => {
                    onChange(convertArrayToNull(event));
                  }}
                  value={convertNullToArray(valueField || null)}
                  options={COLOR_OPTIONS}
                  error={errors.colorsMap?.message}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Controller
              name="colorsMap"
              render={({ field: { value: valueField } }) => (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  Выбранные цвета:
                  {valueField[0] !== 'null' ? (
                    valueField?.map(color => (
                      <div
                        key={color}
                        style={{ backgroundColor: `${color}` }}
                        className={styles.colorTemplate}
                      />
                    ))
                  ) : (
                    <div className={styles.textColor}> не выбрано</div>
                  )}
                </div>
              )}
              control={control}
            />
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
