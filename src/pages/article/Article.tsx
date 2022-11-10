import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import { ArticleFromEditor } from 'components/blog-page/ArticleFromEditor/ArticleFromEditor';
import React, { ReactElement, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const Article = (): ReactElement => {
  const { getCurrentArticle } = articlesStore;
  const { id } = useParams<'id'>();
  useEffect(() => {
    if (id) {
      getCurrentArticle(id);
    }
  }, []);

  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Student:
      return <ArticleFromEditor />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
};
