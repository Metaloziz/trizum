import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import OlympiadsListPage from 'components/olympiads-list-page/OlympiadsListPage';
import Custom404 from 'pages/404.page';

const OlympiadsList: FC = observer(() => {
  const { role } = appStore;
  switch (role) {
    case Roles.Student:
      return <OlympiadsListPage />;
    default:
      return <Custom404 />;
  }
});

export default OlympiadsList;
