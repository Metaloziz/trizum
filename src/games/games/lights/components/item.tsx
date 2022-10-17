import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { rand } from '../../../common/utils';

const fps = 60;
const tick = 1000/fps;

const ITEM_WIDTH = 29;
const ITEM_HEIGHT = 25;

const ITEM_STEP = 1;
const ITEM_DIRECTION_COUNT = 50;

const imageItem = require('../assets/item.png');

export default class extends Component<any, any> {

  timer : any;
  direction : any;
  directionCount : any;

  constructor(props : any) {
    super(props);

    this.timer = false;
    this.direction = '';
    this.directionCount = 0;

    this.state = {
      position : this.generateStart()
    };
  }

  generateStart = () => {
    const {
      width,
      height
    } = this.props;

    const x = rand(0, width - ITEM_WIDTH);
    const y = rand(0, height - ITEM_HEIGHT);

    return [x, y];
  }

  inLayout = (x : number, y : number) => {
    const {
      width,
      height
    } = this.props;

    const availableWidth = width - ITEM_WIDTH;
    const availableHeight = height - ITEM_HEIGHT;

    if(x < 0 || x > availableWidth) {
      return false;
    }

    if(y < 0 || y > availableHeight) {
      return false;
    }

    return true;
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
      flight = true
    } = this.props;

    if(!flight) {
      this.tick();
      return;
    }

    const {
      position
    } = this.state;

    const canLeft = this.inLayout(position[0] - ITEM_STEP, position[1]);
    const canRight = this.inLayout(position[0] + ITEM_STEP, position[1]);
    const canTop = this.inLayout(position[0], position[1] - ITEM_STEP);
    const canBottom = this.inLayout(position[0], position[1] + ITEM_STEP);

    const variants = [];
    const setPosition = position.slice();

    if(canLeft) {
      variants.push('left');
    }
    if(canRight) {
      variants.push('right');
    }
    if(canTop) {
      variants.push('top');
    }
    if(canBottom) {
      variants.push('bottom');
    }

    let direction = variants[rand(0, variants.length - 1)];

    if(this.direction != '' && !!variants.find(a => a == this.direction)) {
      direction = this.direction;
      this.directionCount--;

      const canDirectionAnother = [''];

      if(this.direction == 'top' || this.direction == 'bottom') {
        if(canLeft) {
          canDirectionAnother.push('left');
        }

        if(canRight) {
          canDirectionAnother.push('right');
        }
      } else {
        if(canLeft) {
          canDirectionAnother.push('top');
        }

        if(canRight) {
          canDirectionAnother.push('bottom');
        }
      }

      const tempDir = canDirectionAnother[rand(0, canDirectionAnother.length - 1)];

      switch(tempDir) {
        case 'left':
          setPosition[0] -= ITEM_STEP;
        break;
        case 'right':
          setPosition[0] += ITEM_STEP;
        break;
        case 'top':
          setPosition[1] -= ITEM_STEP;
        break;
        case 'bottom':
          setPosition[1] += ITEM_STEP;
        break;
      }

      if(this.directionCount <= 0) {
        this.direction = '';
      }
    } else {
      this.direction = direction;
      this.directionCount = ITEM_DIRECTION_COUNT;
    }

    switch(direction) {
      case 'left':
        setPosition[0] -= ITEM_STEP;
      break;
      case 'right':
        setPosition[0] += ITEM_STEP;
      break;
      case 'top':
        setPosition[1] -= ITEM_STEP;
      break;
      case 'bottom':
        setPosition[1] += ITEM_STEP;
      break;
    }

    this.setState({
      position : setPosition
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
      onPress
    } = this.props;
    const {
      position = []
    } = this.state;

    return <TouchableOpacity
      style={{
        width : ITEM_WIDTH,
        height : ITEM_HEIGHT,
        left : position[0],
        top : position[1],
        ...styles.item
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={imageItem}
        style={styles.image}
      />
    </TouchableOpacity>;
  }

}

const styles = StyleSheet.create({
  item : {
    position : 'absolute',
  },
  image : {
    width : '100%',
    height : '100%',
    resizeMode : 'contain'
  }
});
