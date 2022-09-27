import Core from './core';
import Templates from './templates';

export const rangeList = [
  [1,4],
  [1,5],
  [1,9],
  [1,99],
  [1,999],
  [10,99],
  [10,999],
  [100,999],
];

export function generate(config) {
  // const templates = Templates;
  // const activeTemplateIndex = template;

  const data = {
    data : {
      type : 'generate',

      options : {
        requiredFormulas: [], // Обязательная формула
        allowedFormulas: ["LF1", "LF2", "LF4", "LF4", "LF-1", "LF-2", "LF-3", "LF-4"], // Разрешённые формулы
        min: 1, // Минимальный размер слагаемого
        max: 999, // Максимальный размер слагаемого
        subtract: true, // Можно использовать вычитание
        restriction: false, // Результат не более по формуле
        length: 3, // Кол-во слагаемых
        count: 3, // Кол-во задач
        optional: 0,

        ...config,

        // ...templates[activeTemplateIndex].options
      }
    },
  };

  return new Promise((resolve) => {
    Core.postMessage = data => {
      if(data.type != 'ready') {
        return;
      }

      resolve(data.data);
    };

    Core.onmessage(data);
  });
}
