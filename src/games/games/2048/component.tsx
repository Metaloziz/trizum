import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Game, GameResult } from '../../common/types';
import Timer from '../../components/timer';

import Container from './common/components/container';
import { Props } from './types';

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

  private end = (type: any) => (score: any) => {
    const timer: any = this.refs?.timer;
    const time = timer?.getValue();

    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      result: type,
      time,
      score,
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
      size,
      startTiles,
      width,
      onFeedbackSuccess = () => {},
      onFeedbackError = () => {},
    } = this.props;

    const { started = false, score = 0 } = this.state;

    return (
      <View style={styles.wrap}>
        {started && (
          <Text style={styles.title}>
            Счет: <Text style={{ ...styles.title, ...styles.titleActive }}>{score}</Text>
          </Text>
        )}
        <Container
          ref={ref => (this.game = ref)}
          startTiles={startTiles}
          size={size}
          width={width}
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
});
