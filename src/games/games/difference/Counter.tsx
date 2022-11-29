import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  findingPoints: any;
  gameLevel: any;
}

export const Counter: FC<Props> = ({ findingPoints, gameLevel }) => {
  const countFindingDifference = () => Object.keys(findingPoints).length;
  const countDifferenceFromLevel = () => gameLevel.differences.points.length / 4;

  return (
    <View style={styles.root}>
      <Text>
        Найдено отличий {countFindingDifference()}/{countDifferenceFromLevel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
