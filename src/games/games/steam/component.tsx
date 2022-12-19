import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { LevelStatistic, PropGage, Props } from './types';

import { Game, GameResult } from '../../common/types';

import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';

import SteamItem from './components/item';

const HEIGHT_AREA = 680;
const START_TIMER = 3;

const imageBackground = require('./assets/background.png');
const imageDot = require('./assets/dot.png');

interface State {
  started: boolean;
  score: number;
  gameGage: PropGage[];
  levelStatistic: LevelStatistic[];
}

export default class extends Component<Props, State> implements Game {
  timer: any;
  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      score: 0,
      gameGage: [],
      levelStatistic: [],
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);

    // this.reset();
    // this.start();
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
      score: 0,
    });
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
        score: 0,
      },
      cb,
    );
  };

  onScore = (scoreAdd: number) => {
    const { score = 0 } = this.state;

    const {
      errorAacceptable = 1,
      elementsTotal = 1,
      onFeedbackError = () => {},
      onFeedbackSuccess = () => {},
    } = this.props;

    const addSum = scoreAdd > 0 ? 1 : -errorAacceptable;
    
    
    if (addSum > 0) {
      onFeedbackSuccess();
    } else {
      onFeedbackError();
    }

    let scoreSet = score + addSum;

    if (scoreSet < 0) {
      scoreSet = 0;
    }

    if (scoreSet >= elementsTotal) {
      this.onWin();
    }

    this.engineTrigger(scoreAdd > 0);

    this.setState({
      score: scoreSet,
    });
  };

  private engineTrigger = (result: boolean) => {
    const { perSuccessLevel, maxErrorLevel, upgrade, downgrade } = this.props;
    const { levelStatistic: currentLevelStatistic, gameGage: currentGameGage } = this.state;

    let speedGages = currentGameGage.map(({ speed }) => speed);

    const levelStatistic = [...currentLevelStatistic, { result, gage: currentGameGage }];

    const lastLevels = levelStatistic.slice(-perSuccessLevel);

    let succes = 0;
    let errors = 0;

    lastLevels.forEach(({ result }) => {
      if (result) {
        errors = 0;
        succes++;
      } else {
        succes = 0;
        errors++;
      }
    });

    const countCurrentSpeed = lastLevels.filter(({ gage }) =>
      gage.filter(({ speed }, index) => speed === currentGameGage[index].speed),
    );

    if (succes) {
      if (countCurrentSpeed.length === perSuccessLevel) {
        speedGages = speedGages.map(speed => (speed -= (speed * downgrade) / 100));
      }
    }

    if (errors === maxErrorLevel && speedGages.filter(speed => speed > 0).length > 0) {
      speedGages = speedGages.map(speed => (speed += (speed * upgrade) / 100));
    }

    const gameGage = currentGameGage.map(({ area }, index) => ({ area, speed: speedGages[index] }));

    this.setState({ levelStatistic, gameGage });
  };

  onNext = () => {
    this.startLogic();
  };

  startLogic = () => {
    const { gage } = this.props;
    this.setState({ gameGage: gage, levelStatistic: [] });
  };

  onWin = () => {
    const { onEnd = () => {} } = this.props;
    const { score } = this.state;

    const time = this.timer.getValue();

    const result: GameResult = {
      result: 'win',
      time,
      success: score,
    };

    onEnd(result);

    this.stop();
  };

  onEnd = () => {
    const { onEnd = () => {}, timeComplete } = this.props;

    const { score } = this.state;

    const result: GameResult = {
      result: 'lose',
      time: timeComplete,
      success: score,
    };

    onEnd(result);

    this.stop();
  };

  renderInner = () => {
    const { width, timeComplete, elementsTotal } = this.props;
    const { gameGage } = this.state;

    const { score = 0 } = this.state;

    let scoreProgress = (score / elementsTotal) * 100;

    if (scoreProgress < 0) {
      scoreProgress = 0;
    }
    if (scoreProgress > 100) {
      scoreProgress = 100;
    }

    const steamArray: any[] = [];

    gameGage.map(({ speed, area }, index) => {
      steamArray.push(
        <View key={`steam-${index}`} style={styles.wrapItem}>
          <SteamItem speed={speed} area={area} onScore={this.onScore} />
        </View>,
      );
    });

    return (
      <View
        style={{
          ...styles.inner,
          minHeight: HEIGHT_AREA,
        }}
      >
        <Image source={imageBackground} style={styles.background} />
        <View style={styles.wrapTop}>
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
          <View style={styles.wrapScore}>
            <View
              style={{
                ...styles.progressScore,
                width: `${scoreProgress}%`,
              }}
            />
          </View>
        </View>
        <View style={styles.wrapperItems}>
          <Image source={imageDot} style={[styles.dot, styles.dotLeft, styles.dotTop]} />
          <Image source={imageDot} style={[styles.dot, styles.dotRight, styles.dotTop]} />
          <Image source={imageDot} style={[styles.dot, styles.dotLeft, styles.dotBottom]} />
          <Image source={imageDot} style={[styles.dot, styles.dotRight, styles.dotBottom]} />
          <View style={styles.wrapItems}>{steamArray}</View>
        </View>
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
  wrapItem: {
    margin: 8,
  },
  wrapperItems: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 12,
  },
  wrapItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  wrapTop: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  wrapScore: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#2E8DFD',
    borderRadius: 2,
  },
  progressScore: {
    height: '100%',
    backgroundColor: '#FF4633',
    borderRadius: 2,
  },
  dot: {
    position: 'absolute',
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  dotLeft: {
    left: 4,
  },
  dotRight: {
    right: 4,
  },
  dotTop: {
    top: 4,
  },
  dotBottom: {
    bottom: 0,
  },
});
