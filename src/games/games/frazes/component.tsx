import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Game, GameResult } from '../../common/types';
import { Fraze, VirtualKeyboard } from './components';

import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';
import StartTimer from '../../components/startTimer';

import { DictionaryFraze, DictionaryType, Props } from './types';

const imageBackground = require('./assets/background.png');

const START_TIMER = 3;

type GameStatisticItem = {
  result: boolean;
  gameEngineLevel: DictionaryType;
};

interface State {
  started: boolean;
  success: number;
  errors: number;
  level: number;
  words: DictionaryFraze[];
  userWord: string;
  wordsFull: boolean;
  visibleWord: boolean;
  gameEngineLevel: DictionaryType;
  gameStatistic: GameStatisticItem[];
}

export default class extends Component<Props, State> implements Game {
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
      gameEngineLevel: 'normal',
      userWord: '',
      wordsFull: false,
      visibleWord: true,
      gameStatistic: [],
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
      visibleWord: true,
      gameStatistic: [],
      gameEngineLevel: 'normal',
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
    const { wordsFull, words } = this.props;
    this.setState({ wordsFull, words });
    this.setVisible(false, true);
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;

    const {success, errors} = this.state;

    const time = this.timerAll?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success,
      failed: errors,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  upgradeEngineLevel = (currentEngineLevel: DictionaryType) =>
    currentEngineLevel === 'normal' ? 'hard' : currentEngineLevel === 'easy' ? 'normal' : 'easy';

  downgradeEngineLevel = (currentEngineLevel: DictionaryType) =>
    currentEngineLevel === 'normal' ? 'easy' : currentEngineLevel === 'hard' ? 'normal' : 'hard';

  gameEngine = (result: boolean) => {
    const {
      level: currentLevel,
      gameStatistic: currentGameStatistic,
      gameEngineLevel: currentGameEngineLevel,
      words,
    } = this.state;
    const { changeLevelDictionary, errorLevel } = this.props;

    const gameStatistic = [
      ...currentGameStatistic,
      { result, gameEngineLevel: currentGameEngineLevel },
    ];

    let gameEngineLevel: DictionaryType = currentGameEngineLevel;

    const results = [...currentGameStatistic.map(({ result }) => result), result];

    const lastLevelsResult = results.slice(-changeLevelDictionary);

    let success = 0;
    let errors = 0;

    lastLevelsResult.forEach(result => {
      if (result) {
        errors = 0;
        success++;
      } else {
        success = 0;
        errors++;
      }
    });

    const counterCurrentLevel = gameStatistic
      .slice(-changeLevelDictionary)
      .filter(({ gameEngineLevel }) => gameEngineLevel === currentGameEngineLevel);

    const isLastLevel = words.length - 1 === currentLevel;

    if (success === changeLevelDictionary) {
      if (currentGameEngineLevel !== 'hard') {
        if (counterCurrentLevel.length === changeLevelDictionary) {
          gameEngineLevel = this.upgradeEngineLevel(currentGameEngineLevel);
        }
      }
    }

    if (errors === errorLevel) {
      if (currentGameEngineLevel !== 'easy') {
        gameEngineLevel = this.downgradeEngineLevel(currentGameEngineLevel);
      }
    }

    this.setState({
      gameStatistic,
      gameEngineLevel,
      level: isLastLevel ? currentLevel : currentLevel + 1,
    });
  };

  onResult = (result: boolean) => {
    const { errorAacceptable } = this.props;
    const { words, level } = this.state;
    const success = this.state.success + (result ? 1 : 0);
    const errors = this.state.errors + (result ? 0 : 1);

    this.gameEngine(result);

    if (!(errors >= errorAacceptable) && level + 1 < words.length) {
      this.setVisible(false);
    }

    this.setState(
      (prev) => ({ ...prev, success, errors, userWord: '', visibleWord: true }),
      () => {
        if (errors >= errorAacceptable) {
          return this.end('lose');
        }

        if (success >= words.length || level === words.length - 1) {
          return this.end('win');
        }
      },
    );
  };

  updateUserWord = (char: string) =>
    this.setState((prev) => ({ ...prev, userWord: prev.userWord + char }));

  backSpace = () => {
    const { userWord } = this.state;
    this.setState({ userWord: userWord.slice(0, userWord.length - 1) });
  };

  setVisible = (visibleWord: boolean, init = false) => {
    const { speed } = this.props;
    const timer = init ? START_TIMER * 1000 : START_TIMER;

    setTimeout(() => this.setState({ visibleWord: visibleWord }), speed + timer);
  };

  renderInner = () => {
    const { width, timeComplete, words } = this.props;

    const {
      level = 0,
      gameEngineLevel,
      userWord,
      errors,
      wordsFull,
      visibleWord,
      gameStatistic,
    } = this.state;

    const levels = [];

    for (let i = 0; i < words.length; i++) {
      const result = gameStatistic[i];
      levels.push(
        <View key={`level-${i}`} style={styles.level}>
          {i <= level && result && result.result === true && <View style={styles.levelSuccess} />}
          {i <= level && result && result.result === false && <View style={styles.levelError} />}
          {i <= level && !result && <View style={styles.levelInner} />}
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
        <View style={styles.сontent}>
          <Fraze
            words={this.state.words}
            userWord={userWord}
            level={level}
            onResult={this.onResult}
            visibleWord={visibleWord}
            wordsFull={wordsFull}
            errors={errors}
            gameEngineLevel={gameEngineLevel}
          />
          <VirtualKeyboard
            onKeyPress={this.updateUserWord}
            backspaceHandler={this.backSpace}
            visibleWord={this.state.visibleWord}
          />
        </View>
        <TimerAll ref={(ref) => (this.timerAll = ref)} />
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
  levelStatistic: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  levelInner: {
    backgroundColor: '#7F28D9',
  },
  levelSuccess: {
    backgroundColor: 'green',
  },
  levelError: {
    backgroundColor: 'red',
  },
  сontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
