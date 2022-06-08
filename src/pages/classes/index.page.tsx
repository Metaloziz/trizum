import React from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import StudentsPage from '@components/page-your-classes/StudentsPage';
import Custom404 from '@pages/404.page';

const YourClasses = () => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.Admin:
      return <div>classes</div>;
    case Roles.Student:
    case Roles.TeacherEducation:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
  return (
    <>
      <StudentsPage />
    </>
  );
};

export default YourClasses;
