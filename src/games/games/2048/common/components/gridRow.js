import {
  View,
  Text,
}  from 'react-native'
import React from 'react'

import GridCell from './gridCell'

import Dimensions from '../utils/dimensions'
const MARGIN_WIDTH = Dimensions.size["2"]

const styles = {
  container: {
    marginVertical: Dimensions.size["2"],
    flexDirection: 'row',
  }
}

const GridRow = props => {
  const {
    width,
    size = 4
  } = props;

  const height = (width-MARGIN_WIDTH*((size * 2) + 2))/size;

  return <View
    style={{
      ...styles.container,
      height
    }}
  >
    {Array.from({
      length : size
    }).map((a, i) => <GridCell
      width={width}
      key={`grid-cell-${i}`}
      size={height}
    />)}
  </View>;
}

export default GridRow
