import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LevelStatistic, Props } from './types';

import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';
import StartTimer from '../../components/startTimer';

import { Game, GameResult } from '../../common/types';

import LevelView from './components/level';

const HEIGHT_AREA = 680;
const START_TIMER = 3;

const imageBackground = require('./assets/background.png');

interface State {
  success: number;
  errors: number;
  level: number;
  started: boolean;
  levelStatistic: LevelStatistic[];
  gameSpeed: number;
}

export default class extends Component<Props, State> implements Game {
  timer: any;
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      success: 1,
      errors: 0,
      level: 0,
      started: false,
      levelStatistic: [],
      gameSpeed: 0,
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);
  }

  public resume = () => {
    this.setState({
      started: true,
    });
  };

  public start = () => {
    this.reset(() => {
      this.onNext();
      this.resume();
    });
  };

  public stop = () => {
    this.setState({
      started: false,
      level: 0,
      success: 0,
      errors: 0,
    });
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
        level: 0,
        success: 0,
        errors: 0,
      },
      cb,
    );
  };

  onNext = () => {
    this.startLogic();
  };

  startLogic = () => {
    const { speed } = this.props;
    this.setState({ gameSpeed: speed, levelStatistic: [] });
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success: this.state.success,
      failed: this.state.errors,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  private engineTrigger = (result: boolean) => {
    const { levelStatistic: currentLevelStatistic, gameSpeed: currentSpeed } = this.state;

    const { perSuccessLevel, maxErrorLevel, upgrade } = this.props;

    let gameSpeed = currentSpeed;

    const levelStatistic = [...currentLevelStatistic, { speed: currentSpeed, result }];

    const lastLevels = levelStatistic.slice(-perSuccessLevel);

    const counterCurrentSpeed = lastLevels.filter(({ speed }) => speed === currentSpeed);

    if (perSuccessLevel === counterCurrentSpeed.length) {
      const { length: errors } = levelStatistic.filter(({ result }) => !result);
      if (errors >= maxErrorLevel) {
        gameSpeed += (gameSpeed * upgrade) / 100;
      }
      if (errors < maxErrorLevel) {
        gameSpeed -= (gameSpeed * upgrade) / 100;
      }
    }

    this.setState({ levelStatistic, gameSpeed });
  };

  onResult = (result: boolean) => {
    const {
      elementsTotal,
      errorAacceptable,
      onFeedbackSuccess = () => {},
      onFeedbackError = () => {},
    } = this.props;

    const { level: currentLevel, success: currentSuccess, errors: currentErrors } = this.state;

    const level = currentLevel + 1;
    const success = currentSuccess + (result ? 1 : 0);
    const errors = currentErrors + (result ? 0 : 1);

    if (result) {
      onFeedbackSuccess();
    } else {
      onFeedbackError();
    }

    this.engineTrigger(result);

    this.setState(
      {
        level,
        success,
        errors,
      },
      () => {
        if (errors >= errorAacceptable) {
          this.end('lose');
        }

        if (success >= elementsTotal) {
          this.end('win');
        }
      },
    );
  };

  renderInner = () => {
    const { level = 0, success = 0, gameSpeed } = this.state;

    const { width, elementsTotal, timeComplete } = this.props;

    const levels = [];

    for (let i = 0; i < elementsTotal; i++) {
      levels.push(
        <View key={`level-${i}`} style={styles.level}>
          {i < success && <View style={styles.levelInner} />}
        </View>,
      );
    }

    return (
      <View
        style={{
          minHeight: HEIGHT_AREA,
          ...styles.inner,
        }}
      >
        <Image source={imageBackground} style={styles.background} />
        <View style={styles.gameBoard}>
          {timeComplete && timeComplete > 0 && (
            <View style={styles.progressTime}>
              <Timer
                ref={ref => (this.timer = ref)}
                time={timeComplete}
                onEnd={this.onEnd}
                renderComponent={() => (
                  <View
                    style={{
                      ...styles.progressTimeInner,
                      width: `100%`,
                    }}
                  />
                )}
                renderTime={(time: number) => {
                  let progress = ((timeComplete - time) / timeComplete) * 100;

                  if (progress > 100) {
                    progress = 100;
                  }

                  return (
                    <View
                      style={{
                        ...styles.progressTimeInner,
                        width: `${progress}%`,
                      }}
                    />
                  );
                }}
              />
            </View>
          )}
          <View style={styles.wrapLevels}>{levels}</View>
          <LevelView
            key={`level-${level}`}
            onResult={this.onResult}
            speed={gameSpeed}
            width={width}
          />
          <TimerAll
            ref={(ref: any) => (this.timerAll = ref)}
            renderTime={(time: number) => <Text style={styles.timer}>{time} сек</Text>}
          />
        </View>
      </View>
    );
  };

  render() {
    const { width } = this.props;

    const { started } = this.state;

    return (
      <View
        style={{
          ...styles.wrap,
          width: width,
        }}
      >
        {started && <StartTimer time={START_TIMER} renderComponent={this.renderInner} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
  },
  wrap: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gameBoard: {
    maxWidth: 770,
    marginHorizontal: 'auto',
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
    marginHorizontal: 12,
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
  wrapLevels: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  level: {
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    marginHorizontal: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInner: {
    backgroundColor: '#7F28D9',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
