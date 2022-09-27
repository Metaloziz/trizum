import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/button/Button';
import * as yup from 'yup';
import {
  MAX_TEST_QUESTION_LENGTH,
  MAX_VARIANTS_ANSWERS_TEST,
  MIN_NAMES_LENGTH,
  MIN_VARIANTS_ANSWER_COUNT,
} from 'constants/constants';
import style from './QuestionForm.module.scss';
import { Button as EditButton } from '@mui/material';

export class QuestionFormData {
  question: string = 'Вопрос';

  correctAnswer: string = 'Правильный ответ';

  wrongAnswer1: string = 'Не правильный ответ';

  [key: string]: string;
}

type Props = {
  getQuestionFormData: (data: QuestionFormData) => void;
};

export const QuestionForm: FC<Props> = ({ getQuestionFormData }) => {
  const [answersCount, setAnswersCount] = useState(MIN_VARIANTS_ANSWER_COUNT);
  const [answers, setAnswers] = useState(new QuestionFormData());

  const inputRules = yup
    .string()
    .required('Обязательное поле')
    .max(MAX_TEST_QUESTION_LENGTH, `максимальная длинна ${MAX_TEST_QUESTION_LENGTH} символов`)
    .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

  const schema = yup.object().shape({
    question: inputRules,
    correctAnswer: inputRules,
    wrongAnswer1: inputRules,
    wrongAnswer2: inputRules.notRequired(),
    wrongAnswer3: inputRules.notRequired(),
    wrongAnswer4: inputRules.notRequired(),
    wrongAnswer5: inputRules.notRequired(),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<QuestionFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(values => {
    getQuestionFormData(values);
    setAnswers(new QuestionFormData());
    setAnswersCount(MIN_VARIANTS_ANSWER_COUNT);
    reset();
  });

  const addAnswer = () => {
    if (answersCount < MAX_VARIANTS_ANSWERS_TEST) {
      answers[`answer${answersCount}`] = 'Не правильный ответ';
      setAnswers(answers);
      setAnswersCount(answersCount + 1);
    }
  };

  return (
    <div className={style.container}>
      <h2>Добавить вопрос</h2>
      <form>
        {Object.keys(answers).map(el => (
          <TextField
            {...register(el)}
            key={el}
            helperText={errors[el]?.message}
            error={!!errors[el]}
            label={answers[el]}
          />
        ))}
        <EditButton onClick={addAnswer}> Добавить вариант ответа</EditButton>
        <Button onClick={onSubmit}>Добавить</Button>
      </form>
    </div>
  );
};
