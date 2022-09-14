import {
  View,
  Text,
}  from 'react-native'
import React from 'react'
import GridRow from './gridRow'

import Dimensions from '../utils/dimensions';

const styles = {
  container:{
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    paddingHorizontal: Dimensions.size["2"],
    paddingVertical: Dimensions.size["2"],
    flexDirection: 'column',
  }
}

const GridContainer = props => {
  const {
    width,
    size = 4
  } = props;

  return <View
    style={{
      ...styles.container,
      width : width,
      height : width
    }}
  >
    {Array.from({
      length : size
    }).map((a, i) => <GridRow
      size={size}
      width={width}
      key={`grid-row-${i}`}
    />)}
  </View>;
}

export default GridContainer
