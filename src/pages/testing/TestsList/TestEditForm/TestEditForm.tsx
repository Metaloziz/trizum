import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import testsStore from 'app/stores/testsStore';
import { OneTestBodyT, TestPayloadT } from 'app/types/TestsT';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import {
  MAX_NAMES_LENGTH,
  MAX_TEST_RESULT,
  MIN_NAMES_LENGTH,
  MIN_QUESTIONS_TEST,
} from 'constants/constants';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mixElements } from 'utils/mixElements';
import * as yup from 'yup';
import { QuestionForm, QuestionFormData } from './QuestionForm/QuestionForm';
import style from './TestEditForm.module.scss';

type TestInputType = Pick<OneTestBodyT, 'title' | 'maxResult'>;

type Props = {
  changeVisibility: (value: boolean) => void;
  postTest: typeof testsStore.postTest;
  isSuccessPost: typeof testsStore.isSuccessPost;
  setIsSuccessPost: typeof testsStore.setIsSuccessPost;
  setTests: typeof testsStore.setTests;
};

export const TestEditForm: FC<Props> = ({
  changeVisibility,
  postTest,
  isSuccessPost,
  setIsSuccessPost,
  setTests,
}) => {
  useEffect(() => {
    if (isSuccessPost) {
      setTests();
      changeVisibility(false);
      setIsSuccessPost(null);
    }
  }, [isSuccessPost]);

  const [isShowTestModal, setIsShowTestModal] = useState(false);
  const [questions, setQuestions] = useState<QuestionFormData[]>([]);

  const inputRules = yup
    .string()
    .required('Обязательное поле')
    .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
    .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

  const schema = yup.object().shape({
    title: inputRules,

    maxResult: yup.number().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TestInputType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async ({ maxResult, title }) => {
    const newTestPayload: TestPayloadT = {
      title,
      status: 'active',
      maxResult,
      content: questions.map(({ question, correctAnswer, ...wrongAnswers }) => ({
        correctAnswer,
        question,
        answers: mixElements([...Object.values(wrongAnswers)], correctAnswer),
      })),
    };

    if (newTestPayload.content.length < MIN_QUESTIONS_TEST) {
      setError('maxResult', { message: 'необходимо минимум два вопроса' });
      return;
    }

    postTest(newTestPayload);
  });

  const openQuestionForm = () => {
    clearErrors();
    setIsShowTestModal(true);
  };

  const getQuestionFormData = (data: QuestionFormData) => {
    setQuestions([...questions, data]);
  };

  return (
    <div className={style.container}>
      <h2>Добавить тест</h2>
      <form>
        <div className={style.body}>
          <TextField
            {...register('title')}
            helperText={errors.title?.message}
            error={!!errors?.title}
            label="Заголовок теста"
            fullWidth
          />
          <TextField
            {...register('maxResult')}
            helperText={errors.maxResult?.message}
            error={!!errors?.maxResult}
            label="Максимальный результат"
            value={MAX_TEST_RESULT}
          />

          <div className={style.questions}>
            <h2>Вопросы:</h2>
            {questions.map((el, index) => (
              <div key={Math.random()}>
                {index + 1} ) {el.question}
              </div>
            ))}
          </div>
          <Button size="small" onClick={openQuestionForm}>
            Добавить вопрос
          </Button>
        </div>
        <div>
          <Button onClick={onSubmit}>Сохранить</Button>
        </div>
      </form>
      <BasicModal visibility={isShowTestModal} changeVisibility={setIsShowTestModal}>
        <QuestionForm getQuestionFormData={getQuestionFormData} />
      </BasicModal>
    </div>
  );
};
