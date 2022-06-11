import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import UsersPage from '@components/users-page/UsersPage';
import Custom404 from '@pages/404.page';

const IndexPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Tutor:
      return <UsersPage />;
    default:
      return <Custom404 />;
  }
});

export default IndexPage;