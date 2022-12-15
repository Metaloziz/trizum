import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Game, GameResult } from '../../common/types';
import { Props } from './types';

import Container from './common/components/container';
import Timer from '../../components/timer';
import TimerRevert from '../../components/timerRevert';

const HEIGHT_AREA = 650;

export default class extends Component<any, any> implements Game {
  game: any;

  constructor(props: any) {
    super(props);

    this.game = false;

    this.state = {
      started: false,
      score: 0,
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);
  }

  public start = () => {
    this.setState(
      {
        started: true,
      },
      () => {
        this.game?.start();
      },
    );
  };

  private setScore = (score: any) => {
    this.setState({
      score,
    });
  };

  endTime = () => {
    const timer: any = this.refs?.timer;
    const time = timer?.getValue();

    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      result: 'lose',
      time: time,
      score: this.game?.getScore(),
      finished: false,
      levelMaxCompleted: this.game?.getMaxValue(),
    };

    onEnd(result);

    this.stop();
  };

  private end = (type: any) => (score: any) => {
    const timer: any = this.refs?.timer;
    const time = timer?.getValue();

    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      result: type,
      time: time,
      score: score,
      finished: type == 'win',
      levelMaxCompleted: this.game?.getMaxValue(),
    };

    onEnd(result);

    this.stop();
  };

  public stop = () => {
    this.setState({
      started: false,
    });
  };

  render() {
    const {
      timeComplete,
      groupsCount,
      elementsTotal,
      digitMax = 2048,
      onFeedbackSuccess = () => {},
      onFeedbackError = () => {},
    } = this.props;

    const { started = false, score = 0 } = this.state;

    return (
      <View style={styles.wrap}>
        {started && timeComplete > 0 && (
          <View style={styles.progressTime}>
            <TimerRevert
              time={timeComplete}
              onEnd={this.endTime}
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
        {started && (
          <Text style={styles.title}>
            Счет: <Text style={{ ...styles.title, ...styles.titleActive }}>{score}</Text>
          </Text>
        )}
        <Container
          ref={ref => (this.game = ref)}
          elementsTotal={elementsTotal}
          digitMax={digitMax}
          size={groupsCount}
          width={HEIGHT_AREA}
          onEnd={this.end('end')}
          onWin={this.end('win')}
          onScore={this.setScore}
          onFeedbackSuccess={onFeedbackSuccess}
          onFeedbackError={onFeedbackError}
        />
        {started && (
          <Timer
            ref="timer"
            renderTime={(time: any) => <Text style={styles.timer}>{time} сек</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    marginBottom: 12,
  },
  timer: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  titleActive: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
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
