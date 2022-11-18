import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import UsersPage from 'components/users-page/UsersPage';

const Users: FC = observer(() => {
  switch (appStore.role) {
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Tutor:
      return <UsersPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Users;
