import { StatusTypes } from 'app/enums/StatusTypes';
import { articlesService } from 'app/services/articlesService';
import { testsService } from 'app/services/testsService';
import { Nullable } from 'app/types/Nullable';
import { StatusT } from 'app/types/StatusT';
import { ContentIDT, OneTestT, PreviewTestT, TestPayloadT } from 'app/types/TestsT';
import { FIRST_ARRAY_ITEM, MAX_TEST_RESULT } from 'constants/constants';
import { makeAutoObservable, runInAction } from 'mobx';
import { addIdElements } from 'utils/addIdElements';
import { executeError } from 'utils/executeError';
import { mixElements } from 'utils/mixElements';

export type TestSearchParams = Partial<{
  status?: Nullable<StatusT>;
  page: number;
  per_page: number;
}>;

class TestsStore {
  tests: PreviewTestT[] = [
    {
      id: '1',
      title: 'draft',
      status: StatusTypes.draft,
      createdAt: { date: '', timezone_type: 0, timezone: '' },
    },
  ];

  total = 1;

  page = 0;

  perPage = 5;

  result: number = 0;

  currentTest: Nullable<OneTestT> = null;

  questions: ContentIDT[] = [];

  currentQuestion: ContentIDT = {
    id: 1,
    question: 'default',
    answers: ['default'],
    correctAnswer: 'default',
  };

  isLoading = false;

  isSuccessPost: boolean | null = null;

  successPost: Nullable<string> = null;

  private searchParams: TestSearchParams = {
    per_page: 5,
    status: null,
    page: 0,
  };

  private newTest: TestPayloadT = {
    title: '',
    status: StatusTypes.draft,
    maxResult: MAX_TEST_RESULT,
    content: [],
  };

  defaultValues: Nullable<TestPayloadT> = null;

  constructor() {
    makeAutoObservable(this);
  }

  setOneTest = async (testId: string) => {
    executeError(async () => {
      const result = await testsService.getOneTest(testId);
      const { test } = result;

      runInAction(() => {
        if (test) {
          this.currentTest = result;
          this.defaultValues = test;
          const mixedAnswers = test.content.map(({ question, answers, correctAnswer }) => ({
            question,
            correctAnswer,
            answers: mixElements([...answers], correctAnswer),
          }));

          const newQuestion = addIdElements(mixedAnswers);

          this.questions = newQuestion;
          this.currentQuestion = newQuestion[FIRST_ARRAY_ITEM];
        }
      });
    }, this);
  };

  setTestFromArticle = (articleId: string) => {
    executeError(async () => {
      const { test } = await articlesService.getArticle(articleId);

      runInAction(() => {
        if (test) {
          this.currentTest = { test, usedInWorks: [] };
          const mixedAnswers = test.content.map(({ question, answers, correctAnswer }) => ({
            question,
            correctAnswer,
            answers: mixElements([...answers], correctAnswer),
          }));

          const newQuestion = addIdElements(mixedAnswers);

          this.questions = newQuestion;
          this.currentQuestion = newQuestion[FIRST_ARRAY_ITEM];
        }
      });
    }, this);
  };

  setTests = () => {
    executeError(async () => {
      const res = await testsService.getTests(this.searchParams);

      runInAction(() => {
        this.tests = res.items;
        this.total = res.total;
        this.perPage = res.perPage;
        this.page = res.page;

        this.setSearchParams({ page: res.page, per_page: res.perPage });
      });

      const firstTest = this.tests[FIRST_ARRAY_ITEM];

      await this.setOneTest(firstTest.id);
    }, this);
  };

  setSearchParams = (params: TestSearchParams) => {
    runInAction(() => {
      this.searchParams = { ...this.searchParams, ...params };
    });
  };

  postTest = (test: TestPayloadT) => {
    executeError(async () => {
      const { id } = await testsService.postTest(test);

      runInAction(() => {
        this.setIsSuccessPost(id); // если ID нету значит ошибка
        if (!!id) {
          this.successPost = 'Тест создан';
        }
      });
    }, this);
  };

  editTest = (testId: string, newTestData: Partial<TestPayloadT>) => {
    // todo работает как удаление пока
    executeError(async () => {
      const { id } = await testsService.editTest(testId, newTestData);

      runInAction(() => {
        this.setIsSuccessPost(id); // если ID нету значит ошибка
        if (!!id) {
          this.successPost = 'Тест отредактирован';
        }
      });
    }, this);
  };

  postResult = (articleId: string) => {
    executeError(async () => {
      await testsService.postArticleTestResult({ articleId, result: this.result });
    }, this);
  };

  incrementResult = () => {
    runInAction(() => {
      this.result += 1;
    });
  };

  resetResult = () => {
    runInAction(() => {
      this.result = 0;
    });
  };

  setCurrentQuestion = (question: ContentIDT) => {
    this.currentQuestion = question;
  };

  setIsSuccessPost = (value: Nullable<string> = null) => {
    this.isSuccessPost = value === null ? null : !!value;
    this.successPost = value;
  };

  setDefaultValues = (defaultValues: Nullable<TestPayloadT> = this.newTest) => {
    this.defaultValues = defaultValues;
  };

  setCurrentTestToNull = () => {
    this.currentTest = null;
  };

  get getTitleTest() {
    return this.currentTest?.test?.title;
  }
}

export default new TestsStore();
