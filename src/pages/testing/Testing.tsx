import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';

import { observer } from 'mobx-react-lite';
import { TestsList } from 'pages/testing/TestsList/TestsList';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export const Testing: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
    case Roles.Admin:
      return <TestsList />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});
