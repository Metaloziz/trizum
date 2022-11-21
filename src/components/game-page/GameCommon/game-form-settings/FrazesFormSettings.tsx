import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormGroup, Grid, Box, Button } from '@mui/material';
import { BASE_DEFAULT_VALUES } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FrazesFormType,
  FormSettingsType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { FRAZES_FORM_SCHEMA } from './game-form-schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const DEFAULT_VALUES: FrazesFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 10,
  errorAacceptable: 2,
  speed: 2000,
  wordsFull: false,
  words: ['Ухо', 'Сухо', 'Сом', 'Уха', 'Мох', 'Муха', 'Сух', 'Мам', 'Сама', 'Оса', 'Мухомор'],
};

export const FrazesFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { timeComplete, description, wordsFull, speed, errorAacceptable, words } = settings[0];

  const defaultValues: FrazesFormType =
    id === ''
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          wordsFull,
          speed,
          errorAacceptable,
          words,
        } as FrazesFormType);

  const methods = useForm<FrazesFormType>({
    resolver: yupResolver(FRAZES_FORM_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'words' as never,
    control,
  });

  const onSubmit = handleSubmit(values => {
    onFormSubmit(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="ФРАЗОСКОП"
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          status={status}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              name="errorAacceptable"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во возможных ошибок"
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
              name="speed"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Время на запоминание, мс."
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

          <Grid item xs={12} sm={6}>
            <Controller
              name="wordsFull"
              render={({ field: { value, onChange, ref } }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        title="Писать слова полностью или первые две буквы"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    }
                    label="Писать слова полностью или первые две буквы"
                  />
                </FormGroup>
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button onClick={() => append('')}>
                <AddIcon />
              </Button>
            </Box>

            {fields.map((field, index) => (
              <Box key={field.id} mb={2} display="flex" alignItems="flex-start">
                <Controller
                  control={control}
                  name={`words.${index}` as const}
                  render={({ field: { value, onChange, ref } }) => (
                    <TextFieldCustom
                      type="text"
                      label={`Cлово ${index + 1}`}
                      size="small"
                      fullWidth
                      inputProps={{ type: 'text' }}
                      error={errors.words?.[index]?.message}
                      onChange={event => onChange(convertEmptyStringToNull(event))}
                      value={value}
                      ref={ref}
                    />
                  )}
                />
                <Button onClick={() => remove(index)}>
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};