import { OneTestBodyT } from 'app/types/TestsT';
import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import resultPic from '../../assets/images/result-pic.jpg';

import styles from './TestResultPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import testsStore from 'app/stores/testsStore';
import exclude from 'assets/svgs/exclude.svg';
import Image from 'components/image/Image';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { ResultTestMessage } from 'components/test-result-page/ResultMessage/ResultTestMessage';

const ResultMessage = () => <p>Рекомендуем повторить теорию и опробовать еще раз</p>;

const TestResultPage: FC = observer(() => {
  const { result, currentTest, resetResult } = testsStore;

  useEffect(() => () => resetResult(), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerItem}>
        <div>
          <h1>{currentTest?.test.title}</h1>
        </div>
        <div className={styles.itemBlock}>
          <div className={styles.itemPic}>
            <Image src={resultPic} width="300px" height="300px" alt="Images" />
          </div>
          <div className={styles.itemText}>
            <h2>Результат тестирования</h2>
            <div className={styles.resultBlock}>
              {/* <div className={styles.attempt}> */}
              {/*  <p>Попыток:</p> */}
              {/*  <span>8 из 10</span> */}
              {/* </div> */}
              <div className={styles.resultInfo}>
                {/* <p>Ваш результат:</p> */}
                <ResultTestMessage
                  result={result}
                  currentTest={
                    currentTest || {
                      test: new OneTestBodyT(),
                      usedInWorks: [],
                    }
                  }
                />
              </div>
            </div>
            <div className={styles.recommendations}>
              <div className={styles.reqPic}>
                <Image src={exclude} width="34px" height="34px" alt="Exclude" />
              </div>
              <ResultMessage />
            </div>
            <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestResultPage;
