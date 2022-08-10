import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Timer from '../../../components/timerRevert';

import LevelView from './level';
import LevelsView from './levels';

export default class extends Component<any, any> {
  result: any;

  constructor(props: any) {
    super(props);

    this.reset();

    this.state = {
      active: 0,
      progress: [],
    };
  }

  reset = () => {
    this.result = {
      result: 'end',
      failed: 0,
      success: 0,
    };
  };

  onEnd = () => {
    const { onEnd = () => {} } = this.props;

    const result = { ...this.result };
    const timer: any = this.refs?.timer;
    const time = this.props.time - timer?.getValue();

    onEnd({
      ...result,
      time,
    });
  };

  onProgress = (color: any) => {
    const progress = this.state.progress.slice();

    progress.push(color);

    this.setState({
      progress,
    });
  };

  onLevelEnd = () => {
    const { active = 0 } = this.state;
    const { levels = 2 } = this.props;

    if (active == levels - 1) {
      this.onEnd();
    } else {
      this.setState({
        active: active + 1,
      });
    }
  };

  onResult = (result: any) => {
    this.result[result] += 1;
  };

  render() {
    const { time, delay, levels, colors = 2, forms = 2 } = this.props;

    const { active = 0, progress = [] } = this.state;

    return (
      <View style={styles.wrap}>
        <LevelsView count={levels} progress={progress} />
        <View style={styles.inner}>
          <LevelView
            key={`level-${active}`}
            colors={colors}
            forms={forms}
            onProgress={this.onProgress}
            onEnd={this.onLevelEnd}
            onResult={this.onResult}
            delay={delay}
          />
        </View>
        <View style={styles.progressTime}>
          <Timer
            ref="timer"
            time={time}
            onEnd={this.onEnd}
            renderComponent={() => (
              <View
                style={{
                  ...styles.progressTimeInner,
                  width: `100%`,
                }}
              />
            )}
            renderTime={(t: any) => {
              let progress = ((time - t) / time) * 100;

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#e8eff6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#292ef9',
    borderRadius: 2,
  },
});
