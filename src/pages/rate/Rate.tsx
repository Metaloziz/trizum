import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import { Navigate } from 'react-router-dom';
import RatePage from 'components/rate/RatePage';

const Rate: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
      return <RatePage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Rate;
