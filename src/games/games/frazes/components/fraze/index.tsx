import React, { FC, useEffect} from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const frazesBackground = require('../../assets/frazesBackground.png');

interface Props {
  userWord: string;
  words: string[];
  onResult: (result: boolean) => void;
  level: number;
  visibleWord: boolean;
  wordsFull: boolean;
  errors: number;
}

export const Fraze: FC<Props> = ({ userWord, words, level, visibleWord, wordsFull, onResult, errors }) => {

  const checkWord = () => {
    return userWord.split('').filter((userChar, index) => {
      const wordsChar = words[level][index].toUpperCase();
      return userChar === wordsChar;
    });
  };

  const handleUserWord = () => {
    const charCount = userWord.length;
    const secretWord = words[level];
    const result = checkWord();
    console.log('handle user word ---', { result, charCount, secretWord, userWord });
    
    if (wordsFull) {
      if (result.length === words[level].length) {
        return onResult(true);
      }
      if(userWord.length > result.length) {
        onResult(false);
      }
    }

    if (!wordsFull) {
      if (result.length === 2) {
        onResult(true);
      }
      if (userWord.length > result.length) {
        onResult(false);
      }
    }
  };

  useEffect(() => {
    if (!visibleWord) {
      handleUserWord();
    }
  }, [visibleWord, userWord]);

  return (
    <View style={styles.root}>
      <View style={styles.errorWrap}>

      <Text style={styles.errorLabel}>Количество ошибок: {errors}</Text>
      </View>
      <ImageBackground
        source={frazesBackground}
        resizeMode="contain"
        style={styles.frazeBackground}
      >
        <Text style={styles.wordLabel}>{visibleWord ? words[level] : userWord}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 170,
  },
  errorWrap: {
    alignItems: "flex-end"
  },
  errorLabel: {
    fontSize: 15,
    fontWeight: "600"
  },
  frazeBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordLabel: {
    fontSize: 40,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
