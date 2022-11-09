import { Roles } from 'app/enums/Roles';
import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import BlogPage from 'components/blog-page/BlogPage';

type Props = Record<string, unknown>;

const Blog: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Student:
      return <BlogPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Blog;
