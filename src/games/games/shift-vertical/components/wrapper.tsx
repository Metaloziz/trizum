import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Timer from '../../../components/timerRevert';
import LevelsView from './levels';
import LevelView from './level';

export default class extends Component<any, any> {

  result : any;

  constructor(props : any) {
    super(props);

    this.reset();

    this.state = {
      active : 0,
      progress : []
    };
  }

  reset = () => {
    this.result = {
      result : 'end',
      failed : 0,
      success : 0
    };
  }

  onEnd = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const result = {...this.result};
    const timer: any = this.refs?.timer;
    const time = this.props.timeComplete - timer?.getValue();

    onEnd({
      ...result,
      time
    });
  }

  onProgress = (color : any) => {
    const progress = this.state.progress.slice();

    progress.push(color);

    this.setState({
      progress
    });
  }

  onLevelEnd = () => {
    const {
      active = 0
    } = this.state;
    const {
      elementsTotal = 2
    } = this.props;

    if(active == (elementsTotal-1)) {
      this.onEnd();
    } else {
      this.setState({
        active : active + 1
      });
    }
  }

  onResult = (result : any) => {
    this.result[result] += 1;
  }

  render() {
    const {
      timeComplete,
      cycleTime,
      elementsTotal,
      groupsCount = 2,
      blinksCount = 2,
    } = this.props;

    const {
      active = 0,
      progress = []
    } = this.state;

    return <View style={styles.wrap}>
      <LevelsView
        count={elementsTotal}
        progress={progress}
      />
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
      <View style={styles.progressTime}>
        <Timer
          ref='timer'
          time={timeComplete}
          onEnd={this.onEnd}
          renderComponent={() => <View
            style={{
              ...styles.progressTimeInner,
              width : `100%`
            }}
          />}
          renderTime={(t : any) => {
            let progress = ((timeComplete - t) / timeComplete) * 100;

            if(progress > 100) {
              progress = 100;
            }

            return <View
              style={{
                ...styles.progressTimeInner,
                width : `${progress}%`
              }}
            />
          }}
        />
      </View>
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1
  },
  inner : {
    flex : 1
  },
  progressTime : {
    height : 6,
    backgroundColor : '#e8eff6',
    borderRadius : 3,
    overflow : 'hidden'
  },
  progressTimeInner : {
    height : '100%',
    backgroundColor : '#292ef9',
    borderRadius : 2,
  }
});
