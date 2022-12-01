import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Timer from '../../../components/timerRevert';
import TimerAll from '../../../components/timer';
import LevelsView from './levels';
import LevelView from './level';
import { Result, StatisticItem } from '../types';
import { Props } from '..';

interface State {
  active: number;
  progress: string[];
  cycleTime: number;
  levelStatistic: StatisticItem[];
}

interface ComponentProps {
  settingsCycleTime: number;
}

export default class extends Component<Props & ComponentProps, State> {
  result: Result = {
    result: 'end',
    failed: 0,
    success: 0,
  };

  constructor(props: any) {
    super(props);

    this.reset();

    this.state = {
      active: 0,
      progress: [],
      cycleTime: 0,
      levelStatistic: [],
    };
  }

  componentDidMount(): void {
    const { settingsCycleTime } = this.props;
    this.setState({ cycleTime: settingsCycleTime });
  }

  reset = () => {
    this.result = {
      result: 'end',
      failed: 0,
      success: 0,
    };
    this.setState({ levelStatistic: [] });
  };

  onEnd = () => {
    const { onEnd = () => {} } = this.props;

    const result = { ...this.result };
    const timer: any = this.refs?.timerAll;
    const time = timer?.getValue();

    onEnd({
      ...(result as any),
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
    const { elementsTotal = 2, errorLevel, levelChangeEngine } = this.props;
    const { active = 0, levelStatistic: currentlevelStatistic } = this.state;

    if (active == elementsTotal - 1) {
      this.onEnd();
    } else {
      this.setState({
        active: active + 1,
      });
    }
  };

  onResult = (result: 'success' | 'failed') => {
    this.result[result] += 1;

    const { levelChangeEngine, errorLevel, percentUpgradeTime, percentDowngradeTime } = this.props;

    const { levelStatistic: currentlevelStatistic, cycleTime: currentCycleTime } = this.state;

    const levelStatistic = [
      ...currentlevelStatistic,
      { result: result === 'success', time: currentCycleTime },
    ];

    let cycleTime: number = currentCycleTime;

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

    const counterCurrentTimer = levelStatistic
      .slice(-levelChangeEngine)
      .filter(({ time }) => time === cycleTime);

      if (success === levelChangeEngine) {
        if (counterCurrentTimer.length === levelChangeEngine && currentCycleTime > 0) {
          cycleTime -= (cycleTime * percentDowngradeTime) / 100;
        }
      }
  
      if (errors === errorLevel) {
        cycleTime += ((cycleTime * percentUpgradeTime) / 100);
      }

      this.setState({ levelStatistic, cycleTime });
  };

  render() {
    const { timeComplete = 0, elementsTotal, groupsCount = 2, blinksCount = 2 } = this.props;

    const { active = 0, progress = [], cycleTime } = this.state;

    return (
      <View style={styles.wrap}>
        <LevelsView count={elementsTotal} progress={progress} />
        <View style={styles.inner}>
          <LevelView
            key={`level-${active}`}
            groupsCount={groupsCount}
            blinksCount={blinksCount}
            onProgress={this.onProgress}
            onEnd={this.onLevelEnd}
            onResult={this.onResult}
            cycleTime={cycleTime}
          />
        </View>
        {timeComplete > 0 && (
          <View style={styles.progressTime}>
            <Timer
              ref="timer"
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
        <TimerAll
          ref="timerAll"
          renderTime={(time: any) => <Text style={styles.timer}>{time} сек</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
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
