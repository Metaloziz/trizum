import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import { HomeworkPage } from 'components/homework-page/HomeworkPage';

const Homework: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <HomeworkPage />;
    case Roles.Unauthorized:
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Homework;
