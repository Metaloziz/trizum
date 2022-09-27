import { rangeList } from './wrapLogic';

export default function() {
  const template = [
    {
      title : 'Прямой счет в 4',
      lockRange : true,
      options : {
        allowedFormulas: [],
        min : 1,
        max : 4
      }
    },
    {
      title : 'Прямой счет в 9',
      lockRange : true,
      options : {
        allowedFormulas: ["LF1", "LF2", "LF4", "LF4", "LF-1", "LF-2", "LF-3", "LF-4"],
        min : 1,
        max : 9
      }
    },
    {
      title : 'Прямой счет',
      lockRange : false,
      rangeList : rangeList,
      options : {
        allowedFormulas: [],
        min : 1,
        max : 9
      }
    },
  ];

  [
    {
      num : 1
    },
    {
      num : 2
    },
    {
      num : 3
    },
    {
      num : 4
    },
    {
      num : 5
    },
    {
      num : 6
    },
    {
      num : 7
    },
    {
      num : 8
    },
    {
      num : 9
    },
  ].map(a => {
    const allowedFormulas = [];

    for(let i = 1;i <= a.num; i++) {
      allowedFormulas.push(`LF${i}`);
    }

    const tmp = {
      title : `+${a.num} = -${10 - a.num} + 10`,
      lockRange : false,
      rangeList : rangeList,
      options : {
        ...a.options,
        allowedFormulas : allowedFormulas,
        requiredFormulas : [`LF${a.num}`]
      }
    };

    template.push(tmp);
  });

  return template;
}
