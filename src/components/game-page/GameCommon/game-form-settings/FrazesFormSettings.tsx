import React, { ReactElement, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormGroup, Grid, Box, Button } from '@mui/material';
import { BASE_DEFAULT_VALUES } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  FrazesFormType,
  FormSettingsType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { BaseFormGameSettings } from './BaseFormGameSettings';
import { FRAZES_FORM_SCHEMA } from './game-form-schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultDictionary } from 'games/games/frazes/assets/words';

const DEFAULT_VALUES: FrazesFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 120,
  errorAacceptable: 5,
  speed: 2000,
  wordsFull: false,
  errorLevel: 2,
  changeLevelDictionary: 3,
  dictionary: defaultDictionary,
};

export const FrazesFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const {
    timeComplete,
    description,
    wordsFull,
    speed,
    errorAacceptable,
    dictionary,
    changeLevelDictionary,
    errorLevel,
  } = settings[0];

  const defaultValues: FrazesFormType =
    id === '' && status !== 'copiyed'
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
          dictionary,
          errorLevel,
          changeLevelDictionary,
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
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'dictionary' as never,
    control,
  });

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
          gameName="ФРАЗОСКОП"
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          status={status}
          createCopy={createCopy}
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

          <Grid item xs={12}>
            <Controller
              name="wordsFull"
              render={({ field: { value, onChange, ref } }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        title={value ? 'Писать слова полностью' : 'Первые две буквы'}
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    }
                    label={value ? 'Писать слова полностью' : 'Первые две буквы'}
                  />
                </FormGroup>
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="changeLevelDictionary"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во уровней для словаря"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.changeLevelDictionary?.message}
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
              name="errorLevel"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во ошибок на уровне"
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.errorLevel?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button onClick={() => append({ easy: '', normal: '', hard: '' })}>
                <AddIcon />
              </Button>
            </Box>

            {fields.map((field, index) => (
              <Box key={field.id} display="flex" alignItems="center" mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={4}>
                    <Controller
                      control={control}
                      name={`dictionary.${index}.easy` as const}
                      render={({ field: { value, onChange, ref } }) => (
                        <TextFieldCustom
                          type="text"
                          label={`Уровень ${index + 1}`}
                          size="small"
                          fullWidth
                          inputProps={{ type: 'text' }}
                          error={errors.dictionary?.[index]?.easy?.message}
                          onChange={event => onChange(convertEmptyStringToNull(event))}
                          value={value}
                          ref={ref}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Controller
                      control={control}
                      name={`dictionary.${index}.normal` as const}
                      render={({ field: { value, onChange, ref } }) => (
                        <TextFieldCustom
                          type="text"
                          label={`Уровень ${index + 1}`}
                          size="small"
                          fullWidth
                          inputProps={{ type: 'text' }}
                          error={errors.dictionary?.[index]?.normal?.message}
                          onChange={event => onChange(convertEmptyStringToNull(event))}
                          value={value}
                          ref={ref}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Controller
                      control={control}
                      name={`dictionary.${index}.hard` as const}
                      render={({ field: { value, onChange, ref } }) => (
                        <TextFieldCustom
                          type="text"
                          label={`Уровень ${index + 1}`}
                          size="small"
                          fullWidth
                          inputProps={{ type: 'text' }}
                          error={errors.dictionary?.[index]?.hard?.message}
                          onChange={event => onChange(convertEmptyStringToNull(event))}
                          value={value}
                          ref={ref}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Button onClick={() => remove(index)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
