import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapOptions : {
    flex : 1,
    justifyContent : 'center'
  },
  wrapOption : {
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    backgroundColor : '#e8eff6',
    marginTop : 12
  },
  optionTitle : {
    fontSize : 15,
    color : '#333',
    fontWeight : 'bold'
  },
  wrap : {
    flex : 1
  },
  wrapTop : {
    flex : 1,
    justifyContent : 'center'
  },
  wrapNumpad : {
    backgroundColor : '#e8eff6',
    borderRadius : 20,
    padding : 5
  },
  wrapRow : {
    flexDirection : 'row',
  },
  cell : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'rgba(255,255,255,0.4)',
    marginHorizontal : 5,
    marginVertical : 5,
    height : 50,
    borderRadius : 10
  },
  cellTitle : {
    fontSize : 15,
    color : '#333'
  },
  titleValue : {
    color : '#333',
    fontSize : 32,
    fontWeight : 'bold',
    textAlign : 'center'
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
  buttonTitleDisabled : {
    color : '#aaa'
  },
  buttonDisabled : {
    backgroundColor : '#e8eff6'
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 12,
    fontWeight : 'bold'
  }
});

export default class extends Component<any, any> {

  constructor(props : any) {
    super(props);

    this.state = {
      value : ''
    };
  }

  onPress = (char : any) => () => {
    const {
      value
    } = this.state;

    let tempValue : any = value;

    if(char === 'x') {
      tempValue = '';
    } else if(char === '<-') {
      tempValue = tempValue.substr(0, value.length - 1);
    } else {
      tempValue = `${tempValue}${char}`;
      tempValue = parseInt(tempValue);

      if(isNaN(tempValue)) {
        tempValue = '';
      }
    }

    this.setState({
      value : `${tempValue}`
    });
  }

  onSubmit = () => {
    const {
      value = ''
    } = this.state;

    if(value == '') {
      return;
    }

    this.submitResult(value)();
  }

  submitResult = (value : any) => () => {
    const {
      onEnter = () => {}
    } = this.props;

    onEnter(value);
  }

  render() {
    const {
      value = ''
    } = this.state;

    const {
      option = []
    } = this.props;

    const IsSelectOption = option.length > 0;

    return <View style={styles.wrap}>
      <Text style={styles.title}>{IsSelectOption ? 'ВЫБЕРИТЕ' : 'ВВЕДИТЕ'} РЕЗУЛЬТАТ</Text>
      {IsSelectOption && <View style={styles.wrapOptions}>
        {option.map((a : any, i : number) => <TouchableOpacity
          key={`option-${i}`}
          style={styles.wrapOption}
          activeOpacity={0.8}
          onPress={this.submitResult(a)}
        >
          <Text style={styles.optionTitle}>{a}</Text>
        </TouchableOpacity>)}
      </View>}
      {!IsSelectOption && <>
        <View style={styles.wrapTop}>
          <Text style={styles.titleValue}>{value || '-'}</Text>
        </View>
        <View style={styles.wrapNumpad}>
          {[
            [1,2,3],
            [4,5,6],
            [7,8,9],
            ['x', 0, '<-']
          ].map((row, row_i) => <View
            key={`row-${row_i}`}
            style={styles.wrapRow}
          >
            {row.map((cell, cell_i) => <TouchableOpacity
              key={`row-${row_i}-cell-${cell_i}`}
              style={styles.cell}
              activeOpacity={0.8}
              onPress={this.onPress(cell)}
            >
              <Text style={styles.cellTitle}>{`${cell}`}</Text>
            </TouchableOpacity>)}
          </View>)}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            ...(value == '' ? styles.buttonDisabled : {})
          }}
          onPress={this.onSubmit}
        >
          <Text
            style={{
              ...styles.buttonTitle,
              ...(value == '' ? styles.buttonTitleDisabled : {})
            }}
          >Подтвердить</Text>
        </TouchableOpacity>
      </>}
    </View>;
  }

}
