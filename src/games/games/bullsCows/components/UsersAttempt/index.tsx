import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  count: number;
}

export const UsersAttempt: FC<Props> = ({ count }) => {
  const [label, setLabel] = useState('Попытки');

  const getLabel = (value: number) => {
    if (value === 0 || value >= 5) {
      return setLabel('Попыток');
    }
    if (value > 1 && value <= 4) {
      return setLabel('Попытки');
    }
    return setLabel('Попытка');
  };

  useEffect(() => getLabel(count), [count]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}: {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#CFD8DC',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
  },
});
