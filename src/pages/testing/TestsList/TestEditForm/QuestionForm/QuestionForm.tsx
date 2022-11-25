import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button as EditButton, Grid, Dialog, DialogContent } from '@mui/material';
import Button from 'components/button/Button';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { MAX_TEST_QUESTION_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import React, { FC, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

const INPUT_RULES = yup
  .string()
  .required('Обязательное поле')
  .max(MAX_TEST_QUESTION_LENGTH, `максимальная длинна ${MAX_TEST_QUESTION_LENGTH} символов`)
  .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

export const SCHEMA_QUESTION_FORM = yup.object().shape({
  question: INPUT_RULES,
  correctAnswer: INPUT_RULES,
  answers: yup.array(INPUT_RULES).min(1).max(5),
});

export class QuestionFormData {
  question: string = 'Вопрос';

  correctAnswer: string = 'Правильный ответ';

  answers: string[] = [];

  id?: string;
}

type Props = {
  getQuestionFormData: (data: QuestionFormData, questionId?: string) => void;
  defaultValues: QuestionFormData;
  closeModal: () => void;
};

export const QuestionForm: FC<Props> = props => {
  const { getQuestionFormData, defaultValues, closeModal } = props;
  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: yupResolver(SCHEMA_QUESTION_FORM),
    defaultValues,
  });

  const { fields, append, remove, insert } = useFieldArray({
    name: `answers` as never,
    control,
  });

  const onSubmit = handleSubmit(values => {
    getQuestionFormData(values, defaultValues.id);
    reset();
    insert(0, ['']);

    if (defaultValues.id) {
      closeModal();
    }
  });

  useEffect(() => {
    if (!defaultValues.id) {
      insert(0, ['']);
    }
  }, []);

  return (
    <Dialog maxWidth="lg" fullWidth onClose={closeModal} open>
      <DialogTitle onClose={closeModal}>
        {defaultValues.id ? 'Изменить вопрос' : 'Добавить вопрос'}
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid direction="row" container spacing={2} marginTop={1} marginBottom={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                control={control}
                name="question"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    type="text"
                    label="Вопрос"
                    size="small"
                    fullWidth
                    inputProps={{ type: 'text' }}
                    error={errors?.question?.message}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid direction="row" container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="correctAnswer"
                    render={({ field: { value, onChange, ref } }) => (
                      <TextFieldCustom
                        type="text"
                        label="Правильный ответ"
                        size="small"
                        fullWidth
                        error={errors.correctAnswer?.message}
                        onChange={event => {
                          setValue('correctAnswer', event.target.value);
                          onChange(event);
                        }}
                        value={value}
                        ref={ref}
                      />
                    )}
                  />
                </Grid>
                {fields.map((field, index) => {
                  if (index === 0) {
                    return (
                      <Grid key={field.id} item xs={12} sm={6}>
                        <Controller
                          control={control}
                          name={`answers.${index}`}
                          render={({ field: { value, onChange, ref } }) => (
                            <TextFieldCustom
                              type="text"
                              label="Не правильный ответ"
                              size="small"
                              fullWidth
                              error={errors.answers && errors.answers[index]?.message}
                              onChange={onChange}
                              value={value}
                              ref={ref}
                            />
                          )}
                        />
                      </Grid>
                    );
                  }
                  return (
                    <Grid key={field.id} item xs={12} sm={6}>
                      <Box display="flex" alignItems="flex-start">
                        <Controller
                          control={control}
                          name={`answers.${index}`}
                          render={({ field: { value, onChange, ref } }) => (
                            <TextFieldCustom
                              type="text"
                              label="Не правильный ответ"
                              size="small"
                              fullWidth
                              inputProps={{ type: 'text' }}
                              error={errors.answers && errors.answers[index]?.message}
                              onChange={onChange}
                              value={value}
                              ref={ref}
                            />
                          )}
                        />
                        <EditButton color="error" onClick={() => remove(index)}>
                          <DeleteIcon fontSize="large" />
                        </EditButton>
                      </Box>
                    </Grid>
                  );
                })}

                <Grid item xs={12} sm={6} marginBottom={2}>
                  {fields.length < 5 && (
                    <EditButton
                      disabled={watch('answers')[0]?.length === 0}
                      onClick={() => append('')}
                    >
                      Добавить вариант ответа
                    </EditButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button onClick={onSubmit}>{defaultValues.id ? 'Изменить' : 'Добавить'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
