import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import AddTest from 'components/add-test-page/AddTest';
import Custom404 from 'pages/404.page';

const AddTestPage: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
    case Roles.Admin:
      return <AddTest />;
    default:
      return <Custom404 />;
  }
});

export default AddTestPage;
