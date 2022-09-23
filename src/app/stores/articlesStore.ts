import { makeAutoObservable, runInAction } from 'mobx';

import { StatusTypes } from 'app/enums/StatusTypes';
import { articlesService } from 'app/services/articlesService';
import { ArticleT } from 'app/types/ArticleT';
import { executeError } from 'utils/executeError';
import { findDescription } from 'utils/findDescription';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { SearchParams } from 'app/types/SearchParams';
import { OneTestBodyT } from 'app/types/TestsT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';

type ArticleStoreType = ArticleT & { description: ArticleDescriptionType };
export type ArticlesStoreType = Omit<ArticleStoreType, 'test'> & { test: string };

class ArticlesStore {
  articles: ArticlesStoreType[] = [
    {
      id: '1',
      title: 'default',
      description: { type: '', text: '' },
      content: [{ text: '' }],
      test: '',
      status: StatusTypes.draft,
      createdAt: new TimeZoneType(),
      forFranchisee: true,
      forFranchiseeAdmin: true,
      forMethodist: true,
      forStudents: true,
      forTeachers: true,
      forTeachersEducation: true,
      forTutor: true,
    },
  ];

  page = 0;

  perPage = 10;

  total = 1;

  isSuccessPost: boolean | null = null;

  article: ArticleStoreType = {
    id: '1',
    title: 'default',
    content: [{ text: '' }],
    description: { type: '', text: '' }, // not from API
    test: new OneTestBodyT(),
    status: StatusTypes.draft,
    createdAt: new TimeZoneType(),
    forFranchisee: true,
    forFranchiseeAdmin: true,
    forMethodist: true,
    forStudents: true,
    forTeachers: true,
    forTeachersEducation: true,
    forTutor: true,
  };

  isLoading: boolean = false;

  private searchArticlesParams: SearchParams = {
    page: 0,
    perPage: 10,
  };

  constructor() {
    makeAutoObservable(this);
  }

  getArticles = () => {
    executeError(async () => {
      const result = await articlesService.getArticles(this.searchArticlesParams);

      runInAction(() => {
        this.articles = result.items.map(article => ({
          ...article,
          description: findDescription(article.content),
        }));
        this.page = result.page;
        this.perPage = result.perPage;
        this.total = result.total;
      });
    }, this);
  };

  setSearchArticlesParams = (params: SearchParams) => {
    runInAction(() => {
      this.searchArticlesParams = { ...this.searchArticlesParams, ...params };
    });
  };

  getCurrentArticle = (articleId: string) => {
    executeError(async () => {
      const result = await articlesService.getArticle(articleId);

      runInAction(() => {
        const description = findDescription(result.content);

        this.article = { ...result, description };
      });
    }, this);
  };

  postArticle = (newArticle: ArticlePayloadT) => {
    executeError(async () => {
      const result = await articlesService.postArticle(newArticle);

      if (result?.id) {
        this.getCurrentArticle(result.id);
      }
      runInAction(() => {
        this.isSuccessPost = !!result?.id;
      });
    }, this);
  };

  editArticle = (articleId: string, newArticle: Partial<ArticlePayloadT>) => {
    executeError(async () => {
      const result = await articlesService.editArticle(articleId, newArticle);

      runInAction(() => {
        const description = findDescription(result.content);
        this.article = { ...result, description };
      });
    }, this);
  };

  deleteArticle = (articleId: string) => {
    executeError(async () => {
      const result1 = await articlesService.editArticle(articleId, { status: 'removal' });

      if (result1?.id) {
        const result = await articlesService.deleteArticle(articleId);

        if (result.result) {
          runInAction(() => {
            this.articles = this.articles.filter(article => article.id !== articleId);
          });
        }
      }
    }, this);
  };

  setDefaultIsSuccessPost = () => {
    runInAction(() => {
      this.isSuccessPost = null;
    });
  };

  get getArticle() {
    return this.article;
  }
}
export default new ArticlesStore();
