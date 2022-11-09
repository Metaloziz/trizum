import { Roles } from 'app/enums/Roles';
import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';

const Courses: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <>smile :)</>;
    // return <CoursesPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Courses;
