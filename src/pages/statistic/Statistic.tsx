import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import Results from 'components/results/Results';

type Props = Record<string, unknown>;

const Statistic: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <Results />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Statistic;
