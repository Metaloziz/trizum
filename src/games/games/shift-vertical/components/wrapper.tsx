import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Timer from '../../../components/timerRevert';
import TimerAll from '../../../components/timer';
import LevelsView from './levels';
import LevelView from './level';
import { Result, StatisticItem } from '../types';
import { Props } from '..';

interface State {
  active: number;
  progress: string[];
  levelStatistic: StatisticItem[];
}

interface ComponentProps {
  settingsCycleTime: number;
  updateCycleTime: (time: number) => void;
}

export default class extends Component<Props & ComponentProps, State> {
  timer: any;
  timerAll: any;

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
      levelStatistic: [],
    };
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
    const timer: any = this.timerAll;
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
    const { elementsTotal = 2 } = this.props;
    const { active = 0 } = this.state;

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
    this.triggerEngine(result === 'success');
  };

  private triggerEngine = (result: boolean) => {
    const {
      perSuccessLevel: perLevel,
      maxErrorLevel,
      upgrade,
      downgrade,
      settingsCycleTime: currentCycleTime,
      updateCycleTime,
    } = this.props;

    const { levelStatistic: currentlevelStatistic } = this.state;

    const levelStatistic = [...currentlevelStatistic, { result: result, time: currentCycleTime }];

    let cycleTime: number = currentCycleTime;

    const lastLevels = levelStatistic.slice(-perLevel);

    if (lastLevels.length === perLevel) {
      const { length: allErrors } = lastLevels.filter(({ result }) => !result);

      if (allErrors > maxErrorLevel) {
        cycleTime += (cycleTime * upgrade) / 100;
        updateCycleTime(cycleTime);
      }

      if (allErrors < maxErrorLevel) {
        cycleTime -= (cycleTime * downgrade) / 100;
        updateCycleTime(cycleTime);
      }
    }

    this.setState({ levelStatistic });
  };

  render() {
    const {
      timeComplete = 0,
      elementsTotal,
      groupsCount = 2,
      blinksCount = 2,
      settingsCycleTime: cycleTime,
    } = this.props;

    const { active = 0, progress = [] } = this.state;

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
        <TimerAll
          ref={ref => (this.timerAll = ref)}
          renderTime={(time: number) => <Text style={styles.timer}>{time} сек</Text>}
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
    paddingHorizontal: 6,
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
