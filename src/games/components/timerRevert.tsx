import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class extends Component<any, any> {

  timer : any;

  constructor(props : any) {
    super(props);

    this.timer = false;

    this.state = {
      start : +(new Date),
      time : props.time || 3
    };
  }

  componentDidMount() {
    this.startTick();
  }

  componentWillUnmount() {
    if(this.timer === false) {
      return;
    }

    clearTimeout(this.timer);
  }

  startTick = () => {
    this.timer = setTimeout(() => {
      this.onTick();
    }, 1000);
  }

  onTick = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const now = +(new Date);
    const range = Math.round((now - this.state.start) / 1000);

    let time = this.state.time - range;

    if(time < 0) {
      time = 0;
    }

    this.setState({
      start : now,
      time
    }, () => {
      if(time == 0) {
        onEnd();
      } else {
        this.startTick();
      }
    });
  }

  clear = () => {
    if(this.timer) {
      clearTimeout(this.timer);
    }

    this.setState({
      start : +(new Date),
      time : this.props.time || 3
    }, this.startTick);
  }

  getValue = () => {
    return this.state.time;
  }

  render() {
    const {
      time
    } = this.state;

    const {
      renderTime = () => null,
      renderComponent = () => null
    } = this.props;

    if(time <= 0) {
      return <>
        {renderComponent()}
      </>;
    }

    return <>
      {renderTime(time)}
    </>;
  }

}
