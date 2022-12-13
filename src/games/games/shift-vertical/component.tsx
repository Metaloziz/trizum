import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Props } from './types';

import { Game, GameResult } from '../../common/types';
import StartTimer from '../../components/startTimer';
import GameWrapper from './components/wrapper';

const START_TIMER = 3;

interface State {
  started: boolean;
  list: any[];
  cycleTime: number;
}

export default class extends Component<Props, State> implements Game {
  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      list: [],
      cycleTime: 0,
    };
  }

  setStarted = (started: boolean) => {
    this.setState({
      started,
    });
  };

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);

    this.reset(() => {});
  }

  public resume = () => {
    this.setStarted(true);
  };

  public start = () => {
    const { cycleTime } = this.props;
    this.setState({ cycleTime: cycleTime / 1000 });
    this.setStarted(true);
  };

  public updateCycleTime = (cycleTime: number) => {
    this.setState({ cycleTime });
  };

  public stop = () => {
    this.setStarted(false);
  };

  private reset = (cb: any) => {
    this.setStarted(false);
  };

  private end = (result: GameResult) => {
    const { onEnd = () => {} } = this.props;

    onEnd(result);

    this.stop();
  };

  render() {
    const { started = false, cycleTime } = this.state;

    const { width } = this.props;

    return (
      <View
        style={{
          ...styles.wrap,
          width,
        }}
      >
        {started && (
          <StartTimer
            time={START_TIMER}
            renderComponent={() => (
              <GameWrapper
                {...this.props}
                onEnd={this.end}
                settingsCycleTime={cycleTime}
                updateCycleTime={this.updateCycleTime}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
  },
});
