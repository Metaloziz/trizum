import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class extends Component<any, any> {

  timer : any = false;

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

  render() {
    const {
      time
    } = this.state;

    const {
      colors = ['#fff', '#f44336', '#43a047', '#1e88e5'],
      renderComponent = () => null
    } = this.props;

    if(time <= 0) {
      return <>
        {renderComponent()}
      </>;
    }

    const color = colors[time] || colors[colors.length - 1];

    return <View style={styles.wrap}>
      <View style={styles.wrapInner}>
        <View
          style={{
            ...styles.overlay,
            backgroundColor : color
          }}
        />
        <View
          style={{
            ...styles.inner,
            backgroundColor : color
          }}
        >
          <Text style={styles.title}>
            {time}
          </Text>
        </View>
      </View>
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1,
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  },
  inner : {
    width : 110,
    height : 110,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 55
  },
  title : {
    textAlign : 'center',
    color : '#fff',
    fontSize : 32
  },
  wrapInner : {
    width : 130,
    height : 130,
    alignItems : 'center',
    justifyContent : 'center',
  },
  overlay : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    opacity : 0.6,
    borderRadius : 65
  }
});
