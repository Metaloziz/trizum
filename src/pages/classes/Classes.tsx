import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ClassesMainPage } from 'components/classes-page/ClassesMainPage';
import { ClassesMethodistPage } from 'components/classes-page/ClassesStudents/ClassesStudentsContainer/ClassesMethodistPage';

const Classes = observer(() => {
  switch (appStore.role) {
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
      return <ClassesMainPage />;
    case Roles.Methodist:
    case Roles.Teacher:
      return <ClassesMethodistPage />;

    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Classes;
