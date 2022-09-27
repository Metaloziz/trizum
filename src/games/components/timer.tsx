import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default class extends Component<any, any> {

  timer : any;

  constructor(props : any) {
    super(props);

    this.timer = false;

    this.state = {
      start : +(new Date),
      time : 0
    };
  }

  getValue = () => {
    return this.state.time;
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
    const now = +(new Date);
    const range = Math.round((now - this.state.start) / 1000);

    let time = this.state.time + range;

    this.setState({
      start : now,
      time
    }, () => {
      this.startTick();
    });
  }

  clear = () => {
    if(this.timer) {
      clearTimeout(this.timer);
    }

    this.setState({
      start : +(new Date),
      time : 0
    }, this.startTick);
  }

  render() {
    const {
      time
    } = this.state;

    const {
      renderTime = () => {}
    } = this.props;

    return <>
      {renderTime(time)}
    </>;
  }

}
