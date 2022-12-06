import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Point } from './types';

interface Props {
  findingPoints: any;
}

export const UserPoints: FC<Props> = ({ findingPoints }) => {
  const drawArea = (points: Point[]) => {
    const [A, B, C, D] = points;
    return {
      height: D.y - A.y,
      width: B.x - A.x,
      left: A.x,
      top: A.y,
    };
  };

  return (
    <View style={styles.root}>
      <View style={styles.pointsWrap}>
        {Object.values(findingPoints).map((value: any) => {
          const [A, B, C, D] = value;
          return (
            <View
              style={{
                ...styles.area,
                ...drawArea([A, B, C, D]),
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 9999,
  },
  pointsWrap: {
    flex: 1,
    position: 'relative',
  },
  area: {
    position: 'absolute',
    zIndex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
});
