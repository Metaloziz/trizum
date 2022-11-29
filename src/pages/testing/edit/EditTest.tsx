import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import testsStore from 'app/stores/testsStore';
import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import { TestEditor } from 'components/test-editor/TestEditor';
import { observer } from 'mobx-react-lite';
import Custom404 from 'pages/404.page';
import React, { ReactElement, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const EditTest = observer((): ReactElement => {
  const { role } = appStore;
  const { id } = useParams<'id'>();
  const {
    setCurrentTestToNull,
    setIsSuccessPost,
    setOneTest,
    currentTest,
    isLoading,
    setDefaultValues,
  } = testsStore;

  useEffect(() => {
    if (id && id !== 'new-test') {
      setDefaultValues(null);
      setOneTest(id);
    }
    setIsSuccessPost();
  }, []);

  if (id === 'new-test') {
    setDefaultValues(null);
    setDefaultValues();
    setCurrentTestToNull();
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!currentTest && !isLoading && id !== 'new-test') {
    return <Custom404 />;
  }

  switch (role) {
    case Roles.Methodist:
    case Roles.Admin:
      return <TestEditor />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});
