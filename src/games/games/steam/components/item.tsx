import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Svg, Circle, Path } from 'react-native-svg';

import { rand, describeArc } from '../../../common/utils';

import SteamArrow from './arrow';

const BORDER_SIZE = 6;
// const SIZE_ANGLE = 55;

const SIZE = 120;

interface Props {
  speed: number,
  area: boolean;
  onScore: (score:number) => void;
}

export default class extends Component<Props, any> {
  startAngle: number;
  size_angle: number;

  constructor(props: Props) {
    super(props);

    const { area = true } = props;

    this.size_angle = Math.round(360 / (area ? 6 : 8));

    this.startAngle = rand(0, 360 - this.size_angle);
  }

  onPress = () => {
    const refArrow: any = this.refs?.arrow;
    const correct = refArrow?.isInRange() || false;

    if (correct === -1) {
      return;
    }

    this.onScore(correct ? 1 : -1);
  };

  onScore = (result = 1) => {
    const { onScore = () => {} } = this.props;

    onScore(result);
  };

  render() {
    const { speed } = this.props;
   
    const innerSize = SIZE - BORDER_SIZE * 4;
    const centerSize = Math.round(SIZE * 0.4);
    const range = [this.startAngle, this.startAngle + this.size_angle];
   

    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
        }}
        onPress={this.onPress}
        activeOpacity={0.8}
      >
        <View
          style={{
            ...styles.inner,
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
          }}
        >
          <View style={styles.fill}>
            <Svg height={innerSize} width={innerSize}>
              <Path
                d={describeArc(innerSize / 2, innerSize / 2, innerSize / 2, range[0], range[1])}
                fill="none"
                stroke="#FF4633"
                strokeWidth={innerSize}
              />
            </Svg>
          </View>
          <View
            style={{
              ...styles.center,
              width: centerSize,
              height: centerSize,
              borderRadius: centerSize / 2,
            }}
          ></View>
          <View style={styles.fill}>
            <SteamArrow
              ref="arrow"
              range={range}
              size={innerSize}
              speed={speed}
              onScore={this.onScore}
            />
          </View>
          <View style={[styles.fill, styles.fillCenter]}>
            <View style={styles.centerArrow} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  item: {
    backgroundColor: '#fff',
    borderColor: '#4A4E57',
    borderWidth: BORDER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#CCCCCC',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    backgroundColor: '#4A4E57',
    borderWidth: 4,
    borderColor: '#fff',
  },
  fillCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerArrow: {
    width: 20,
    height: 20,
    backgroundColor: '#EBEBEB',
    borderColor: '#C5C5C5',
    borderWidth: 2,
    borderRadius: 10,
  },
});
