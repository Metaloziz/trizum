import { StatusTypes } from 'app/enums/StatusTypes';
import { articlesService } from 'app/services/articlesService';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { ArticleT } from 'app/types/ArticleT';
import { Nullable } from 'app/types/Nullable';
import { SearchParams } from 'app/types/SearchParams';
import { TimeZoneType } from 'app/types/TimeZoneType';

import { ArticleFormT } from 'components/article-editor/ArticleEditorForm/ArticleEditorForm';
import { MyParagraphElement } from 'components/PlateEditor/types';
import { makeAutoObservable, runInAction } from 'mobx';
import { executeError } from 'utils/executeError';
import { deleteDescription, findDescription } from 'utils/findDescription';
import { getArticleRolesArray } from 'utils/getArticleRolesArray';

type ArticleStoreType = ArticleT & { description: string };
export type ArticlesStoreType = Omit<ArticleStoreType, 'test'> & { test: string };

class ArticlesStore {
  articles: ArticlesStoreType[] = [
    {
      id: '1',
      title: 'default',
      description: '',
      content: [],
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

  successPost: Nullable<string> = null;

  articleId: Nullable<string> = null;

  article: Nullable<ArticleStoreType> = null;
  //   {
  //   id: '1',
  //   title: 'default',
  //   content: [],
  //   description: '', // not from API
  //   test: new OneTestBodyT(),
  //   status: StatusTypes.draft,
  //   createdAt: new TimeZoneType(),
  //   forFranchisee: true,
  //   forFranchiseeAdmin: true,
  //   forMethodist: true,
  //   forStudents: true,
  //   forTeachers: true,
  //   forTeachersEducation: true,
  //   forTutor: true,
  // };

  defaultValues: Nullable<ArticleFormT> = null;

  private newArticleValues: ArticleFormT = {
    roles: ['null'],
    description: '',
    title: '',
    testId: null,
    status: StatusTypes.draft,
    content: [{ type: 'p', children: [{ text: '' }] } as MyParagraphElement],
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
      const { content, status, title, test } = result;
      const roles: Nullable<string[]> = getArticleRolesArray(result);

      runInAction(() => {
        if (title) {
          const articleDescription = findDescription(content);
          const newContent = deleteDescription(content);

          this.defaultValues = {
            title,
            roles,
            status,
            content: newContent,
            description: articleDescription,
            testId: test ? test.id : null,
          };

          this.article = { ...result, description: articleDescription, content: newContent };
        }
      });
    }, this);
  };

  postArticle = (newArticle: ArticlePayloadT) => {
    executeError(async () => {
      const result = await articlesService.postArticle(newArticle);

      if (result?.id) {
        this.setArticleId(result.id);
      }
      runInAction(() => {
        this.successPost = 'Cтатья создана';
      });
    }, this);
  };

  editArticle = (articleId: string, newArticle: Partial<ArticlePayloadT>) => {
    executeError(async () => {
      const result = await articlesService.editArticle(articleId, newArticle);
      if (result?.id) {
        this.setArticleId(result.id);
      }
      runInAction(() => {
        this.successPost = 'Cтатья отредактирована';
      });
    }, this);
  };

  deleteArticle = (articleId: string) => {
    executeError(async () => {
      await articlesService.editArticle(articleId, { status: 'removal' });
      await this.getArticles();
    }, this);
  };

  setDefaultIsSuccessPost = (isSuccessPost: string | null = null) => {
    runInAction(() => {
      this.successPost = isSuccessPost;
    });
  };

  setNullArticle = () => {
    this.article = null;
  };

  setDefaultValues = (defaultValues: Nullable<ArticleFormT> = this.newArticleValues) => {
    this.defaultValues = defaultValues;
  };

  setArticleId = (id: Nullable<string> = null) => {
    this.articleId = id;
  };
}
export default new ArticlesStore();
