import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import TestPage from 'components/test-page';
import Custom404 from 'pages/404.page';
import { Login } from 'pages/login/Login';

const Test: FC = observer(() => {
  switch (appStore.role) {
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
