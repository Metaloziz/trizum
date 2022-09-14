import React, { Component } from 'react';
import  { View, PanResponder }  from 'react-native';

import { isWeb } from '../common/utils';

export default class extends Component<any, any> {

  moving : boolean = false;
  disposer : any[] = [];
  _panResponder : any;

  constructor(props : any) {
    super(props);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState)=>this._handleStartShouldSetPanResponder(e, gestureState),
      onMoveShouldSetPanResponder: (e, gestureState)=>this._handleMoveShouldSetPanResponder(e, gestureState),
      onPanResponderGrant: (e, gestureState)=>this._handlePanResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState)=>this._handlePanResponderMove(e, gestureState),
      onPanResponderRelease: (e, gestureState)=>this._handlePanResponderEnd(e, gestureState)
    });
    this.moving = false;
  }

  componentDidMount() {
    if(isWeb()) {
      document.addEventListener("keydown", this._onKeyPress, false);
    }
  }

  componentWillUnmount() {
    if(isWeb()) {
      document.removeEventListener("keydown", this._onKeyPress, false);
    }
  }

  _onKeyPress = (e : any) => {
    const {
      onSwipeUp = () => {},
      onSwipeDown = () => {},
      onSwipeRight = () => {},
      onSwipeLeft = () => {},
    } = this.props;

    const keyCode = e.keyCode;

    switch(keyCode) {
      case 37:
      onSwipeLeft();
      break;
      case 39:
      onSwipeRight();
      break;
      case 38:
      onSwipeUp();
      break;
      case 40:
      onSwipeDown();
      break;
    }
  }

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return true
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return true
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    if (this.moving == false) {
        this.moving = true
    }
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {}

  _handlePanResponderEnd = (e: Object, gestureState: any) => {
    const {
      onSwipeUp = () => {},
      onSwipeDown = () => {},
      onSwipeRight = () => {},
      onSwipeLeft = () => {},
    } = this.props;

    if (this.moving) {
      this.moving = false

      var dx = gestureState.dx;
      var dy = gestureState.dy;
      var absDx = dx>0?dx:-dx;
      var absDy = dy>0?dy:-dy;
      var canMove = absDx>absDy?absDx-absDy>10:absDx-absDy<-10;
      if (canMove) {
        // (right : left) : (down : up)
        // 0: up, 1: right, 2: down, 3: left
        const direction = absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);

        if(direction == 0) {
          onSwipeUp();
        }
        if(direction == 1) {
          onSwipeRight();
        }
        if(direction == 2) {
          onSwipeDown();
        }
        if(direction == 3) {
          onSwipeLeft();
        }
      }
    }
  }

  render() {
    return <View
      {...this._panResponder.panHandlers}
      {...this.props}
    />;
  }

}
