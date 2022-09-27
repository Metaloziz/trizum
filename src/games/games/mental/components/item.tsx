import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';

import Timer from '../../../components/timer';
import EnterValue from '../../../components/enterValue';

export default class extends Component<any, any> {

  timer : any;

  constructor(props : any) {
    super(props);

    this.timer = false;

    this.state = {
      active : 0,
      showEnter : false,
      showResult : false
    };
  }

  componentDidMount() {
    this.startTick();
  }

  componentWillUnmount() {
    this.clear();
  }

  startTick = () => {
    const {
      delay = 1000
    } = this.props;

    this.timer = setTimeout(() => {
      this.onTick();
    }, delay);
  }

  onTick = () => {
    const {
      item
    } = this.props;

    const active = this.state.active + 1;

    if(active >= item.numbers.length) {
      this.setState({
        showEnter : true
      });
      return;
    }

    this.setState({
      active
    }, () => {
      this.startTick();
    });
  }

  clear = () => {
    if(this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = false;
  }

  onEnter = (value : any) => {
    const {
      item,
      onResult = () => {}
    } = this.props;

    let showResult = 'error';

    if(value == item.result) {
      showResult = 'success';
    }

    const timer : any = this?.refs?.timer;

    onResult(showResult == 'success', timer?.getValue());

    this.setState({
      showResult
    });
  }

  render() {
    const {
      active = 0,
      showEnter = false,
      showResult = false
    } = this.state;

    const {
      item,
      isLast = false,
      onNext = () => {}
    } = this.props;

    const showNumber = item?.numbers[active];

    if(showResult !== false) {
      return <View style={styles.wrap}>
        <Text
          style={{
            ...styles.title,
            ...(showResult == 'error' ? styles.titleError : {})
          }}
        >{showResult == 'success' ? 'ПРАВИЛЬНО!' : 'ОШИБКА!'}</Text>
        <View style={styles.wrapScroll}>
          <ScrollView style={styles.scroll}>
            {item?.numbers?.map((a : any, i : number) => <Text
              style={styles.resultNumber}
              key={`number-${i}`}
            >{`${i > 0 ? a > 0 ? '+' : '' : ''}${a}`}</Text>)}
            <Text
              style={styles.resultNumber}
            >{`= ${item.result}`}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onNext}
        >
          <Text
            style={styles.buttonTitle}
          >{isLast ? 'Закончить' : 'Следующая задача'}</Text>
        </TouchableOpacity>
      </View>;
    }

    return <View style={styles.wrap}>
      {!showEnter && <View style={styles.inner}>
        <Text style={styles.number}>{`${showNumber}`}</Text>
      </View>}
      {showEnter && <EnterValue
        onEnter={this.onEnter}
      />}
      <Timer
        ref='timer'
        renderTime={(time : any) => <Text style={styles.timer}>{time} сек</Text>}
      />
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1
  },
  inner : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  timer : {
    textAlign : 'center',
    marginTop : 12,
    fontSize : 14,
    lineHeight : 20,
  },
  number : {
    fontSize : 38,
    color : '#333',
    fontWeight : 'bold'
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 12,
    fontWeight : 'bold',
    marginBottom : 12
  },
  titleError : {
    color : '#db5552'
  },
  wrapScroll : {
    flex : 1
  },
  scroll : {
    flex : 1
  },
  resultNumber : {
    fontSize : 24,
    marginBottom : 6,
    fontWeight : 'bold'
  },
  button : {
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    backgroundColor : '#292ef9',
    marginTop : 12
  },
  buttonTitle : {
    color : '#fff',
    fontSize : 14
  },
});
