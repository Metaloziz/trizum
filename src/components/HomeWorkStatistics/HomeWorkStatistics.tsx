import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../app/enums/AppRoutes';
import appStore, { Roles } from '../../app/stores/appStore';
import { CurrentHomeWork } from './CurrentHomeWork/CurrentHomeWork';

export const HomeWorkStatistics = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <CurrentHomeWork />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});
export default HomeWorkStatistics;
