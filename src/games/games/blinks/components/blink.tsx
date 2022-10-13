import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated, Easing } from 'react-native';

export default class extends Component<any, any> {

  constructor(props : any) {
    super(props);

    this.state = {
      animate : new Animated.Value(0)
    };
  }

  componentDidUpdate(prevProps : any) {
    if(this.props.active == prevProps.active) {
      return;
    }

    if(this.props.active) {
      this.onBlink();
    }
  }

  onBlink = () => {
    this.setState({
      animate : new Animated.Value(0)
    }, () => {
      this.playSound();
      this.toValue(2);
    });
  }

  toValue = (value : number) => {
    Animated.timing(this.state.animate, {
      toValue : value,
      duration : 500,
      easing : Easing.linear,
      useNativeDriver : true
    }).start();
  }

  onPress = (cb : any) => () => {
    this.playSound();

    if(typeof cb != 'undefined') {
      cb();
    }
  }

  playSound = () => {
    const {
      sound = false
    } = this.props;

    if(!sound) {
      return;
    }

    sound.play();
  }

  render() {
    const {
      color,
      size,
      active,
      onPress
    } = this.props;

    const {
      animate
    } = this.state;

    const WrapView : any = typeof onPress == 'undefined' ? View : TouchableOpacity;

    return <WrapView
      style={{
        width : size,
        height : size,
      }}
      activeOpacity={0.1}
      onPress={this.onPress(onPress)}
    >
      <Animated.View
        style={{
          width : size,
          height : size,
          backgroundColor : color,
          borderRadius : size/2,
          opacity : animate.interpolate({
            inputRange : [0, 1, 2],
            outputRange : [
              1,
              0,
              1
            ]
          })
        }}
      />
    </WrapView>;
  }

}
