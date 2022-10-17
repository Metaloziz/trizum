import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Props } from './types';

import Timer from '../../components/timerRevert';
import StartTimer from '../../components/startTimer';

import { Game, GameResult } from '../../common/types';

import LevelView from './components/level';

const START_TIMER = 3;

const imageBackground = require('./assets/background.png');

export default class extends Component<any, any> implements Game {

  constructor(props : any) {
    super(props);

    this.state = {
      success : 1,
      errors : 0,
      level : 0,
      started : false,
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
      level : 0,
      success : 0,
      errors : 0
    });
  }

  private reset = (cb : any) => {
    this.setState({
      started : false,
      level : 0,
      success : 0,
      errors : 0
    }, cb);
  }

  onNext = () => {
    this.startLogic();
  }

  startLogic = () => {
    const {
      elementsTotal
    } = this.props;


  }

  public getConfig = () => {
    return [
      {
        name : 'timeComplete',
        type : 'select',
        title : 'Время на прохождение',
        option : [10, 15, 30, 60, 120, 180].map(a => ({
          title : `${a} сек`,
          value : a
        })),
        value : 10
      },
      {
        name : 'elementsTotal',
        type : 'select',
        title : 'Количество правильных ответов',
        option : [2, 3, 4].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 2
      },
      {
        name : 'errorAacceptable',
        type : 'select',
        title : 'Допустимое количество ошибок',
        option : [2, 3, 4].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 2
      },
      {
        name : 'speed',
        type : 'select',
        title : 'Время на запоминание',
        option : [1000, 2000, 3000].map(a => ({
          title : `${a} ms`,
          value : a
        })),
        value : 2000
      }
    ];
  }

  public prepareConfig = (result : any) => {
    return {
      timeComplete : parseInt(result.timeComplete),
      elementsTotal : parseInt(result.elementsTotal),
      errorAacceptable : parseInt(result.errorAacceptable),
      speed : parseInt(result.speed),
    };
  }

  onEnd = () => {
    this.end('lose');
  }

  private end = (status = 'win') => {
    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : status == 'win' ? 'win' : 'lose',
      success : this.state.success,
      failed : this.state.errors,
    };

    onEnd(result);

    this.stop();
  }

  onResult = (result : boolean) => {
    const {
      elementsTotal,
      errorAacceptable,
      onFeedbackSuccess = () => {},
      onFeedbackError = () => {}
    } = this.props;

    const level = this.state.level + 1;
    const success = this.state.success + (result ? 1 : 0);
    const errors = this.state.errors + (result ? 0 : 1);

    if(result) {
      onFeedbackSuccess();
    } else {
      onFeedbackError();
    }

    this.setState({
      level,
      success,
      errors
    }, () => {
      if(errors >= errorAacceptable) {
        this.end('lose');
      }

      if(success >= elementsTotal) {
        this.end('win');
      }
    });
  }

  renderInner = () => {
    const {
      level = 0,
      success = 0
    } = this.state;

    const {
      width,
      elementsTotal,
      timeComplete
    } = this.props;

    const levels = [];

    for(let i = 0;i<elementsTotal;i++) {
      levels.push(<View
        key={`level-${i}`}
        style={styles.level}
      >
        {i < success && <View
          style={styles.levelInner}
        />}
      </View>);
    }

    return <View
        style={{
          minHeight : width,
          ...styles.inner
        }}
      >
      <Image
        source={imageBackground}
        style={styles.background}
      />
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
      <View style={styles.wrapLevels}>
        {levels}
      </View>
      <LevelView
        key={`level-${level}`}
        onResult={this.onResult}
        {...this.props}
      />
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
  progressTime : {
    height : 6,
    backgroundColor : '#E6EEF8',
    borderRadius : 3,
    overflow : 'hidden',
    marginTop : 12,
    marginHorizontal : 12
  },
  progressTimeInner : {
    height : '100%',
    backgroundColor : '#7427CC',
    borderRadius : 2,
  },
  wrapLevels : {
    flexDirection : 'row',
    justifyContent : 'center',
    marginVertical : 12
  },
  level : {
    backgroundColor : '#fff',
    width : 26,
    height : 26,
    marginHorizontal : 6,
    borderRadius : 15,
    alignItems : 'center',
    justifyContent : 'center'
  },
  levelInner : {
    backgroundColor : '#7F28D9',
    width : 20,
    height : 20,
    borderRadius : 10
  }
});
