import { AppRoutes } from 'app/enums/AppRoutes';
import testsStore from 'app/stores/testsStore';
import { Loader } from 'components/loader/Loader';
import {
  TestFormEditor,
  TestInputType,
} from 'components/test-editor/test-form-editor/TestFormEditor';
import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TestEditor = (): ReactElement => {
  const { editTest, postTest, setIsSuccessPost, currentTest, defaultValues, successPost } =
    testsStore;

  const navigate = useNavigate();

  const onSubmit = (data: TestInputType) => {
    if (currentTest?.test.id) {
      editTest(currentTest?.test.id, data);
    } else {
      postTest(data);
    }
  };

  const onListTestClick = (): void => {
    navigate(`${AppRoutes.Testing}`);
  };

  useEffect(() => {
    setIsSuccessPost();
  }, []);

  if (!defaultValues) {
    return <Loader />;
  }

  return (
    <TestFormEditor
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      titleTest={currentTest?.test.id ? 'Редактировать тест' : 'Добавить тест'}
      onListTestClick={onListTestClick}
      successPost={successPost}
    />
  );
};
