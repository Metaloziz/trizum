import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Props } from './types';

import { Game, GameResult } from '../../common/types';
import StartTimer from '../../components/startTimer';
import EnterValue from '../../components/enterValue';

import Templates from './logic/templates';
import { generate } from './logic/wrapLogic';

import WrapperGame from './components/wrapper';

const AvailableTemplates = Templates();

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
    // const {
    //   config
    // } = this.props;

    generate(this.props).then(result => {
      console.log('Result game:', result);
      this.setState({
        list : result
      }, () => {
        this.setStarted(true);
      });
    });
  }

  public stop = () => {
    this.setStarted(false);
  }

  private reset = (cb : any) => {
    this.setStarted(false);
  }

  private end = (result : any) => {
    let time = 0;
    let success = 0;
    let failed = 0;

    result.map((a : any) => {
      time += a.time;

      if(a.success) {
        success++;
      } else {
        failed++;
      }
    });

    const {
      onEnd = () => {}
    } = this.props;

    const resultSend : GameResult = {
      result : 'end',
      time : time,
      timeDiff : Math.ceil(time / result.length),
      failed : failed,
      success : success
    };

    onEnd(resultSend);

    this.stop();
  }

  public getConfig = () => {
    const delayOption = [];

    for(let i = 1;i<=30;i++) {
      const v = parseFloat(`${i / 10}`).toFixed(1);

      delayOption.push({
        title : `${v}` + ' сек',
        value : i * 100
      });
    }

    return [
      {
        name : 'delay',
        title : 'Скорость счета',
        type : 'select',
        option : delayOption,
        value : 1500,
        required : true
      },
      {
        name : 'formula',
        title : 'Формула',
        value : 1,
        type : 'select',
        option : AvailableTemplates.map((a, i) => ({
          title : a.title,
          value : i
        })),
        required : true
      },
      {
        name : 'count',
        title : 'Кол-во задач',
        value : '3',
        type : 'input',
        keyboardType : 'phone-pad',
        required : true
      },
      {
        name : 'length',
        title : 'Кол-во слагаемых',
        value : '3',
        type : 'input',
        keyboardType : 'phone-pad',
        required : true
      },
      {
        name : 'subtract',
        title : 'Использовать вычитание',
        value : 0,
        type : 'select',
        option : [
          {
            title : 'Да',
            value : 1
          },
          {
            title : 'Нет',
            value : 0
          },
        ],
        required : true
      },
      {
        name : 'restriction',
        title : 'Результат не больше чем по формуле',
        value : 1,
        type : 'select',
        option : [
          {
            title : 'Да',
            value : 1
          },
          {
            title : 'Нет',
            value : 0
          },
        ],
        required : true
      },
    ];
  }

  public prepareConfig = (result : any) => {
    let length = parseInt(result.length) || 3;

    if(length < 2) {
      length = 2;
    }

    const formula = AvailableTemplates[result.formula] || AvailableTemplates[1];

    return {
      delay : result.delay,
      count : parseInt(result.count) || 3,
      subtract : result.subtract == 1 ? true : false,
      restriction : result.restriction == 1 ? true : false,
      length : length,

      ...formula.options,
    };
  }

  render() {
    const {
      started = false,
      list = []
    } = this.state;

    const {
      width,
      delay = 1000
    } = this.props;

    return <View
      style={{
        ...styles.wrap,
        width
      }}
    >
      {started && <StartTimer
        time={3}
        renderComponent={() => <WrapperGame
          delay={delay}
          onEnd={this.end}
          list={list}
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
