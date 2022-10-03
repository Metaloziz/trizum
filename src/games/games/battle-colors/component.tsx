import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Props } from './types';

import { Game, GameResult } from '../../common/types';
import StartTimer from '../../components/startTimer';
import GameWrapper from './components/wrapper';

export default class extends Component<any, any> implements Game {

  constructor(props : any) {
    super(props);

    this.state = {
      started : false,
      list : []
    };
  }

  setStarted = (started : any) => {
    this.setState({
      started
    });
  }

  componentDidMount() {
    const {
      onRef = () => {}
    } = this.props;

    onRef(this);

    this.reset(() => {});
  }

  public resume = () => {
    this.setStarted(true);
  }

  public start = () => {
    this.setStarted(true);
  }

  public stop = () => {
    this.setStarted(false);
  }

  private reset = (cb : any) => {
    this.setStarted(false);
  }

  private end = (result : GameResult) => {
    const {
      onEnd = () => {}
    } = this.props;

    onEnd(result);

    this.stop();
  }

  public getConfig = () => {
    const counterSelect = (min = 1, max = 2) => {
      const options = [];

      for(let i = min;i<=max;i++) {
        options.push({
          title : `${i}`,
          value : i
        });
      }

      return options;
    };

    return [
      {
        name : 'time',
        title : 'Время игры',
        type : 'select',
        option : [
          {
            title : '30 секунд',
            value : 30
          },
          {
            title : '1 минута',
            value : 60
          },
          {
            title : '3 минуты',
            value : 180
          },
          {
            title : '5 минут',
            value : 300
          },
        ],
        value : 30,
        required : true
      },
      {
        name : 'levels',
        title : 'Кол-во уровней',
        type : 'select',
        option : counterSelect(1, 5),
        value : 2,
        required : true
      },
      {
        name : 'colores',
        title : 'Кол-во цветов',
        type : 'select',
        option : counterSelect(3, 5),
        value : 3,
        required : true
      }
    ];
  }

  public prepareConfig = (result : any) => {
    return {
      time : parseInt(result.time),
      levels : parseInt(result.levels),
      colores : parseInt(result.colores),
    };
  }

  render() {
    const {
      started = false
    } = this.state;

    const {
      time = 10,
      levels,
      width
    } = this.props;

    return <View
      style={{
        ...styles.wrap,
        width
      }}
    >
      {started && <StartTimer
        time={3}
        renderComponent={() => <GameWrapper
          {...this.props}
          onEnd={this.end}
        />}
      />}
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1,
    marginTop : 12,
    marginBottom : 12
  }
});
