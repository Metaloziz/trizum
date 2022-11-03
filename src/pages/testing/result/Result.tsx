import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import teacherEducationStore from 'app/stores/TeacherEducationStore';
import TestResultPage from 'components/test-result-page/TestResultPage';
import Custom404 from 'pages/404.page';

const Result: FC = observer(() => {
  const { test } = teacherEducationStore;
  // TODO: проверка если теста нет, то запрос за ним
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Student:
      return <TestResultPage />;
    default:
      return <Custom404 />;
  }
});
export default Result;
