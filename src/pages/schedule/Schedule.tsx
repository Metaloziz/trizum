import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import SchedulePage from 'components/schedule-page/SchedulePage';

type Props = Record<string, unknown>;

const Schedule: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Admin:
    case Roles.Methodist:
      return <SchedulePage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Schedule;
