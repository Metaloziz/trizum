import { BASE_URL } from 'constants/constants';
import { ArticleImageType, NewArticleImageType } from 'app/types/ArticleImageType/ArticleImageType';
import image from 'assets/images/teacher.svg';

export const findPictureUrl = (array: any): string => {
  const result: ArticleImageType | undefined = array.find(
    (el: { type: string }) => el?.type === 'picture',
  );

  const newResult: NewArticleImageType | undefined = array.find(
    (el: { type: string }) => el?.type === 'img',
  );

  if (result) {
    return `${BASE_URL}${result.path}`;
  }

  if (newResult) {
    return newResult.url;
  }
  return image;
};
