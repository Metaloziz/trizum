import { Board } from '../types';
import { COLORS_MAP, COLORS } from '../assets';

const orientationWord = ['vertical', 'horizontal'];
const upOrDown = [true, false];

const ABC = Object.keys(COLORS_MAP);

export const getRandomChar = () => ABC[Math.floor(Math.random() * ABC.length)];

export const getOrientationWord = () =>
  orientationWord[Math.floor(Math.random() * orientationWord.length)];

export const getRandomInit = (max: number) => Math.floor(Math.random() * max);

export const getColor = (char: string) => COLORS_MAP[char] || COLORS.yellow;

export const verticalStartPosition = () => upOrDown[Math.floor(Math.random() * upOrDown.length)];

export const getHorizontalPosition = (board: Board, word: string) => {
  const maxX = board[0].length;
  const maxY = Object.keys(board).length;

  let looping = maxX;

  const char = word.split('');

  let find = 1;

  let result = {
    status: true,
    x: 0,
    y: 0,
  };

  while (find != 0) {
    const x = getRandomInit(maxX);
    const y = getRandomInit(maxY);

    const row = board[y];

    const left = row.slice(0, x);
    const right = row.slice(x);

    const isEmptyRow = row.join('').length === 0;

    if (isEmptyRow) {
      if (left.length >= char.length) {
        result = { status: true, x: x - word.length, y };
        break;
      }
      if (right.length >= char.length) {
        result = { status: true, x, y };
        break;
      }
    }

    const indexesRow = row.map((item, index) => ({ x: index, item }));

    if (row.join('').length == 1) {
      const [{ x }] = indexesRow.filter(({ item }) => item);
      const left = row.slice(0, x);
      const right = row.slice(x + 1);

      if (left.length >= char.length) {
        result = { status: true, x: x - word.length, y };
        break;
      }

      if (right.length >= char.length) {
        result = { status: true, x: x + 1, y };
        break;
      }
    }

    looping--;

    if (looping < 0) {
      result = { status: false, x: 0, y: 0 };
      break;
    }

    continue;
  }

  return result;
};

export const getVerticalPosition = (board: Board, word: string) => {
  const maxX = board[0].length;
  const maxY = Object.keys(board).length;

  let looping = maxY;

  const char = word.split('');

  let find = 1;

  let result = {
    status: true,
    x: 0,
    y: 0,
  };

  while (find != 0) {
    const x = getRandomInit(maxX);
    const y = getRandomInit(maxY);

    const row = [];

    for (let index = 0; index < maxY; index++) {
      row.push(board[index][x]);
    }

    const up = row.slice(0, y);
    const down = row.slice(y);

    const isEmptyRow = row.join('').length == 0;

    if (isEmptyRow) {
      if (up.length >= char.length) {
        result = { status: true, x, y: y - word.length };
        break;
      }

      if (down.length >= char.length) {
        result = { status: true, x, y };
        break;
      }
    }

    const indexesRow = row.map((item, index) => ({ y: index, item }));

    if (row.join('').length == 1) {
      const [{ y }] = indexesRow.filter(({ item }) => item);

      const up = row.slice(0, y);
      const down = row.slice(y + 1);
      console.log({ up, down, word });
      if (up.length >= char.length) {
        result = { status: true, x, y: y - word.length };
        break;
      }

      if (down.length >= char.length) {
        result = { status: true, x, y: y + 1 };
        break;
      }
    }

    if (looping < 0) {
      result = { status: false, x: 0, y: 0 };
      break;
    }

    continue;
  }

  return result;
};

export const generateRandomChar = (board: Board, rows: number) => {
  for (let y = 0; y < rows; y++) {
    const row = board[y];

    row.forEach((char, index) => {
      if (!char) {
        board[y][index] = getRandomChar();
      }
    });
  }
  return board;
};
