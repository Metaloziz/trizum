import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import { ArticleEditor } from 'components/article-editor/ArticleEditor';
import { observer } from 'mobx-react-lite';
import Custom404 from 'pages/404.page';
import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const BlogEditor: FC = observer(() => {
  const { role } = appStore;
  const { getCurrentArticle, setDefaultValues, setDefaultIsSuccessPost, isLoading, article } =
    articlesStore;
  const { id } = useParams<'id'>();

  useEffect(() => {
    if (id && id !== 'new-article') {
      setDefaultValues(null);
      getCurrentArticle(id);
    }
    setDefaultIsSuccessPost();
  }, []);

  if (id === 'new-article') {
    setDefaultValues(null);
    setDefaultValues();
  }

  if (!article && !isLoading && id !== 'new-article') {
    return <Custom404 />;
  }

  switch (role) {
    case Roles.Methodist:
    case Roles.Admin:
      return <ArticleEditor />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default BlogEditor;
