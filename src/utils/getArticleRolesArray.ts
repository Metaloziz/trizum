import { RolesNameArticle } from 'app/enums/RoleNames';
import { ArticleT } from 'app/types/ArticleT';
import { Nullable } from 'app/types/Nullable';

const rolesFromBack = [
  'forFranchisee',
  'forFranchiseeAdmin',
  'forMethodist',
  'forStudents',
  'forTeachers',
  'forTeachersEducation',
  'forTutor',
];
export const getArticleRolesArray = (result: ArticleT) => {
  const roles: Nullable<string[]> = [];

  for (const [key, value] of Object.entries(result)) {
    if (rolesFromBack.includes(key) && value) {
      roles.push(RolesNameArticle[key]);
    }
  }

  if (roles.length === 0) {
    return null;
  }
  return roles;
};
