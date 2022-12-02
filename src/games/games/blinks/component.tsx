import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LevelStatistic, Props } from './types';

import Timer from '../../components/timer';
import StartTimer from '../../components/startTimer';
import TimerRevert from '../../components/timerRevert';
import { preloadFile as SoundPreload } from '../../common/sound';
import { rand } from '../../common/utils';

import BlinkView from './components/blink';

import { Game, GameResult } from '../../common/types';

const SPACE = 10;
const START_TIMER = 3;
const DELAY = 1200;

const SOUND_DO = require('./assets/do.mp3');
const SOUND_RE = require('./assets/re.mp3');
const SOUND_MI = require('./assets/mi.mp3');
const SOUND_FA = require('./assets/fa.mp3');
const SOUND_SOL = require('./assets/sol.mp3');
const SOUND_LYA = require('./assets/lya.mp3');
const SOUND_SI = require('./assets/si.mp3');
const SOUND_DO2 = require('./assets/do2.mp3');
const SOUND_MI2 = require('./assets/mi2.mp3');
const SOUND_RE2 = require('./assets/re2.mp3');

interface State {
  level: number;
  levels: any[];
  stage: 'listen' | 'repeat';
  blink: any;
  started: boolean;
  levelBlink: number;
  levelStatistic: LevelStatistic[];
}

export default class extends Component<Props, State> implements Game {
  timerRef: any;
  soundItems: any;
  blinks: any;
  blinksPress: any;
  blinksRef: any;
  successPress: number;
  failPress: number;
  result: GameResult;

  constructor(props: any) {
    super(props);

    this.soundItems = [];
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    this.result = {
      result: 'win',
      time: 0,
      levelMaxCompleted: 0,
      success: 0,
      failed: 0,
      finished: true,
    };

    this.state = {
      level: 0,
      levels: [],
      stage: 'listen',
      blink: false,
      started: false,
      levelBlink: 0,
      levelStatistic: [],
    };
  }

  componentDidMount() {
    const { onRef = () => {}, blinksCount } = this.props;

    onRef(this);
    this.setState({ levelBlink: blinksCount });
  }

  public resume = () => {
    this.setState({
      started: true,
    });
  };

  public start = () => {
    this.soundItems = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    Promise.all([
      SoundPreload(SOUND_DO),
      SoundPreload(SOUND_RE),
      SoundPreload(SOUND_MI),
      SoundPreload(SOUND_FA),
      SoundPreload(SOUND_SOL),
      SoundPreload(SOUND_LYA),
      SoundPreload(SOUND_SI),
      SoundPreload(SOUND_DO2),
      SoundPreload(SOUND_MI2),
      SoundPreload(SOUND_RE2),
    ]).then(list => {
      this.soundItems = list;

      this.reset(() => {
        this.onNext();
        this.resume();
      });
    });
  };

  public stop = () => {
    const { blinksCount } = this.props;
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    this.setState({
      level: 0,
      levels: [],
      stage: 'listen',
      blink: false,
      started: false,
      levelStatistic: [],
      levelBlink: blinksCount,
    });
  };

  private reset = (cb: any) => {
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    this.setState(
      {
        level: 0,
        levels: [],
        stage: 'listen',
        blink: false,
        started: false,
      },
      cb,
    );
  };

  onNext = () => {
    setTimeout(() => {
      this.startLogic();
    }, (START_TIMER + 1) * 1000);
  };

  onNextLevel = () => {
    const { levelChangeEngine, upgradeBlink, downgradeBlink, errorLevel } = this.props;
    const { levelBlink: currentLevelBlink, levelStatistic } = this.state;

    let levelBlink = currentLevelBlink;
    const lastLevels = levelStatistic.slice(-levelChangeEngine);

    let success = 0;
    let errors = 0;

    lastLevels.forEach(({ result }) => {
      if (result) {
        errors = 0;
        success++;
      } else {
        success = 0;
        errors++;
      }
    });

    const counterCurrentBlinks = levelStatistic
      .slice(-levelChangeEngine)
      .filter(({ blinksCount }) => blinksCount === levelBlink);

    if (success === levelChangeEngine) {
      if (counterCurrentBlinks.length === levelChangeEngine) {
        levelBlink += upgradeBlink;
      }
    }

    if (errors === errorLevel && levelBlink > 1) {
      levelBlink -= downgradeBlink;
    }

    this.setState({
      levelBlink,
    });

    setTimeout(() => {
      this.setState(
        {
          stage: 'listen',
          blink: true,
        },
        () => {
          this.startLogic();
        },
      );
    }, 1000);
  };

