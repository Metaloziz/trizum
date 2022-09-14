import React from 'react';
import { View, Text } from 'react-native'

import Tile from './tile';

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  }
};

const TileContainer = (props) => {
  const {
    width,
    tiles,
    size = 4
  } = props;

  const children = tiles;

  return <View
    style={{
      ...styles.container,
      height : width,
      width
    }}
  >
    {children.map((item) => {
      return <Tile
        size={size}
        width={width}
        x={item.x}
        y={item.y}
        value={item.value}
        key={item.prog}
      />;
    })}
  </View>;
}

export default TileContainer
