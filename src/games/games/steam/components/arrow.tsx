import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Svg, Polygon } from 'react-native-svg';

const width = 12;
const space = 6;

const FPS = 60;

const tick = 1000/FPS;

export default class extends Component<any, any> {

  timer : any;
  correctCount : number;

  constructor(props : any) {
    super(props);

    const {
      range,
      speed = 1
    } = props;

    this.timer = false;


    let start = range[0] + ((range[1] - range[0])/2) + 180;

    if(start > 360) {
      start -= 360;
    }

    this.correctCount = 0;

    this.state = {
      angle : start,
      inRange : false
    };
  }

  isInRange = () => {
    const {
      inRange
    } = this.state;

    if(this.correctCount == 1) {
      return -1;
    }

    this.correctCount = inRange ? 1 : 0;

    return inRange;
  }

  componentWillUnmount() {
    this.clear();
  }

  componentDidMount() {
    this.start();
  }

  start = () => {
    this.tick();
  }

  onTick = () => {
    const {
      angle
    } = this.state;

    
    const {
      range,
      onScore,
      speed
    } = this.props;

    const distance = 360 / (speed/1000); // Общее кол-во градусов в секунду
    const inTick = ((distance / 1000) * tick)*2; // Кол-во градусов в один кадр
    
    let setAngle = angle + inTick;
    let inRange = false;

    if(setAngle > 360) {
      setAngle -= 360;
    }

    if(setAngle >= range[0] && setAngle <= range[1]) {
      inRange = true;
    }

    const lastInRange = this.state.inRange;

    if(lastInRange && !inRange) {
      if(this.correctCount == 0) { // Не успел =(
        onScore(-1);
      }

      this.correctCount = 0;
    }

    this.setState({
      angle : setAngle,
      inRange
    }, () => {
      this.tick();
    });
  }

  tick = () => {
    this.timer = setTimeout(() => {
      this.onTick();
    }, tick);
  }

  clear = () => {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {
      size
    } = this.props;

    const {
      angle = 0,
      inRange = false
    } = this.state;

    const height = (size/2) - space;

    return <View style={styles.wrap}>
      <View
        style={{
          ...styles.inner,
          transform : [
            {
              rotate : `${angle}deg`
            }
          ]
        }}
      >
        <View
          style={{
            ...styles.arrow,
            height : height,
            marginTop : space
          }}
        >
          <Svg height={height} width={width}>
            <Polygon
              points={`0,${height} ${width/2},0 ${width},${height}`}
              fill="#EBEBEB"
              strokeWidth="0"
            />
            <Polygon
              points={`0,${height} ${width/2},0 ${width/2},${height}`}
              fill="#C5C5C5"
              strokeWidth="0"
            />
          </Svg>
        </View>
      </View>
    </View>;
  }

}

const styles = StyleSheet.create({
  arrow : {},
  wrap : {
    flex : 1,
    alignItems : 'center'
  },
  inner : {
    height : '100%',
    width : width
  }
});
