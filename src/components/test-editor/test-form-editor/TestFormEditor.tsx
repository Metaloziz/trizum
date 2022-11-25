import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';
import { StatusTypes } from 'app/enums/StatusTypes';
import { Nullable } from 'app/types/Nullable';
import { OneTestBodyT, TestContentT, TestPayloadT } from 'app/types/TestsT';
import styles from 'components/article-editor/ArticleEditor.module.scss';
import { ResultMessage } from 'components/article-editor/ResultMessage/ResultMessage';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';

import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { STATUS_MENU } from 'constants/selectMenu';
import {
  QuestionForm,
  QuestionFormData,
  SCHEMA_QUESTION_FORM,
} from 'pages/testing/TestsList/TestEditForm/QuestionForm/QuestionForm';
import style from './TestFormEditor.module.scss';
import React, { ReactElement, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { filterSelectMenu } from 'utils/filterSelectMenu';
import * as yup from 'yup';

type Props = {
  defaultValues: TestPayloadT;
  titleTest: string;
  onSubmit: (data: TestInputType) => void;
  successPost: Nullable<string>;
  onListTestClick: () => void;
};

export type TestInputType = Pick<OneTestBodyT, 'title' | 'maxResult' | 'status'> & {
  content: QuestionFormData[];
};

const INPUT_RULES = yup
  .string()
  .required('Обязательное поле')
  .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
  .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

const SCHEMA_TEST_FORM_EDITOR = yup.object().shape({
  title: INPUT_RULES,
  content: yup
    .array(SCHEMA_QUESTION_FORM)
    .min(2, 'Необходимо минимум два вопроса')
    .required('Обязательное поле'),
  maxResult: yup.number().required('Обязательное поле'),
  status: yup.string(),
});

export const TestFormEditor = (props: Props): ReactElement => {
  const { titleTest, defaultValues, onSubmit, onListTestClick, successPost } = props;

  const [isShowTestModal, setIsShowTestModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Nullable<QuestionFormData>>(null);

  const methods = useForm<TestInputType>({
    resolver: yupResolver(SCHEMA_TEST_FORM_EDITOR),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove, update } = useFieldArray<TestPayloadT>({
    name: 'content' as never,
    control,
  });

  const onSubmitForm = handleSubmit(async data => {
    onSubmit(data);
  });

  const openQuestionForm = (index?: number) => {
    if (index !== undefined) {
      setCurrentQuestion(fields[index]);
    } else {
      setCurrentQuestion(new TestContentT());
    }

    setIsShowTestModal(true);
  };

  const getQuestionFormData = (data: QuestionFormData, questionId?: string) => {
    const index = fields.findIndex(({ id }) => id === questionId);

    if (index !== -1) {
      update(index, data);
    } else {
      append(data);
    }
  };

  const onCloseModal = () => {
    setIsShowTestModal(false);
    setCurrentQuestion(null);
  };

  const menu = filterSelectMenu(defaultValues.status, STATUS_MENU);
  const disabledField = defaultValues.status !== StatusTypes.draft;

  return (
    <>
      <div className={style.container}>
        <h2>{titleTest}</h2>

        <form>
          <Grid direction="row" container spacing={2} marginTop={1} marginBottom={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="title"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    className={styles.input}
                    sx={{ backgroundColor: 'white' }}
                    type="text"
                    label="Заголовок"
                    size="small"
                    fullWidth
                    error={errors.title?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                    disabled={disabledField || !!successPost}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="maxResult"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    className={styles.input}
                    sx={{ backgroundColor: 'white' }}
                    type="text"
                    label="Максимальный результат"
                    size="small"
                    fullWidth
                    error={errors.title?.message}
                    inputProps={{ type: 'number' }}
                    onChange={event => {
                      onChange(Number(event.target.value));
                    }}
                    value={String(value)}
                    ref={ref}
                    disabled={disabledField || !!successPost}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Статус"
                    options={menu}
                    error={errors.status?.message}
                    ref={ref}
                    disabled={!!successPost}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <h2>Вопросы:</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
              {fields.map((field, index) => (
                <Grid
                  key={field.id}
                  direction="row"
                  container
                  marginBottom={1}
                  sx={{
                    backgroundColor: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '3px',
                  }}
                >
                  <Grid item display="flex" alignItems="center" paddingLeft={1} xs={12} sm={10}>
                    {index + 1}. {field.question}
                  </Grid>

                  <Grid item xs={12} sm={2} display="flex" justifyContent="flex-end">
                    <IconButton
                      size="large"
                      onClick={() => openQuestionForm(index)}
                      color="primary"
                      disabled={disabledField || !!successPost}
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                      size="large"
                      onClick={() => remove(index)}
                      color="error"
                      disabled={disabledField || !!successPost}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} sm={12}>
              {errors.content?.message}
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button disabled={disabledField || !!successPost} onClick={() => openQuestionForm()}>
                Добавить вопрос
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} marginBottom={2}>
              {!successPost ? (
                <Button onClick={onSubmitForm}>Сохранить</Button>
              ) : (
                <ResultMessage
                  successPost={successPost}
                  onClick={onListTestClick}
                  titleButton="К списку тестов"
                />
              )}
            </Grid>
          </Grid>
        </form>
      </div>
      {currentQuestion && isShowTestModal && (
        <QuestionForm
          defaultValues={currentQuestion}
          getQuestionFormData={getQuestionFormData}
          closeModal={onCloseModal}
        />
      )}
    </>
  );
};
