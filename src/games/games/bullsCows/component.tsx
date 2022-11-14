import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Game, GameResult } from '../../common/types';

import TimerAll from '../../components/timer';
import StartTimer from '../../components/startTimer';
import { Field, CounterCowsAndBulls, PrevValue, UsersAttempt } from './components';
import _ from 'lodash';

const buttonArrow = require('./assets/buttonArrow.png');

const START_TIMER = 3;

const options = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
];

export default class extends Component<any, any> implements Game {
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      success: 0,
      errors: 0,
      level: 0,
      secretNumber: Math.random().toString().slice(2, 6),
      guessNumber: {},
      prevGuessNumber: [],
      userErrorAacceptable: 0,
      bulls: 0,
      cows: 0,
    };
  }

  setErrors = (errors: number) => this.setState({ errors });
  setUserErrorAacceptable = (count: number) => this.setState({ userErrorAacceptable: count });
  setPrevGuessNumber = (value: string[]) => this.setState({ prevGuessNumber: value });

  setDownUserErrorAacceptable = () =>
    this.setState((prev: any) => ({
      ...prev,
      userErrorAacceptable: prev.userErrorAacceptable - 1,
    }));

  setBullsAndCows = (bulls: number, cows: number) =>
    this.setState((prev: any) => ({ ...prev, bulls, cows }));

  setGuessNumber = (key: string, value: string) =>
    this.setState((prev: any) => ({
      ...prev,
      guessNumber: { ...prev.guessNumber, [key]: { label: value, value } },
    }));

  updateGuessNumber = (key: string, { label, value }: any) =>
    this.setState((prev: any) => ({
      ...prev,
      guessNumber: { ...prev.guessNumber, [key]: { label, value } },
    }));

  clearGuessNumber = () => {
    const { digitMax } = this.props;
    for (let i = 0; i < digitMax; i++) {
      this.setGuessNumber(i.toString(), '0');
    }
  };

  componentDidMount() {
    const { onRef = () => {} } = this.props;
    onRef(this);
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
      level: 0,
      success: 0,
      errors: 0,
    });
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
        level: 0,
        success: 0,
        errors: 0,
      },
      cb,
    );
  };

  onNext = () => {
    this.startLogic();
  };

  onWin = () => {
    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      result: 'win',
    };

    onEnd(result);

    this.stop();
  };

  onEnd = () => {
    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      result: 'lose',
    };

    onEnd(result);

    this.stop();
  };

  startLogic = () => {
    const { errorAacceptable } = this.props;
    this.setUserErrorAacceptable(errorAacceptable);
    this.clearGuessNumber();
  };

  checkAnswer = () => {
    const { guessNumber, secretNumber, userErrorAacceptable } = this.state;
    const userValue = Object.values(guessNumber)
      .map((item: any) => item.value)
      .join('');

    let secretArray = [] as any;
    let guessArray = [] as any;
    let bulls = 0;
    let cows = 0;

    secretArray = secretNumber.split('');
    guessArray = userValue.split('');

    secretArray.forEach(function (key: any, index: any) {
      if (secretArray[index] === guessArray[index]) {
        bulls = bulls + 1;
        secretArray[index] = 'X';
        guessArray[index] = 'Z';
      }
    });

    secretArray.forEach(function (key: any, index: any) {
      if (secretArray.indexOf(guessArray[index]) >= 0) {
        secretArray[secretArray.indexOf(guessArray[index])] = '';
        cows = cows + 1;
      }
    });

    if (bulls === 4) {
      console.log('WIN !!!!');
      return this.onWin();
    }

    this.setBullsAndCows(bulls, cows);
    this.setPrevGuessNumber(userValue.split(''));
    this.setDownUserErrorAacceptable();

    console.log('checkAnswer', {
      userValue,
      secretNumber,
      bulls,
      cows,
      guessArray,
      state: this.state,
    });
    if (userErrorAacceptable - 1 === 0) {
      return this.onEnd();
    }
  };

  renderFields = () => {
    const { digitMax } = this.props;
    const fields = _.range(digitMax);
    return fields.map(field => (
      <Field
        key={field}
        id={field.toString()}
        options={options}
        onChange={this.updateGuessNumber}
        value={this.state.guessNumber[field]}
      />
    ));
  };

  renderInner = () => {
    const { width, elementsTotal, timeComplete } = this.props;

    return (
      <View
        style={{
          minHeight: width,
          ...styles.inner,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.label}>Уровень 1</Text>
          <UsersAttempt count={this.state.userErrorAacceptable} />
        </View>
        <View style={styles.gameArea}>
          {this.state.userErrorAacceptable < this.props.errorAacceptable && (
            <View style={styles.counterWrapper}>
              <PrevValue values={this.state.prevGuessNumber} />
              <CounterCowsAndBulls bulls={this.state.bulls} cows={this.state.cows} />
            </View>
          )}
          <Text style={[styles.label, styles.labelGame]}>Введите пинкод</Text>
          <View style={styles.inputsWrapper}>{this.renderFields()}</View>
          <TouchableOpacity style={styles.button} onPress={this.checkAnswer}>
            <Text style={styles.buttonLabel}>
              {this.state.userErrorAacceptable < this.props.errorAacceptable
                ? 'Попробовать еще'
                : 'Играть'}
            </Text>
            <Image style={styles.buttonIcon} source={buttonArrow} />
          </TouchableOpacity>
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
  timer: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
  },
  wrap: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    backgroundColor: '#3C228C',
    paddingVertical: 28,
    paddingHorizontal: 50,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
    marginHorizontal: 12,
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameArea: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    maxWidth: 418,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 19,
    marginBottom: 88,
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
  labelGame: {
    textTransform: 'uppercase',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  button: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    backgroundColor: '#7F28D9',
    borderRadius: 30,
  },
  buttonLabel: {
    paddingVertical: 15,
    paddingLeft: 17,
    paddingRight: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonIcon: {
    width: 45,
    height: 45,
  },
});
