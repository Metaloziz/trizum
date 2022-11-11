import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  bulls: number;
  cows: number;
}

export const CounterCowsAndBulls: FC<Props> = ({ bulls, cows }) => {
  const [bullsLabel, setBullsLabel] = useState('бык');
  const [cowsLabel, setCowsLabel] = useState('корова');

  const getLabelBulls = (value: number) => {
    if (value === 0 || value >= 5) {
      return setBullsLabel('быков');
    }
    if (value > 1 && value <= 4) {
      return setBullsLabel('быка');
    }
    return setBullsLabel('бык');
  };

  const getLabelCows = (value: number) => {
    if (value === 0 || value >= 5) {
      return setCowsLabel('коров');
    }
    if (value > 1 && value <= 4) {
      return setCowsLabel('коровы');
    }
    return setCowsLabel('корова');
  };

  useEffect(() => {
    getLabelBulls(bulls);
    getLabelCows(cows);
  }, [cows, bulls]);

  return (
    <Text style={styles.label}>
      {bulls} {bullsLabel} и {cows} {cowsLabel}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 24,
    textTransform: 'uppercase',
  },
});
