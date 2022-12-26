import React, { ReactElement, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { BASE_DEFAULT_VALUES } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  GameDifferenceFormType,
  FormSettingsType,
  GameFindWordFormType,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';

import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { GAME_FIND_WORD_SCHEMA } from './game-form-schema';

import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';

import { BaseFormGameSettings } from './BaseFormGameSettings';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultWords } from '../../../../games/games/findWords/assets';

const DEFAULT_VALUES: GameFindWordFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 120,
  words: defaultWords,
};

export const GameSearchWordFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset, createCopy } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { timeComplete, description, words } = settings[0];

  const defaultValues: GameFindWordFormType =
    id === '' && status !== 'copiyed'
      ? DEFAULT_VALUES
      : ({ name, level, status, timeComplete, description, words } as GameFindWordFormType);

  const methods = useForm<GameDifferenceFormType>({
    resolver: yupResolver(GAME_FIND_WORD_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'words' as never,
    control,
  });

  const onSubmit = handleSubmit(values => onFormSubmit(values));

  useEffect(() => {
    if (status === 'copiyed') {
      reset({ ...defaultValues, status: 'draft' });
    }
  }, [status]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="ИГРА СЛОВА"
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
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button onClick={() => append('')}>
                <AddIcon />
              </Button>
            </Box>
            {fields.map((field, index) => (
              <Box key={field.id} display="flex" alignItems="center" mb={2}>
                <Controller
                  control={control}
                  name={`words.${index}` as const}
                  render={({ field: { value, onChange, ref } }) => (
                    <TextFieldCustom
                      type="text"
                      label={`Слово ${index + 1}`}
                      size="small"
                      fullWidth
                      inputProps={{ type: 'text' }}
                      error={errors.words?.[index]?.message}
                      onChange={event => onChange(convertEmptyStringToNull(event))}
                      value={convertNullToEmptyString(value!)}
                      ref={ref}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <Button onClick={() => remove(index)}>
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            ))}
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
