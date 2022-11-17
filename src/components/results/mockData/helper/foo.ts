import appStore from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { toJS } from 'mobx';

export const foo = (numberOfMonth?: number): number[] => {
  const {user} = appStore;
  let arr: number[] = [];

  // массив со всей информацией о времени работы
  const arrayWithTieIfo: Array<{ date: string, from: string, name: string, to: string }> = [];

  const groups = [...toJS(user.groups)];
  groups.map(group => group.group.schedule.forEach(item => arrayWithTieIfo.push(item)));

  // возвращаем массив состоящий из количества потраченных часов за день
  // без учета минут и без учета дней без информации
  arr = arrayWithTieIfo.map(item => {
    let hours: number = 0;
    console.log('item', item);
    const from = Number(item.from.slice(0, 2));
    const to = Number(item.to.slice(0, 2));
    hours = Math.ceil(to - from);
    return hours;
  });
  console.log('item ', arr);
  return arr;
};

// Как я представляю нужно создать массив из данных только по одному месяцу,
// пробежать for-ом из 31 итерации и при совпадении с
// числом пушить разницу часов(с учетом минут:)) если совпадений нет, пушить 0.
// Получится чистая статистика за оди конкретный месяц, номер которого мы передам
// в функцию как аргумент
