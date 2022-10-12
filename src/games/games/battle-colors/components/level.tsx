import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { rand, arrayShuffle } from '../../../common/utils';

import { GameColors } from '../common/colors';

export default class extends Component<any, any> {

  activeColors : any[];

  constructor(props : any) {
    super(props);

    const {
      blinksCount = 2,
    } = props;

    this.activeColors = arrayShuffle(GameColors.slice()).slice(0, blinksCount);

    const colorRight = {
      title : this.getRandValue(this.activeColors).title,
      color : this.getRandValue(this.activeColors).color
    };

    this.state = {
      colorLeft : this.getRandValue(this.activeColors),
      colorRight : colorRight
    };
  }

  getRandValue = (data : any, exclude = false) => {
    let arrayData = data.slice();

    if(exclude !== false) {
      arrayData = arrayData.filter((a : any) => a != exclude);
    }

    const index = rand(0, arrayData.length - 1);
    const value = arrayData[index];

    if(typeof value == 'undefined') {
      return arrayData[0];
    }

    return value;
  }

  addProgress = (color : any) => {
    const {
      onProgress = () => {}
    } = this.props;


    onProgress(color);
  }

  onSubmit = (result = 'error') => () => {
    const {
      colorLeft,
      colorRight
    } = this.state;

    const {
      onEnd = () => {},
      onResult = () => {}
    } = this.props;

    const onSuccess = () => {
      onResult('success');
      this.addProgress('#4CAF50');
    };
    const onError = () => {
      onResult('failed');
      this.addProgress('#F44336');
    };

    if(
      result == 'success' &&
      colorLeft.color === colorRight.color
    ) {
      onSuccess();
    } else if(
      result == 'error' &&
      colorLeft.color !== colorRight.color
    ) {
      onSuccess();
    } else {
      onError();
    }

    onEnd();

    // if(stage == 1) { // Compare color
    //   if(
    //     result == 'success' &&
    //     valiants.color.color == color
    //   ) {
    //     onSuccess();
    //   } else if(
    //     result == 'error' &&
    //     valiants.color.color !== color
    //   ) {
    //     onSuccess();
    //   } else {
    //     onError();
    //   }
    //
    //   this.setState({
    //     stage : 2
    //   });
    // }
    //
    // if(stage == 2) { // Compare form
    //   if(
    //     result == 'success' &&
    //     valiants.form.form == form
    //   ) {
    //     onSuccess();
    //   } else if(
    //     result == 'error' &&
    //     valiants.form.form !== form
    //   ) {
    //     onSuccess();
    //   } else {
    //     onError();
    //   }
    //
    //   onEnd();
    // }
  }

  render() {
    const {
      width
    } = this.props;

    const {
      colorLeft,
      colorRight
    } = this.state;

    const blockWidth = Math.round((width * 0.4));

    return <View style={styles.wrap}>
      <Text style={styles.title}>Совпадает ли название цвета в левом блоке с цветом слова в правом?</Text>
      <View style={styles.inner}>
        <View style={styles.item}>
          <View
            style={{
              ...styles.itemBlock,
              width : blockWidth
            }}
          >
            <Text
              style={styles.colorTitle}
            >{colorLeft.title}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View
            style={{
              ...styles.itemBlock,
              width : blockWidth
            }}
          >
            <Text
              style={{
                ...styles.colorTitle,
                color : colorRight.color
              }}
            >{colorRight.title}</Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            backgroundColor : '#292ef9'
          }}
          onPress={this.onSubmit('error')}
        >
          <Text
            style={styles.buttonTitle}
          >Не совпадает</Text>
        </TouchableOpacity>
        <View
          style={styles.buttonSpace}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={this.onSubmit('success')}
        >
          <Text
            style={styles.buttonTitle}
          >Совпадает</Text>
        </TouchableOpacity>
      </View>
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1,
    marginVertical : 12
  },
  inner : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  colorTitle : {
    textAlign : 'center',
    color : '#333',
    fontSize : 16,
    fontWeight : 'bold'
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 12,
    fontWeight : 'bold'
  },
  item : {
    flexDirection : 'row',
    marginHorizontal : 6,
    alignItems : 'center'
  },
  itemBlock : {
    width : 300,
    height : 120,
    backgroundColor : '#e8eff6',
    borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  button : {
    flex : 1,
    height : 36,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    backgroundColor : '#2e8dfd',
  },
  buttonTitle : {
    color : '#fff',
    fontSize : 14
  },
  wrapButtons : {
    flexDirection : 'row'
  },
  buttonSpace : {
    width : 12
  }
});
