import {
  View,
  Text,
}  from 'react-native';
import React from 'react'

import Dimensions from '../utils/dimensions';

const MARGIN_WIDTH = Dimensions.size["2"];

const styles = {
  container: {
    marginHorizontal: MARGIN_WIDTH,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
    borderRadius: Dimensions.size["1"],
  }
}

const GridCell = props => {
  const {
    size
  } = props;

  return <View
    style={{
      ...styles.container,
      width : size,
      height : size
    }}
  />
}

export default GridCell
