import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { getLabelBulls, getLabelCows } from '../../utils';

interface Props {
  bulls: number;
  cows: number;
}

export const CounterCowsAndBulls: FC<Props> = ({ bulls, cows }) => {
  const [bullsLabel, setBullsLabel] = useState('бык');
  const [cowsLabel, setCowsLabel] = useState('корова');

  const renderLabelBulls = (value: number) => {
    const bullsLabel = getLabelBulls(value);
    setBullsLabel(bullsLabel);
  };

  const renderLabelCows = (value: number) => {
    const cowsLabel = getLabelCows(value);
    setCowsLabel(cowsLabel);
  };

  useEffect(() => {
    renderLabelBulls(bulls);
    renderLabelCows(cows);
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
