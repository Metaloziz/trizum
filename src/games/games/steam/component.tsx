import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Props } from './types';

import { Game, GameResult } from '../../common/types';

import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';

import SteamItem from './components/item';

const START_TIMER = 3;

const imageBackground = require('./assets/background.png');
const imageDot = require('./assets/dot.png');

export default class extends Component<any, any> implements Game {

  constructor(props : any) {
    super(props);

    this.state = {
      started : false,
      score : 0
    };
  }

  componentDidMount() {
    const {
      onRef = () => {}
    } = this.props;

    onRef(this);

    // this.reset();
    // this.start();
  }

  public resume = () => {
    this.setState({
      started : true
    });
  }

  public start = () => {
    this.reset(() => {
      this.onNext();
      this.resume();
    });
  }

  public stop = () => {
    this.setState({
      started : false,
      score : 0
    });
  }

  private reset = (cb : any) => {
    this.setState({
      started : false,
      score : 0
    }, cb);
  }

  onScore = (scoreAdd : number) => {
    const {
      score = 0
    } = this.state;

    const {
      errorAacceptable = 1,
      elementsTotal = 1,
      onFeedbackError = () => {},
      onFeedbackSuccess = () => {},
    } = this.props;

    const addSum = scoreAdd > 0 ? 1 : -errorAacceptable;

    if(addSum > 0) {
      onFeedbackSuccess();
    } else {
      onFeedbackError();
    }

    let scoreSet = score + addSum;

    if(scoreSet < 0) {
      scoreSet = 0;
    }

    if(scoreSet >= elementsTotal) {
      this.onWin();
    }

    this.setState({
      score : scoreSet
    });
  }

  onNext = () => {
    setTimeout(() => {
      this.startLogic();
    }, (START_TIMER + 1) * 1000);
  }

  public getConfig = () => {
    return [
      {
        name : 'groupsCount',
        type : 'select',
        title : 'Количество манометров',
        option : [1, 2, 3, 4].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 1
      },
      {
        name : 'timeComplete',
        type : 'select',
        title : 'Время на прохождение уровня',
        option : [30, 60, 120, 180].map(a => ({
          title : `${a} сек`,
          value : a
        })),
        value : 30
      },
      {
        name : 'elementsTotal',
        type : 'select',
        title : 'Количество правильных попаданий по манометру',
        option : [5, 10, 20, 30].map(a => ({
          title : `${a} раз`,
          value : a
        })),
        value : 5
      },
      {
        name : 'errorAacceptable',
        type : 'select',
        title : 'Штраф за ошибку',
        option : [1, 2, 3].map(a => ({
          title : `-${a}`,
          value : a
        })),
        value : 1
      },
      {
        name : 'speed',
        type : 'select',
        title : 'Скорость стрелки(обороты в секунду)',
        option : [0.5, 1, 1.5].map(a => ({
          title : `${a} оборотов`,
          value : a
        })),
        value : 0.5
      },
    ];
  }

  public prepareConfig = (result : any) => {
    return {
      timeComplete : parseInt(result.timeComplete),
      elementsTotal : parseInt(result.elementsTotal),
      errorAacceptable : parseInt(result.errorAacceptable),
      speed : parseFloat(result.speed),
      groupsCount : parseInt(result.groupsCount)
    };
  }

  startLogic = () => {}

  onWin = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : 'win'
    };

    onEnd(result);

    this.stop();
  }

  onEnd = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : 'lose'
    };

    onEnd(result);

    this.stop();
  }

  renderInner = () => {
    const {
      width,
      speed,
      groupsCount,
      timeComplete,
      elementsTotal,
      area
    } = this.props;

    const {
      score = 0
    } = this.state;

    let scoreProgress = (score / elementsTotal) * 100;

    if(scoreProgress < 0) {
      scoreProgress = 0;
    }
    if(scoreProgress > 100) {
      scoreProgress = 100;
    }

    const steamArray = [];

    for(let i = 0;i<groupsCount;i++) {
      steamArray.push(<View
        key={`steam-${i}`}
        style={styles.wrapItem}
      >
        <SteamItem
          speed={speed}
          onScore={this.onScore}
          area={area}
        />
      </View>);
    }

    return <View
      style={{
        ...styles.inner,
        minHeight : width
      }}
    >
      <Image
        source={imageBackground}
        style={styles.background}
      />
      <View style={styles.wrapTop}>
        <View style={styles.progressTime}>
          <Timer
            ref='timer'
            time={timeComplete}
            onEnd={this.onEnd}
            renderComponent={() => <View
              style={{
                ...styles.progressTimeInner,
                width : `100%`
              }}
            />}
            renderTime={(t : any) => {
              let progress = ((timeComplete - t) / timeComplete) * 100;

              if(progress > 100) {
                progress = 100;
              }

              return <View
                style={{
                  ...styles.progressTimeInner,
                  width : `${progress}%`
                }}
              />
            }}
          />
        </View>
        <View style={styles.wrapScore}>
          <View
            style={{
              ...styles.progressScore,
              width : `${scoreProgress}%`
            }}
          />
        </View>
      </View>
      <View style={styles.wrapperItems}>
        <Image
          source={imageDot}
          style={[styles.dot, styles.dotLeft, styles.dotTop]}
        />
        <Image
          source={imageDot}
          style={[styles.dot, styles.dotRight, styles.dotTop]}
        />
        <Image
          source={imageDot}
          style={[styles.dot, styles.dotLeft, styles.dotBottom]}
        />
        <Image
          source={imageDot}
          style={[styles.dot, styles.dotRight, styles.dotBottom]}
        />
        <View style={styles.wrapItems}>
          {steamArray}
        </View>
      </View>
    </View>;
  }

  render() {
    const {
      started
    } = this.state;

    const {
      width
    } = this.props;

    return <View
      style={{
        ...styles.wrap,
        width : width
      }}
    >
      {started && <StartTimer
        time={START_TIMER}
        renderComponent={this.renderInner}
      />}
    </View>;
  }

}

const styles = StyleSheet.create({
  wrapItem : {
    margin : 8
  },
  wrapperItems : {
    flex : 1,
    justifyContent : 'center',
    marginVertical : 12
  },
  wrapItems : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    flexWrap : 'wrap',
  },
  wrap : {
    marginTop : 12,
    marginBottom : 12,
    borderRadius : 8,
    overflow : 'hidden'
  },
  inner : {
    flex : 1,
  },
  background : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    resizeMode : 'cover'
  },
  wrapTop : {
    marginHorizontal : 12,
    marginTop : 12
  },
  wrapScore : {
    height : 6,
    backgroundColor : '#E6EEF8',
    borderRadius : 3,
    overflow : 'hidden',
    marginTop : 12
  },
  progressTime : {
    height : 6,
    backgroundColor : '#E6EEF8',
    borderRadius : 3,
    overflow : 'hidden'
  },
  progressTimeInner : {
    height : '100%',
    backgroundColor : '#2E8DFD',
    borderRadius : 2,
  },
  progressScore : {
    height : '100%',
    backgroundColor : '#FF4633',
    borderRadius : 2,
  },
  dot : {
    position : 'absolute',
    width : 30,
    height : 30,
    resizeMode : 'contain'
  },
  dotLeft : {
    left : 4,
  },
  dotRight : {
    right : 4,
  },
  dotTop : {
    top : 4,
  },
  dotBottom : {
    bottom : 0,
  },
});
