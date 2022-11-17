import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { ArticleEditorForm } from 'components/article-editor/ArticleEditorForm/ArticleEditorForm';
import { Loader } from 'components/loader/Loader';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertTestOptions } from 'utils/convertTestOptions';

export const ArticleEditor = observer(() => {
  const { tests, setTests, setSearchParams } = testsStore;
  const {
    postArticle,
    successPost,
    article,
    setDefaultIsSuccessPost,
    defaultValues,
    editArticle,
    articleId,
  } = articlesStore;

  const testOptions = convertTestOptions(tests);

  useEffect(() => {
    setSearchParams({ per_page: 1000 });
    setDefaultIsSuccessPost();
    setTests();
  }, []);

  const navigate = useNavigate();

  const onReadTheoryClick = (): void => {
    navigate(`${AppRoutes.Blog}/${articleId}`);
  };

  const onSubmit = (data: ArticlePayloadT) => {
    if (article?.id) {
      editArticle(article.id, data);
    } else {
      postArticle(data);
    }
  };

  if (!defaultValues) {
    return <Loader />;
  }

  return (
    <ArticleEditorForm
      onReadTheoryClick={onReadTheoryClick}
      successPost={successPost}
      testOptions={testOptions}
      defaultValues={defaultValues}
      titleArticle={article?.id ? 'Редактирование статьи' : 'Добавление статьи'}
      onSubmitForm={onSubmit}
      statusArticle={defaultValues.status}
    />
  );
});
