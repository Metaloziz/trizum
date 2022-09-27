import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import ItemGame from './item';

export default class extends Component<any, any> {

  result : any[];

  constructor(props : any) {
    super(props);

    this.result = [];

    this.state = {
      active : 0,
      list : []
    };
  }

  onResult = (success : boolean, time : number) => {
    this.result.push({
      success,
      time
    });
  }

  onNext = () => {
    const {
      list = []
    } = this.state;

    let active = this.state.active + 1;

    if(active >= list.length) {
      this.props.onEnd(this.result);
      return;
    }

    this.setState({
      active
    });
  }

  componentDidMount() {
    const {
      list = []
    } = this.props;

    this.setState({
      active : 0,
      list : list
    });
  }

  render() {
    const {
      active = 0,
      list = []
    } = this.state;

    const {
      delay = 1000
    } = this.props;

    const activeItem = list[active];

    if(typeof activeItem == 'undefined') {
      return null;
    }

    return <ItemGame
      key={`item-${active}`}
      item={activeItem}
      delay={delay}
      onResult={this.onResult}
      onNext={this.onNext}
      isLast={active == (list.length - 1)}
    />;
  }

}
