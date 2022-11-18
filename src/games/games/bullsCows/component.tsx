import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Game, GameResult } from '../../common/types';

import Timer from '../../components/timerRevert';
import StartTimer from '../../components/startTimer';
import { Field, CounterCowsAndBulls, PrevValue, UsersAttempt } from './components';
import _ from 'lodash';

const buttonArrow = require('./assets/buttonArrow.png');

const START_TIMER = 3;
export default class extends Component<any, any> implements Game {
  timerRef: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      success: 0,
      errors: 0,
      level: 0,
      secretNumbers: [],
      guessNumber: {},
      prevGuessNumber: [],
      userErrorAacceptable: 0,
      bulls: 0,
      cows: 0,
    };
  }

  genereateSecretNumber = () => {
    const { digitMax, levelMaxCompleted } = this.props;
    const secretNumbers: string[] = [];
    _.range(0, levelMaxCompleted).map(() =>
      secretNumbers.push(
        Math.random()
          .toString()
          .slice(2, 2 + digitMax),
      ),
    );
    return secretNumbers;
  };

  setErrors = (errors: number) => this.setState({ errors });
  setUserErrorAacceptable = (count: number) => this.setState({ userErrorAacceptable: count });
  setPrevGuessNumber = (value: string[]) => this.setState({ prevGuessNumber: value });

  setLevelErrorAacceptable = (userErrorAacceptable: number) =>
    this.setState({ userErrorAacceptable });

  setBullsAndCows = (bulls: number, cows: number) => this.setState({ bulls, cows });

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
      prevGuessNumber: [],
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
    const { timeComplete, onEnd = () => {} } = this.props;

    const success = this.state.level - 1;
    const failed = this.state.errors;

    const result: GameResult = {
      result: 'lose',
      finished: false,
      success,
      failed,
      time: timeComplete,
    };

    onEnd(result);

    this.stop();
  };

  private end = (status = 'win') => {
    const {timeComplete, onEnd = () => {} } = this.props;
    const timer = this.timerRef?.getValue();
    const time = timeComplete - timer; 

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success: this.state.success,
      failed: this.state.errors,
      time,
    };

    onEnd(result);

    this.stop();
  };

  onResult = (result: boolean) => {
    const { errorAacceptable, levelMaxCompleted } = this.props;

    const level = this.state.level + 1;
    const success = this.state.success + (result ? 1 : 0);
    const errors = this.state.errors + (result ? 0 : 1);

    this.setState(
      {
        level,
        success,
        errors,
        userErrorAacceptable: errorAacceptable,
        prevGuessNumber: [],
      },
      () => {
        if (level > levelMaxCompleted) {
          this.end('win');
        }

        this.clearGuessNumber();
      },
    );
  };

  startLogic = () => {
    const { errorAacceptable } = this.props;
    const secretNumbers = this.genereateSecretNumber();

    this.setState({
      level: 1,
      userErrorAacceptable: errorAacceptable,
      secretNumbers,
    });

    this.clearGuessNumber();
  };

  calcAnswer = (userNumber: string) => {
    const { level, secretNumbers } = this.state;
    const secretNumber = secretNumbers[level - 1];

    let secretArray = [] as any;
    let guessArray = [] as any;
    let bulls = 0;
    let cows = 0;

    secretArray = secretNumber.split('');
    guessArray = userNumber.split('');

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

    return { bulls, cows };
  };

  checkAnswer = () => {
    const { digitMax } = this.props;
    const { guessNumber } = this.state;

    const userValue = Object.values(guessNumber)
      .map((item: any) => item.value)
      .join('');

    const { bulls, cows } = this.calcAnswer(userValue);

    const userErrorAacceptable = this.state.userErrorAacceptable - 1;

    this.setBullsAndCows(bulls, cows);

    this.setLevelErrorAacceptable(userErrorAacceptable);
    this.setPrevGuessNumber(userValue.split(''));


    if (bulls === digitMax) return this.onResult(true);

    if (userErrorAacceptable === 0) return this.onResult(false);
  };

  renderFields = () => {
    const { digitMax } = this.props;
    const fields = _.range(digitMax);
    return fields.map(field => (
      <Field
        key={field}
        id={field.toString()}
        onChange={this.updateGuessNumber}
        value={this.state.guessNumber[field]}
      />
    ));
  };

  renderInner = () => {
    const { width, levelMaxCompleted, timeComplete } = this.props;

    return (
      <View
        style={{
          minHeight: width,
          ...styles.inner,
        }}
      >
        {timeComplete > 0 && (
          <View style={styles.progressTime}>
            <Timer
              ref={ref => (this.timerRef = ref)}
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
        <View style={styles.header}>
          <Text style={styles.label}>
            Уровень {this.state.level}/{levelMaxCompleted}
          </Text>
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
              {this.state.prevGuessNumber.length > 0 ? 'Попробовать еще' : 'Играть'}
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
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameArea: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
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
    flexWrap: 'wrap',
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
