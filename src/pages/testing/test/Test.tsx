import { Roles } from 'app/enums/Roles';

import appStore from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import TestPage from 'components/test-page';
import { observer } from 'mobx-react-lite';
import Custom404 from 'pages/404.page';
import { Login } from 'pages/login/Login';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Test: FC = observer(() => {
  const { role } = appStore;
  const { setOneTest, currentTest, setCurrentTestToNull } = testsStore;
  const { getCurrentArticle, article, isLoading } = articlesStore;
  const { testId, articleId } = useParams<'testId' | 'articleId'>();

  useEffect(() => {
    setCurrentTestToNull();
    if (testId) {
      setOneTest(testId);
    }
    if (articleId) {
      getCurrentArticle(articleId);
    }
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (article === null || currentTest === null) {
    return <Custom404 />;
  }

  switch (role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Student:
      return <TestPage />;
    case Roles.Unauthorized:
      return <Login />;
    default:
      return <Custom404 />;
  }
});
export default Test;
