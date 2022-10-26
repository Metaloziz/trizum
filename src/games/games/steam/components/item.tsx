import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Svg, Path } from 'react-native-svg';

import { rand, describeArc } from '../../../common/utils';

import SteamArrow from './arrow';

const BORDER_SIZE = 6;

export const getAngelsSize = (area: string) => {

  const arrayNumbers = area.split('/')

  const number1 = Number(arrayNumbers[0])
  const number2 =Number( arrayNumbers[1])

  return  360 * number1 / number2

}

export default class extends Component<any, any> {

  startAngle: number;

  constructor(props : any) {
    super(props);

    this.startAngle = rand(0, 360 - getAngelsSize(props.area));
  }

  onPress = () => {
    const refArrow : any = this.refs?.arrow;
    const correct = refArrow?.isInRange() || false;

    if(correct === -1) {
      return;
    }

    this.onScore(correct ? 1 : -1);
  }

  onScore = (result = 1) => {
    const {
      onScore = () => {}
    } = this.props;

    onScore(result);
  }

  render() {
    const {
      size = 120,
      speed
    } = this.props;

    const innerSize = size - (BORDER_SIZE*4);
    const centerSize = Math.round(size * 0.4);
    const range = [this.startAngle, this.startAngle + getAngelsSize(this.props.area)];

    return <TouchableOpacity
      style={{
        ...styles.item,
        width : size,
        height : size,
        borderRadius : size/2
      }}
      onPress={this.onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          ...styles.inner,
          width : innerSize,
          height : innerSize,
          borderRadius : innerSize/2
        }}
      >
        <View style={styles.fill}>
          <Svg height={innerSize} width={innerSize}>
            <Path
              d={describeArc(innerSize/2, innerSize/2, innerSize/2, range[0], range[1])}
              fill="none"
              stroke="#FF4633"
              strokeWidth={innerSize}
            />
          </Svg>
        </View>
        <View
          style={{
            ...styles.center,
            width : centerSize,
            height : centerSize,
            borderRadius : centerSize / 2,
          }}
        ></View>
        <View style={styles.fill}>
          <SteamArrow
            ref='arrow'
            range={range}
            size={innerSize}
            speed={speed}
            onScore={this.onScore}
          />
        </View>
        <View style={[styles.fill, styles.fillCenter]}>
          <View
            style={styles.centerArrow}
          />
        </View>
      </View>
    </TouchableOpacity>;
  }

}

const styles = StyleSheet.create({
  fill : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
  },
  item : {
    backgroundColor : '#fff',
    borderColor : '#4A4E57',
    borderWidth : BORDER_SIZE,
    alignItems : 'center',
    justifyContent : 'center',
  },
  inner : {
    backgroundColor : '#CCCCCC',
    overflow : 'hidden',
    alignItems : 'center',
    justifyContent : 'center'
  },
  center : {
    backgroundColor : '#4A4E57',
    borderWidth : 4,
    borderColor : '#fff'
  },
  fillCenter : {
    alignItems : 'center',
    justifyContent : 'center'
  },
  centerArrow : {
    width : 20,
    height : 20,
    backgroundColor : '#EBEBEB',
    borderColor : '#C5C5C5',
    borderWidth : 2,
    borderRadius : 10
  }
});
