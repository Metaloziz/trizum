import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import ReportPage from 'components/report-page';

const Report: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Franchisee:
    case Roles.Admin:
      return <ReportPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Report;
