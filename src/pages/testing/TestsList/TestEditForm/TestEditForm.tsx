import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import testsStore from 'app/stores/testsStore';
import { OneTestBodyT, TestPayloadT, OneTestT, TestContentT } from 'app/types/TestsT';
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
import { StatusTypes } from '../../../../app/enums/StatusTypes';
import { Loader } from '../../../../components/loader/Loader';
import { QuestionForm, QuestionFormData } from './QuestionForm/QuestionForm';
import style from './TestEditForm.module.scss';

type TestInputType = Pick<OneTestBodyT, 'title' | 'maxResult'>;

type Props = {
  changeVisibility: (value: boolean) => void;
  postTest: typeof testsStore.postTest;
  isSuccessPost: typeof testsStore.isSuccessPost;
  setIsSuccessPost: typeof testsStore.setIsSuccessPost;
  setTests: typeof testsStore.setTests;
  testData?: OneTestT;
  editTest?: typeof testsStore.editTest;
  isLoading?: boolean;
};

export const TestEditForm: FC<Props> = ({
  changeVisibility,
  postTest,
  isSuccessPost,
  setIsSuccessPost,
  setTests,
  testData,
  isLoading,
  editTest,
}) => {
  console.log('testData', [testData]); // todo draft

  useEffect(() => {
    if (isSuccessPost) {
      setTests();
      changeVisibility(false);
      setIsSuccessPost(null);
    }
  }, [isSuccessPost]);

  const [isShowTestModal, setIsShowTestModal] = useState(false);
  const [questions, setQuestions] = useState<QuestionFormData[]>([]);

  const defaultValues: TestPayloadT = {
    title: testData?.test.title || '',
    status: testData?.test.status || StatusTypes.draft,
    maxResult: MAX_TEST_RESULT,
    content: testData?.test.content || [new TestContentT()],
  };

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
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<TestInputType>({ resolver: yupResolver(schema), defaultValues });

  useEffect(() => {
    if (testData) {
      // eslint-disable-next-line guard-for-in
      for (const key in testData.test) {
        // @ts-ignore
        setValue(key, testData.test[key]);
      }

      setQuestions(
        testData.test.content.map(el => ({
          correctAnswer: el.correctAnswer,
          question: el.question,
          wrongAnswer1: el.answers[0],
          wrongAnswer2: el.answers[1],
          wrongAnswer3: el.answers[2] || '',
          wrongAnswer4: el.answers[3] || '',
          wrongAnswer5: el.answers[4] || '',
        })),
      );
    }
  }, [testData]);

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

    if (testData && editTest) {
      editTest(testData.test.id, newTestPayload);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={style.container}>
      {testData ? <h2>Редактировать тест</h2> : <h2>Добавить тест</h2>}
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
