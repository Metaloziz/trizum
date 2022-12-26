import { Roles } from 'app/enums/Roles';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from '../../app/stores/appStore';
import { CurrentHomeWork } from './CurrentHomeWork/CurrentHomeWork';

export const HomeWorkStatistics = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
    case Roles.Student:
      return <CurrentHomeWork />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});
export default HomeWorkStatistics;
