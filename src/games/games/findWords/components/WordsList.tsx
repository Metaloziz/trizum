import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  words: string[];
}

interface WordList {
  words: string[];
}

export const WordsList: FC<Props> = ({ words }) => {

  const list = useMemo(() => {
    const isEven = words.length % 2 === 0;
    const step = isEven ? 2 : 3;
    let i = 0;
    let result: WordList[] = [];
    while (i < words.length) {
      const wordRows = words.slice(i, i + step);
      result = [...result, { words: wordRows }];
      i += step;
    }
    return result;
  }, [words]);

  return (
    <View style={styles.root}>
      {list.map(({ words }, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {words.map((word, index) => (
            <Text key={rowIndex + index} style={styles.label}>{word}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingHorizontal: 20,
    marginVertical: 4,
  },
});
