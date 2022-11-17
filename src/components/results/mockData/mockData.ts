import { ValueLabelT } from 'components/results/Results';

export const options = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
];

export const gamesAr: ValueLabelT[] = [
  { value: 'total', label: 'Общий балл' },
  // { value: 'memoryAndRhythm', label: 'Память и ритм' },
  // { value: 'findWords', label: 'Найди слова' },
  // { value: 'flyInCube', label: 'Мухи в кубе' },
  // { value: 'AntiPuzzle', label: 'Антипазл' },
  { value: 'memory', label: 'Память' },
  { value: 'attention', label: 'Внимание' },
];

export enum ResultsView {
  Table = 0,
  Chart = 1,
}

export const gamesArr = [
  { value: 'memoryAndRhythm', label: 'Память и ритм' },
  { value: 'findWords', label: 'Найди слова' },
  { value: 'flyInCube', label: 'Мухи в кубе' },
  { value: 'AntiPuzzle', label: 'Антипазл' },
];
