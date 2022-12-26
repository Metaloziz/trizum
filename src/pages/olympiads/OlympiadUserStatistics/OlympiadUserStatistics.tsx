import { Roles } from 'app/enums/Roles';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import groupStore from 'app/stores/groupStore';
import { CurrentHomeWork } from 'components/HomeWorkStatistics/CurrentHomeWork/CurrentHomeWork';
import Custom404 from 'pages/404.page';
import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OlympiadUserStatistics = (): ReactElement => {
  const { role } = appStore;
  const { groupId, studentId } = useParams<'groupId' | SecondaryRoutes.StudentId>();
  const { getOneGroup } = groupStore;
  const { getPlayResultForCurrentHomeWork } = gamesStore;

  useEffect(() => {
    if (groupId) {
      getOneGroup(groupId);
    }
    if (studentId) {
      getPlayResultForCurrentHomeWork(studentId, groupId);
    }
  }, []);

  switch (role) {
    case Roles.Student:
    case Roles.Methodist:
    case Roles.Admin:
      return <CurrentHomeWork />;
    default:
      return <Custom404 />;
  }
};
