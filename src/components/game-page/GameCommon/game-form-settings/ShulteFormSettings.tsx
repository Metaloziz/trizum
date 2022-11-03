import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { TEN_DIGIT_MENU } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FormSettingsType,
  ShulteFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { SHULTE_FORM_SCHEMA } from './game-form-schema';

type ShulteFormSettingsType = FormSettingsType & {
  colorsMapState: string[];
  setColorModal: (value: boolean) => void;
};

const DEFAULT_VALUES: ShulteFormType = {
  name: '',
  level: GroupsLevelsValue.easy,
  status: StatusTypes.draft,
  description: undefined,
  timeComplete: 60,
  elementsTotal: 3,
  digitMin: 1,
  colorsMap: [],
};

export const ShulteFormSettings = (props: ShulteFormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, colorsMapState, setColorModal } =
    props;
  const { settings, status, id, level, name } = gamePreset;
  const { elementsTotal, colorsMap, timeComplete, description, digitMin } = settings[0];

  const defaultValues: ShulteFormType =
    id === ''
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          elementsTotal,
          digitMin,
          colorsMap,
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
    setValue,
  } = methods;

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
  });

  useEffect(() => {
    setValue('colorsMap', colorsMapState);
  }, [colorsMapState]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="ТАБЛИЦА ШУЛЬТЕ"
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

          <div className={styles.inputBlock}>
            <div className={styles.gameModalColorBtn}>
              <label>Необходимые цвета</label>
              <button type="button" onClick={() => setColorModal(true)}>
                Выбор цвета
              </button>
            </div>
            <div style={{ display: 'flex' }}>
              {colorsMapState.map(color => (
                <div
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                  className={styles.colorTemplate}
                />
              ))}
              {errors.colorsMap?.message}
            </div>
          </div>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
