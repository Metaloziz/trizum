import React, { Component } from "react";
import { View, PanResponder } from "react-native";

export const swipeDirections = {
  SWIPE_UP: "SWIPE_UP",
  SWIPE_DOWN: "SWIPE_DOWN",
  SWIPE_LEFT: "SWIPE_LEFT",
  SWIPE_RIGHT: "SWIPE_RIGHT"
};

const swipeConfig = {
  velocityThreshold: 0.1,
  directionalOffsetThreshold: 120,
  gestureIsClickThreshold: 5
};

function isValidSwipe(
  velocity : any,
  velocityThreshold : any,
  directionalOffset : any,
  directionalOffsetThreshold : any
) {
  const validSwipe = Math.abs(velocity) > velocityThreshold &&
  Math.abs(directionalOffset) < directionalOffsetThreshold;

  console.log('Valid swipe: ', validSwipe);
  console.log('Valid swipe velocity value: ', velocity);
  console.log('Valid swipe velocity: ', Math.abs(velocity) > velocityThreshold);
  console.log('Valid swipe offset: ', Math.abs(directionalOffset) < directionalOffsetThreshold);
  return validSwipe;
}

class SwipeGestures extends Component<any, any> {
  swipeConfig : any;
  _panResponder : any;

  constructor(props : any, context : any) {
    super(props, context);
    this.swipeConfig = Object.assign(swipeConfig, props.config);

    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }

  componentDidUpdate(prevProps : any) {
    if (this.props.config !== prevProps.config) {
      this.swipeConfig = Object.assign(swipeConfig, this.props.config);
    }
  }

  _handleShouldSetPanResponder(evt : any, gestureState : any) {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !this._gestureIsClick(gestureState)
    );
  }

  _gestureIsClick(gestureState : any) {
    return (
      Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold
    );
  }

  _handlePanResponderEnd(evt : any, gestureState : any) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection, gestureState);
  }

  _triggerSwipeHandlers(swipeDirection : any, gestureState : any) {
    const {
      onSwipe,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight
    } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
    }
  }

  _getSwipeDirection(gestureState : any) {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gestureState;
    if (this._isValidHorizontalSwipe(gestureState)) {
      return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    } else if (this._isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState : any) {
    const { vx, dy } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  _isValidVerticalSwipe(gestureState : any) {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  render() {
    return <View {...this.props} {...this._panResponder.panHandlers} />;
  }
}

export default SwipeGestures;
