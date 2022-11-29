import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  values: string[];
}

export const PrevValue: FC<Props> = ({ values }) => {
  return (
    <View style={styles.wrapper}>
      {values.map((item, index) => (
        <Text key={index} style={styles.label}>{item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  label: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: 5,
  },
});
