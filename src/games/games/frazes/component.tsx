import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';
import StartTimer from '../../components/startTimer';

import { Game, GameResult } from '../../common/types';

import { Fraze, VirtualKeyboard } from './components';

const imageBackground = require('./assets/background.png');

const START_TIMER = 3;

export default class extends Component<any, any> implements Game {
  timer: any;
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      success: 0,
      errors: 0,
      level: 0,
      words: [],
      userWord: '',
      wordsFull: false,
      visibleWord: true,
    };
  }

  componentDidMount() {
    const { onRef = () => {}, speed } = this.props;

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
      visibleWord: true,
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
    const { wordsFull, words, speed } = this.props;
    console.log(this.props);
    this.setState({ wordsFull, words, speed });
    this.setVisible(false, true);
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;

    const time = this.timerAll?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success: this.state.success,
      failed: this.state.errors,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  onResult = (result: boolean) => {
    const { errorAacceptable } = this.props;
    const { words } = this.state;
    const level = this.state.level + 1;
    const success = this.state.success + (result ? 1 : 0);
    const errors = this.state.errors + (result ? 0 : 1);

    if (!(errors >= errorAacceptable) && level < words.length) {
      this.setVisible(false);
    }

    this.setState(
      (prev: any) => ({ ...prev, level, success, errors, userWord: '', visibleWord: true }),
      () => {
        if (errors >= errorAacceptable) {
          return this.end('lose');
        }

        if (success >= words.length) {
          return this.end('win');
        }
        if (words.length === level) {
          return this.end('win');
        }
      },
    );
  };

  updateUserWord = (char: string) =>
    this.setState((prev: any) => ({ ...prev, userWord: prev.userWord + char }));

  backSpace = () => {
    const { userWord } = this.state;
    this.setState({ userWord: userWord.slice(0, userWord.length - 1) });
  };

  setVisible = (visibleWord: boolean, init = false) => {
    const { speed } = this.props;
    const timer = init ? START_TIMER * 1000 : START_TIMER;
    console.log('set visible ---', { visibleWord, init, timer });
    setTimeout(() => this.setState({ visibleWord }), speed + timer);
  };

  renderInner = () => {
    const { level = 0 } = this.state;

    const { width, timeComplete, words } = this.props;

    const levels = [];

    for (let i = 0; i < words.length; i++) {
      levels.push(
        <View key={`level-${i}`} style={styles.level}>
          {i <= level && <View style={styles.levelInner} />}
        </View>,
      );
    }

    return (
      <View
        style={{
          minHeight: width,
          ...styles.inner,
        }}
      >
        <Image source={imageBackground} style={styles.background} />
        {timeComplete > 0 && (
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
              renderTime={(time: any) => {
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
        <View style={styles.сontent}>
          <Fraze
            words={this.state.words}
            userWord={this.state.userWord}
            level={this.state.level}
            onResult={this.onResult}
            visibleWord={this.state.visibleWord}
            wordsFull={this.state.wordsFull}
            errors={this.state.errors}
          />
          <VirtualKeyboard
            onKeyPress={this.updateUserWord}
            backspaceHandler={this.backSpace}
            visibleWord={this.state.visibleWord}
          />
        </View>
        <TimerAll ref={(ref: any) => (this.timerAll = ref)} />
      </View>
    );
  };

  render() {
    const { started } = this.state;

    const { width } = this.props;

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
  сontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
