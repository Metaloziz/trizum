import { Roles } from 'app/enums/Roles';
import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import AddOlympiad from 'components/add-olympiad/AddOlympiad';

const Olympiads: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
    case Roles.Student:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.TeacherEducation:
    case Roles.Parent:
    case Roles.Teacher:
    case Roles.Tutor:
      return <AddOlympiad />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Olympiads;
