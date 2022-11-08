import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import AddNewsPage from 'components/add-news-page';
import Custom404 from 'pages/404.page';

const AddPost: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
    case Roles.Admin:
      return <AddNewsPage />;
    default:
      return <Custom404 />;
  }
});

export default AddPost;
