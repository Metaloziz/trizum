import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const frazesBackground = require('../../assets/frazesBackground.png');

interface Props {
  speed?: number;
  userWord: string;
  words: string[];
  onResult: (result: boolean) => void;
  level: number;
}

export const Fraze: FC<Props> = ({ speed = 2000, userWord, words, level, onResult }) => {
  const [visible, setVisible] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkWord = () => {
    return userWord.split('').filter((userChar, index) => {
      const wordsChar = words[level].toUpperCase().charAt(index);
      return userChar === wordsChar;
    });
  };

  const handleUserWord = () => {
    const charCount = userWord.length;
    const result = checkWord();
    if(result.length > 2) {
      onResult(true)
    }
    console.log({result, charCount})
  }

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, speed);
  }, [level]);

  useEffect(() => handleUserWord(), [userWord]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={frazesBackground}
        resizeMode="contain"
        style={styles.frazeBackground}
      >
        <Text style={styles.wordLabel}>{visible ? words[level] : userWord}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 170,
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
