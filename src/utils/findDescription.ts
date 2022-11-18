import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';
import { MyParagraphElement } from 'components/PlateEditor/types';

export const findDescription = (array: any): string => {
  const result: ArticleDescriptionType | undefined = array.find(
    (el: { type: string }) => el?.type === 'description',
  );

  if (result) {
    return result.text;
  }
  return '';
};

export const deleteDescription = (array: any): any => {
  const result: ArticleDescriptionType = array.filter(
    (el: { type: string }) => el?.type !== 'description',
  );
  const find = array.find((el: { type: string }) => el?.type === 'paragraph');
  if (find) {
    return [
      {
        type: 'p',
        children: [{ text: 'Данные старые обновите в новом редакторе' }],
      } as MyParagraphElement,
    ];
  }

  return result;
};
