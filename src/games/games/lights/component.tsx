import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LevelStatistic, Props } from './types';

import TimerRevert from '../../components/timerRevert';
import Timer from '../../components/timer';
import StartTimer from '../../components/startTimer';
import { isWeb } from '../../common/utils';

import { Game, GameResult } from '../../common/types';

import Item from './components/item';

const START_TIMER = 3;
const START_GAME = 5;

const imageBackground = require('./assets/background.png');

interface State {
  level: number;
  ended: boolean;
  started: boolean;
  another: number;
  flight: boolean;
  speedGame: number;
  levelStatistic: LevelStatistic[];
}

export default class extends Component<any, State> implements Game {
  list: any;
  timerRef: any;
  result: any;

  constructor(props: any) {
    super(props);

    this.list = [];

    this.result = {
      time: 0,
      failed: 0,
      success: 0,
      finished: true,
    };

    this.state = {
      level: 0,
      ended: false,
      started: false,
      another: 0,
      flight: true,
      speedGame: 0,
      levelStatistic: [],
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);
  }

  public resume = () => {
    this.setState({
      ended: false,
      started: true,
    });
  };

  public start = () => {
    const { speed } = this.props;
    this.setState({ speedGame: speed });
    this.reset(() => {
      this.onNext();
      this.resume();
    });
  };

  public stop = () => {
    this.result = {
      time: 0,
      failed: 0,
      success: 0,
      finished: true,
    };

    this.setState({
      ended: false,
      started: false,
      another: 0,
      flight: true,
      level: 0,
      levelStatistic: []
    });
  };

  private reset = (cb: any) => {
    this.result = {
      time: 0,
      failed: 0,
      success: 0,
      finished: true,
    };

    this.setState(
      {
        ended: false,
        started: false,
        another: 0,
        flight: true,
        level: 0,
      },
      cb,
    );
  };

  onNext = () => {
    this.startLogic();
  };

  startLogic = () => {
    const { elementsTotal, digitMax } = this.props;

    let allCount = digitMax - elementsTotal;

    if (allCount < 0) {
      allCount = 0;
    }

    setTimeout(() => {
      this.setState({
        another: allCount,
      });
    }, (START_TIMER + START_GAME) * 1000);
  };

  endFlight = () => {
    const { elementsTotal } = this.props;

    this.list = [];

    for (let i = 0; i < elementsTotal; i++) {
      this.list.push(false);
    }

    this.setState({
      flight: false,
    });
  };

  onPressResult = (type: string, id: number) => () => {
    if (this.state.flight) return;

    if (type == 'lose') {
      this.result.failed += 1;
      this.end('lose');
      return;
    }

    this.list[id] = true;

    if (typeof this.list.find((a: any) => a == false) != 'undefined') {
      return;
    }

    this.result.success += 1;
    this.end('win');
  };

  restartGame = () => {
    this.setState(
      {
        level: this.state.level + 1,
        ended: false,
        started: true,
        another: 0,
        flight: true,
      },
      () => {
        this.startLogic();
      },
    );
  };

  private end = (status = 'win') => {
    this.setState({
      ended: true,
    });

    this.engineTrigger(status === "win")

    const time = this.timerRef?.getValue();

    this.result.time += time;

    setTimeout(() => {
      const { levelMaxCompleted, onEnd = () => {} } = this.props;

      if (this.state.level + 1 >= levelMaxCompleted) {
        const result: GameResult = {
          result: status == 'win' ? 'win' : 'lose',
          levelMaxCompleted: this.state.level + 1,
          ...this.result,
        };

        onEnd(result);

        this.stop();
        return;
      }

      this.restartGame();
    }, 2000);
  };

  private engineTrigger = (result: boolean) => {
    const { perSuccessLevel, maxErrorLevel, upgrade, downgrade } = this.props;
    const { levelStatistic: currentLevelStatistic, speedGame: currentSpeedGame } = this.state;

    let speedGame = currentSpeedGame;

    const levelStatistic = [...currentLevelStatistic, { speed: currentSpeedGame, result }];

    const lastLevels = levelStatistic.slice(-perSuccessLevel);

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

    const counterCurrentSpeed = lastLevels.filter(({ speed }) => speed === currentSpeedGame);

    if (success === perSuccessLevel) {
      if (counterCurrentSpeed.length === perSuccessLevel) {
        speedGame += (speedGame * upgrade) / 100;
      }
    }

    if (errors === maxErrorLevel && speedGame > 0) {
      speedGame -= (speedGame * downgrade) / 100;
    }

    this.setState({ levelStatistic, speedGame });
  };

  renderInner = () => {
    const { width, elementsTotal, timeComplete, levelMaxCompleted } = this.props;
    const { flight = true, another = 0, ended = false, level = 0, speedGame } = this.state;

    const height = width * (isWeb() ? 1 : 1.2);
    const items = [];
    const anotherItems = [];

    for (let i = 0; i < elementsTotal; i++) {
      items.push(
        <Item
          key={`light-${level}-${i}`}
          height={height}
          flight={flight}
          onPress={this.onPressResult('win', i)}
          type="win"
          ended={ended}
          speed={speedGame}
          width={width}
        />,
      );
    }

    for (let i = 0; i < another; i++) {
      anotherItems.push(
        <Item
          key={`light-another-${level}-${i}`}
          height={height}
          flight={flight}
          onPress={this.onPressResult('lose', -1)}
          type="lose"
          ended={ended}
          speed={speedGame}
          width={width}
        />,
      );
    }

    return (
      <View>
        {another > 0 && (
          <TimerRevert
            time={timeComplete}
            onEnd={this.endFlight}
            renderTime={(time: number) => null}
          />
        )}
        <View style={styles.wrapTop}>
          {levelMaxCompleted > 1 && (
            <Text style={styles.titleLevel}>
              Уровень {level + 1}/{levelMaxCompleted}
            </Text>
          )}
          {flight && <Text style={styles.title}>{another == 0 ? 'Запоминай' : 'Следи'}</Text>}
          {!flight && <Text style={styles.title}>Найди</Text>}
        </View>
        <View
          style={{
            ...styles.inner,
            height: height,
          }}
        >
          <Image source={imageBackground} style={styles.background} />
          {items}
          {anotherItems}
        </View>
        <View style={styles.wrapBottom}>
          {!flight && (
            <Timer
              ref={ref => (this.timerRef = ref)}
              renderTime={(time: any) => <Text style={styles.timer}>{time} сек</Text>}
            />
          )}
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
  wrap: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  inner: {},
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wrapTop: {
    flex: 1,
    marginBottom: 8,
  },
  timer: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  wrapBottom: {
    minHeight: 24,
  },
  titleLevel: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    textAlign: 'center',
    color: '#2e8dfd',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
