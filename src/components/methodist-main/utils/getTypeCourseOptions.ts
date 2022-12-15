import { getOptionMui } from 'utils';

export const getTypeCourseOptions = () => {
  // blocks = 'Тестирование в статье для учителей',  исключён
  const keys = { class: 'Курс домашнего задания', olympiad: 'Олимпиада для учеников' };

  const groupTypesKeys = Object.keys(keys);

  return Object.values(keys).map((el, index) => getOptionMui(groupTypesKeys[index], el));
};
