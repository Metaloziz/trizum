import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import { StatusTypes } from 'app/enums/StatusTypes';
import appStore from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import resultIcon from 'assets/svgs/result-icon.svg';
import Button from 'components/button/Button';
import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import Image from 'components/image/Image';
import Stepper from 'components/step/stepper/Stepper';
import { MixedAnswers } from 'components/test-page/MixedAnswers/MixedAnswers';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './TestPage.module.scss';

const defaultRadioButtonValue = 'null';

const TestPage: FC = observer(() => {
  const {
    isLoading,
    incrementResult,
    postResult,
    getTitleTest,
    questions,
    currentQuestion,
    setCurrentQuestion,
  } = testsStore;

  const { articleId } = useParams<'articleId'>();
  const { article } = articlesStore;
  const { role } = appStore;
  const navigate = useNavigate();

  const [currentRadioValue, setCurrentRadioValue] = useState(defaultRadioButtonValue);

  const [activeStep, setActiveStep] = useState(1);

  const onEndTest = () => {
    navigate(`${AppRoutes.Testing}/result`);
  };

  const checkAnswer = async () => {
    if (currentRadioValue === currentQuestion.correctAnswer) {
      incrementResult();
    }
  };

  const nextStep = async () => {
    await checkAnswer();

    setCurrentRadioValue(defaultRadioButtonValue);

    const newActiveStep = activeStep + 1;

    const newQuestion = questions.find(({ id }) => id === newActiveStep);

    if (newQuestion) {
      setCurrentQuestion(newQuestion);
    } else {
      if (articleId && article?.status === StatusTypes.active && role !== Roles.Admin) {
        postResult(articleId);
      }
      onEndTest();
    }

    setActiveStep(newActiveStep);
  };

  return (
    <div className={styles.wrapperTesting}>
      <LoadingIndicator isLoading={isLoading} />
      <div>
        <h2>{getTitleTest}</h2>
      </div>

      <div className={styles.choiceWrap}>
        <div className={styles.endTest}>
          <Button onClick={onEndTest}>Закончить тест</Button>
        </div>
        <div className={styles.stepStyle}>
          <Stepper countStep={questions.length} activeStepCount={activeStep} />
        </div>
      </div>

      <div className={styles.question}>
        <div className={styles.resultImg}>
          <Image src={resultIcon} width="406px" height="426px" alt="Images" />
        </div>

        <div className={styles.textQuestion}>
          <h3> Вопрос {currentQuestion.id}</h3>
          <p>{currentQuestion.question}</p>

          <div className={styles.answerChoice}>
            <MixedAnswers
              mixedAnswer={currentQuestion.answers}
              setCurrentRadioValue={setCurrentRadioValue}
              currentRadioValue={currentRadioValue}
            />
          </div>

          <div>
            <Button onClick={nextStep}>Ответить</Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestPage;
