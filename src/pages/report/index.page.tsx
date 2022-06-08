import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

const IndexPage: FC = () => {
  switch (appStore.role) {
    case Roles.Franchisee:
    case Roles.Admin:
      return <div>report</div>;
    default:
      return <Custom404 />;
  }
};

export default IndexPage;
