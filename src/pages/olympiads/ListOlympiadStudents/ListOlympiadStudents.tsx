import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import OlympiadsListPage from 'components/olympiads-list-page/OlympiadsListPage';
import Custom404 from 'pages/404.page';
import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ListOlympiadStudents = (): ReactElement => {
  const { role } = appStore;
  const { groupId } = useParams<'groupId'>();
  const { getOneGroup } = groupStore;

  useEffect(() => {
    if (groupId) {
      getOneGroup(groupId);
    }
  }, []);

  switch (role) {
    case Roles.Student:
    case Roles.Methodist:
    case Roles.Admin:
      return <OlympiadsListPage />;
    default:
      return <Custom404 />;
  }
};
