import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { getColor } from '../utils/words';
import { WordsPosition, UserClick, Orientation, Position } from '../types';

interface Props {
  board: string[][];
  map: WordsPosition[];
  userClick: UserClick[];
  addUserClick: (value: UserClick) => void;
  deleteUserClick: () => void;
  addSelected: (word: string) => void;
}

export const Board: FC<Props> = ({ board, map, userClick, addUserClick, deleteUserClick, addSelected }) => {
  const width = useMemo(() => 800 / board[0].length, [board]);
  const fontSize = useMemo(() => width / 1.5, [width]);

  const handleClick = (char: string, y: number, x: number) => {
    const findChar = map.find(
      ({ start, end }) => (start.x === x && start.y === y) || (end.x === x && end.y === y),
    );
    console.log({ findChar });
    if (findChar) {
      const { orientation, start, end, word } = findChar;
      const isStart = start.x === x && start.y === y;
      const isEnd = end.x === x && end.y === y;
      console.log({ isStart, isEnd });
      if (isStart) {
        addUserClick({ position: { y, x }, orientation, start: true });
      }
      if (isEnd) {
        
        const hasStartChar = userClick.find(
          ({ position }) => position.y === start.y && position.x === start.x,
        );
        if (hasStartChar) {
          addUserClick({ position: { y, x }, orientation, end: true });
          const startIndex = orientation === "horizontal" ? start.x + 1 : start.y + 1;
          const endIndex = orientation === "horizontal" ? end.x : end.y;
          drawWord(startIndex, endIndex, orientation, start);
          addSelected(word);
        }
        return;
      }

    }

    deleteUserClick();

    console.log('handleClick -->', { char, findChar });
  };

  const drawWord = (
    startIndex: number,
    endIndex: number,
    orientation: Orientation,
    position: Position,
  ) => {
    let start = startIndex;
    if (orientation === 'horizontal') {
      for (start; start < endIndex; start++) {
        addUserClick({ position: { y: position.y, x: start }, orientation });
      }
    }

    if (orientation === 'vertical') {
      for (start; start < endIndex; start++) {
        addUserClick({ position: { y: start, x: position.x }, orientation });
      }
    }
  };

  const userClickMap: Record<string, UserClick> = useMemo(
    () =>
      userClick.reduce(
        (acc, obj) => ({
          ...acc,
          [`${obj.position.y} ${obj.position.x}`]: {
            orientation: obj.orientation,
            start: obj.start,
            end: obj.end,
          },
        }),
        {},
      ),
    [userClick],
  );

  console.log({ userClickMap, userClick });
  return (
    <View>
      {board.map((rows, y) => (
        <View key={y} style={styles.row}>
          {rows.map((char, x) => {
            const position = userClickMap[`${y} ${x}`];

            const style = useMemo(() => {
              if (position?.orientation === 'horizontal') {
                if (position.start)
                  return { ...styles[position.orientation], ...styles['horizontalStart'] };
                if (position.end)
                  return { ...styles[position.orientation], ...styles['horizontalEnd'] };
                return styles[position.orientation];
              }
              if (position?.orientation === 'vertical') {
                if (position.start)
                  return { ...styles[position.orientation], ...styles['verticalStart'] };
                if (position.end)
                  return { ...styles[position.orientation], ...styles['verticalEnd'] };
                return styles[position.orientation];
              }
            }, [position]);

            return (
              <TouchableOpacity
                key={y + x}
                style={{
                  ...styles.button,
                  width,
                  height: width,
                  backgroundColor: getColor(char),
                  ...style,
                }}
                onPress={() => handleClick(char, y, x)}
              >
                <Text style={{ ...styles.char, fontSize }}>{char}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginBottom: 7,
  },
  char: {
    color: '#443888',
  },
  horizontalStart: {
    borderLeftWidth: 5,
  },
  horizontal: {
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#DD025E',
  },
  horizontalEnd: {
    borderRightWidth: 5,
  },
  verticalStart: {
    borderTopWidth: 5,
  },
  vertical: {
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: '#DD025E',
  },
  verticalEnd: {
    borderBottomWidth: 5,
  },
});
