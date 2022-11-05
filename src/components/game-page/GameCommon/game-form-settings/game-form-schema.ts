import * as yup from 'yup';

export const GAME_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 символ')
    .max(50, 'Максимум 50 символо'),
  level: yup.string().required('Обязательное поле'),
  status: yup.string().required('Обязательное поле'),
  description: yup.string().notRequired().nullable(),
});

export const SHIFT_VERTICAL_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  cycleTime: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 милисекунда')
    .max(100000, 'Максимум 100 000 милисекунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 уровень')
    .max(99, 'Максимум 99 уровней')
    .nullable(),
  groupsCount: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 цвет')
    .max(10, 'Максимум 10 цветов'),
  blinksCount: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 форма')
    .max(10, 'Максимум 10 форм'),
});

export const SHIFT_VERTICAL_FORM_SCHEMA = GAME_SCHEMA.concat(SHIFT_VERTICAL_SCHEMA);

export const SHULTE_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1x1 поле')
    .max(10, 'Максимум 10х10 поле')
    .nullable(),
  digitMin: yup
    .number()
    .required('Обязательное поле')
    .min(1, '1 минимальное число на поле')
    .max(999, '999 минимальное число на поле'),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(1, '1 максимальное число на поле')
    .max(999, '999 максимальное число на поле'),
  colorsMap: yup
    .array(yup.string())
    .required('Обязательное поле')
    .min(1, 'Минимум 1 цвет')
    .max(10, 'Максимум 10 цветов'),
});

export const SHULTE_FORM_SCHEMA = GAME_SCHEMA.concat(SHULTE_SCHEMA);

export const GAME2048_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 уровень')
    .max(99, 'Максимум 99 уровень')
    .nullable(),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(4, 'Минимальное число 4')
    .max(16384, 'Максимальное число 16384'),
  groupsCount: yup
    .number()
    .required('Обязательное поле')
    .min(2, 'Минимум размер поля 2')
    .max(10, 'Максимум размер поля 10'),
});

export const GAME2048_FORM_SCHEMA = GAME_SCHEMA.concat(GAME2048_SCHEMA);

export const BATTLE_COLORS_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 уровень')
    .max(99, 'Максимум 99 уровень'),
  blinksCount: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 цвет')
    .max(99, 'Максимум 10 цветов'),
});

export const BATTLE_COLORS_FORM_SCHEMA = GAME_SCHEMA.concat(BATTLE_COLORS_SCHEMA);

export const MEMORY_RHYTHM_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  blinksCount: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 мигание')
    .max(10, 'Максимум 10 миганий')
    .nullable(),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(2, 'Минимум 2 шарика')
    .max(7, 'Максимум 7 шариков'),
  levelMaxCompleted: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 уровень')
    .max(99, 'Максимум 99 уровень')
    .nullable(),
  sound: yup.number().required('Обязательное поле'),
});

export const MEMORY_RHYTHM_FORM_SCHEMA = GAME_SCHEMA.concat(MEMORY_RHYTHM_SCHEMA);

export const SILHOUETTES_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 силуэт')
    .max(10, 'Максимум 10 силуэтов')
    .nullable(),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 фигур')
    .max(10, 'Максимум 10 фигур'),
});

export const SILHOUETTES_FORM_SCHEMA = GAME_SCHEMA.concat(SILHOUETTES_SCHEMA);

export const ARGUS_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 ответ')
    .max(99, 'Максимум 99 ответов')
    .nullable(),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 заданий')
    .max(99, 'Максимум 99 заданий'),
  errorAacceptable: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 ошибок')
    .max(99, 'Максимум 99 ошибок'),
  speed: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 милисекунда')
    .max(10000, 'Максимум 10 000 милисекунд'),
});

export const ARGUS_FORM_SCHEMA = GAME_SCHEMA.concat(ARGUS_SCHEMA);

export const FIREFLIES_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .required('Обязательное поле')
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 светлячек')
    .max(10, 'Максимум 10 светлячков')
    .nullable(),
  digitMax: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 светлячек')
    .max(40, 'Максимум 40 светлячков')
    .nullable(),
  levelMaxCompleted: yup
    .number()
    .notRequired()
    .min(1, 'Минимум 1 уровень')
    .max(99, 'Максимум 99 уровней')
    .nullable(),
  speed: yup
    .number()
    .notRequired()
    .min(1, 'Минимум 1 милисекунда')
    .max(99000, 'Максимум 99 000 милисекунд')
    .nullable(),
});

export const FIREFLIES_FORM_SCHEMA = GAME_SCHEMA.concat(FIREFLIES_SCHEMA);

export const STEAM_ENGINE_SCHEMA = yup.object().shape({
  timeComplete: yup
    .number()
    .notRequired()
    .min(5, 'Минимум 5 секунд')
    .max(3600, 'Максимум 3600 секунд')
    .nullable(),
  elementsTotal: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 ответ')
    .max(99, 'Максимум 99 ответов')
    .nullable(),
  gage: yup
    .array(
      yup.object({
        speed: yup
          .number()
          .notRequired()
          .min(1, 'Минимум 1 милисекунда')
          .max(10000, 'Максимум 10 000 милисекунд'),
        area: yup.boolean().notRequired(),
      }),
    )
    .required('Обязательное поле')
    .min(1, 'Минимум 1 манометор')
    .max(10, 'Максимум 10 манометорров')
    .nullable(),
  errorAacceptable: yup
    .number()
    .required('Обязательное поле')
    .min(1, 'Минимум 1 ошибок')
    .max(99, 'Максимум 99 ошибок'),
});

export const STEAM_ENGINE_FORM_SCHEMA = GAME_SCHEMA.concat(STEAM_ENGINE_SCHEMA);