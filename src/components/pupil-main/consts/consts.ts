import { GameIdentifiers } from 'games';

const randomPercent = () => Math.floor(Math.random() * 100);

export const weeklyGrowth = [
  {
    skillTitle: 'Логика',
    type: 'logic',
    color: 'red',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Внимание',
    type: 'attention',
    color: 'violet',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Мышление',
    type: 'mind',
    color: 'aquamarine',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Концентрация',
    type: 'vision',
    color: 'yellow',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
]; // todo ждём бек

export const homeworks = [
  // todo ждём бек
  {
    gameTitle: 'Память и ритм',
    id: +new Date().toDateString(),
    description: {
      needToDo: 'выполнить следующие пункты',
      minutesLeft: 10,
      tips: [
        {
          text: 'Прочитать статью',
          id: +new Date().toDateString(),
        },
        {
          text: 'Спеть песню',
          id: +new Date().toDateString(),
        },
        {
          text: 'Написать пьесу',
          id: +new Date().toDateString(),
        },
      ],
    },
  },
  {
    gameTitle: 'Антипазл',
    id: +new Date().toDateString(),
    description: {
      needToDo: 'выполнить следующие пункты',
      minutesLeft: 10,
      tips: [
        {
          text: 'найти магазин с пазлами',
          id: +new Date().toDateString(),
        },
        {
          text: 'высыпать все пазлы в одну кучу',
          id: +new Date().toDateString(),
        },
        {
          text: 'скрыться, чтобы тебя не заметили',
          id: +new Date().toDateString(),
        },
      ],
    },
  },
];

export const games = [
  {
    title: 'Битва полушарий',
    code: GameIdentifiers.battleColors,
    minutesLeft: 18,
    colorTheme: 'blue',
    id: +new Date().toDateString(),
  },
  {
    title: '2048',
    code: GameIdentifiers.game2048,
    minutesLeft: 36,
    colorTheme: 'gradient-violet',
    id: +new Date().toDateString(),
  },
  {
    title: 'Таблица шульте',
    code: GameIdentifiers.shulte,
    minutesLeft: 20,
    colorTheme: 'blue',
    id: +new Date().toDateString(),
  },
  {
    title: 'Сдвиг по вертикали',
    code: GameIdentifiers.shiftVertical,
    minutesLeft: 44,
    colorTheme: 'gradient-blue-darker',
    id: +new Date().toDateString(),
  },
  {
    title: 'Ментальный счет',
    code: GameIdentifiers.mental,
    minutesLeft: 31,
    colorTheme: 'aquamarine',
    id: +new Date().toDateString(),
  },
  {
    title: 'Паровик',
    code: GameIdentifiers.steamEngine,
    minutesLeft: 31,
    colorTheme: 'aquamarine',
    id: +new Date().toDateString(),
  },
  {
    title: 'Бирюльки',
    code: GameIdentifiers.silhouettes,
    minutesLeft: 31,
    colorTheme: 'aquamarine',
    id: +new Date().toDateString(),
  },
  {
    title: 'Память и ритм',
    code: GameIdentifiers.memoryRhythm,
    minutesLeft: 31,
    colorTheme: 'aquamarine',
    id: +new Date().toDateString(),
  },
  // {
  //   title: 'Найди слова/числа/фигуры',
  //   minutesLeft: 36,
  //   colorTheme: 'gradient-violet',
  //   id: +new Date().toDateString(),
  // },
  // {
  //   title: 'Мухи в кубе',
  //   minutesLeft: 44,
  //   colorTheme: 'gradient-blue-darker',
  //   id: +new Date().toDateString(),
  // },
  // {
  //   title: 'Антипазл',
  //   minutesLeft: 31,
  //   colorTheme: 'aquamarine',
  //   id: +new Date().toDateString(),
  // },
];
