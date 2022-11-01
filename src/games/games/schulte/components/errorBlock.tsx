import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

import { isWeb } from '../../../common/utils';

export default class extends Component<any, any> {

  constructor(props : any) {
    super(props);

    this.state = {
      x : 0,
      y : 0,
      opacity : new Animated.Value(0)
    };
  }

  componentDidMount() {
    const {
      onRef = () => {}
    } = this.props;

    onRef(this);
  }

  show = (x : number = 0, y : number = 0) => {
    this.setState({
      x,
      y,
      opacity : new Animated.Value(1)
    }, () => {
      this.animateTo(0);
    });
  }

  animateTo = (value : any) => {
    const {
      opacity
    } = this.state;

    if(isWeb()) {
      setTimeout(() => {
        this.setState({
          opacity : new Animated.Value(value)
        });
      }, 200);
      return;
    }

    Animated.timing(opacity, {
      toValue : value,
      duration : 200,
      easing : Easing.linear,
      useNativeDriver : true
    }).start();
  }

  render() {
    const {
      x = 0,
      y = 0,
      opacity
    } = this.state;

    const {
      size = 0,
      color = 'rgba(255,0,0,0.1)'
    } = this.props;

    const sizeWithBorder = size;

    return <View
      style={{
        ...styles.wrap,
        width : sizeWithBorder,
        height : sizeWithBorder,
        top : (sizeWithBorder * y) - 1,
        left : (sizeWithBorder * x) - 1
      }}
    >
      <Animated.View
        style={{
          ...styles.inner,
          backgroundColor : color,
          opacity : opacity.interpolate({
            inputRange : [0, 1],
            outputRange : [0, 1]
          })
        }}
      />
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    position : 'absolute',
  },
  inner : {
    flex : 1,
    backgroundColor : 'rgba(255,0,0,0.1)'
  }
});