  startLogic = async () => {
    const { colorsMap } = this.props;
    const { levelBlink: blinksCount } = this.state;

    const data = [];

    for (let r = 0; r < blinksCount; r++) {
      data.push(rand(0, colorsMap.length - 1));
    }

    this.blinks = data.slice();
    this.blinksPress = [];

    for (let i = 0; i < data.length; i++) {
      await this.onBlink(data[i], i == 0);
    }

    setTimeout(() => {
      this.setState({
        blink: false,
        stage: 'repeat',
      });
    }, DELAY);
  };

  onBlink = async (value: any, skipDelay = false) => {
    return new Promise(resolve => {
      setTimeout(
        () => {
          this.blinksRef?.[value]?.onBlink();
          resolve(true);
        },
        skipDelay ? 0 : DELAY,
      );
    });
  };

  onPress = (index: number) => () => {
    const needIndex = this.blinks[this.blinksPress.length];

    if (index == needIndex) {
      this.blinksPress.push(index);

      this.successPress++;

      if (this.blinksPress.length >= this.blinks.length) {
        this.end('win');
      }
    } else {
      this.failPress++;
      this.end('lose');
    }
  };

  private end = (status = 'win') => {
    const { levelMaxCompleted } = this.props;

    const {
      level,
      levelStatistic: currentLevelStatistic,
      levelBlink: currentLevelBlink,
    } = this.state;

    const time = this.timerRef?.getValue();

    this.result.time += time;
    this.result.levelMaxCompleted = status == 'win' ? level + 1 : this.result.levelMaxCompleted;
    this.result.success = this.successPress;
    this.result.failed = this.failPress;

    const levelStatistic = [
      ...currentLevelStatistic,
      { result: status === 'win', blinksCount: currentLevelBlink },
    ];

    if (level + 1 < levelMaxCompleted) {
      this.setState(
        {
          level: level + 1,
          levelStatistic,
        },
        () => {
          this.onNextLevel();
        },
      );
      return;
    }

    const { onEnd = () => {} } = this.props;

    onEnd(this.result);

    this.stop();
  };

  onEndTime = () => {
    const time = this.timerRef?.getValue();

    this.result.time += time;
    this.result.success = this.successPress;
    this.result.failed = this.failPress;
    this.result.finished = false;

    const { onEnd = () => {} } = this.props;

    onEnd(this.result);

    this.stop();
  };

  onRefBlink = (index: any) => (ref: any) => {
    this.blinksRef[index] = ref;
  };

  renderInner = () => {
    const { width, colorsMap, sound = 1, levelMaxCompleted = 5, timeComplete = 3 } = this.props;

    const { started, blink = false, stage = 'listen', level = 0 } = this.state;

    const sizeBlink = Math.round((width - (colorsMap.length - 1) * SPACE) / colorsMap.length);

    return (
      <>
        {levelMaxCompleted > 1 && (
          <Text style={styles.levels}>
            Уровень {level + 1}/{levelMaxCompleted}
          </Text>
        )}
        {timeComplete > 0 && (
          <View style={styles.progressTime}>
            <TimerRevert
              time={timeComplete}
              onEnd={this.onEndTime}
              renderComponent={() => (
                <View
                  style={{
                    ...styles.progressTimeInner,
                    width: `100%`,
                  }}
                />
              )}
              renderTime={(t: any) => {
                let progress = ((timeComplete - t) / timeComplete) * 100;

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
        <View style={styles.wrapTop}>
          <Text style={styles.title}>{stage == 'listen' ? 'Запоминай' : 'Повторяй'}</Text>
        </View>
        <View
          style={{
            ...styles.game,
            width: width,
            height: width,
          }}
        >
          {colorsMap.map((a: any, index: number) => (
            <BlinkView
              key={`blink-${index}`}
              ref={this.onRefBlink(index)}
              color={a}
              size={sizeBlink}
              active={index === blink}
              onPress={stage == 'repeat' ? this.onPress(index) : undefined}
              sound={sound === 1 ? this.soundItems[index] : undefined}
            />
          ))}
        </View>
        <View style={styles.wrapBottom}>
          {started && stage == 'repeat' && (
            <Timer
              ref={ref => (this.timerRef = ref)}
              renderTime={(time: any) => <Text style={styles.timer}>{time} сек</Text>}
            />
          )}
        </View>
      </>
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
  wrap: {
    marginTop: 12,
    marginBottom: 12,
  },
  game: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  wrapTop: {
    flex: 1,
    minHeight: 40,
  },
  wrapBottom: {
    flex: 1,
    minHeight: 40,
  },
  title: {
    textAlign: 'center',
    color: '#2e8dfd',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  levels: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 12,
  },
  progressTimeInner: {
    height: 6,
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
});
