import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import TariffPage from 'components/tariff-page/TariffPage';
import Custom404 from 'pages/404.page';

const AddPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
      return <TariffPage />;
    default:
      return <Custom404 />;
  }
});

export default AddPage;
