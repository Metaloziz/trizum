import React, { FC, useEffect} from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { DictionaryFraze } from '../../types';

const frazesBackground = require('../../assets/frazesBackground.png');

interface Props {
  userWord: string;
  words: DictionaryFraze[];
  onResult: (result: boolean) => void;
  level: number;
  visibleWord: boolean;
  wordsFull: boolean;
  errors: number;
  gameEngineLevel: "easy" | "normal" | "hard"
}

export const Fraze: FC<Props> = ({ userWord, words, level, visibleWord, wordsFull, gameEngineLevel, onResult, errors }) => {

  const checkWord = () => {
    return userWord.split('').filter((userChar, index) => {
      const wordsChar = words[level][gameEngineLevel][index].toUpperCase();
      return userChar === wordsChar;
    });
  };

  const handleUserWord = () => {
    const result = checkWord();
    
    if (wordsFull) {
      if (result.length === words[level][gameEngineLevel].length) {
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

  const getLabelEngineLevel = () => {
    if(gameEngineLevel === "hard") return "Сложный"
    if(gameEngineLevel === "normal") return "Нормальный"
    return "Легкий"
  }

  return (
    <View style={styles.root}>
      <View style={styles.statisticWrap}>
      <Text style={styles.statisticLabel}>Уровень сложности: {getLabelEngineLevel()}</Text>
      <Text style={styles.statisticLabel}>Количество ошибок: {errors}</Text>
      </View>
      <ImageBackground
        source={frazesBackground}
        resizeMode="contain"
        style={styles.frazeBackground}
      >
        <Text style={styles.wordLabel}>{visibleWord ? words[level][gameEngineLevel] : userWord}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 170,
  },
  statisticWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statisticLabel: {
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
