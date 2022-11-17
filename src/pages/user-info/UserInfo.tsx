import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import UserPage from 'components/user-page';

type Props = Record<string, unknown>;

const UserInfo: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Methodist:
    case Roles.Tutor:
      return <UserPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default UserInfo;
