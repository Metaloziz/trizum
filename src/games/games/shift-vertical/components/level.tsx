import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { rand } from '../../../common/utils';

import { GameForms, GameForm } from '../common/forms';
import { GameColors } from '../common/colors';
import TimerButton from './timerButton';

export default class extends Component<any, any> {

  activeColors : any[];
  activeForms : any[];

  constructor(props : any) {
    super(props);

    const {
      groupsCount = 2,
      blinksCount = 2,
    } = props;

    this.activeColors = GameColors.slice(0, groupsCount);
    this.activeForms = GameForms.slice(0, blinksCount);

    const valiants : any = {
      color : {
        color : this.getRandValue(this.activeColors),
        form : this.getRandValue(this.activeForms)
      }
    };

    valiants.form = {
      color : this.getRandValue(this.activeColors, valiants.color.color),
      form : this.getRandValue(this.activeForms, valiants.color.form)
    };

    this.state = {
      stage : 0,
      color : this.getRandValue(this.activeColors),
      form : this.getRandValue(this.activeForms),
      valiants
    };
  }

  getRandValue = (data : any, exclude = false) => {
    let arrayData = data.slice();

    if(exclude !== false && arrayData.length !== 1) {
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

  onColor = () => {
    this.addProgress('#2e8dfd');

    this.setState({
      stage : 1
    });
  }

  onSubmit = (result = 'error') => () => {
    const {
      stage,
      color,
      form,
      valiants
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

    if(stage == 1) { // Compare color
      if(
        result == 'success' &&
        valiants.color.color == color
      ) {
        onSuccess();
      } else if(
        result == 'error' &&
        valiants.color.color !== color
      ) {
        onSuccess();
      } else {
        onError();
      }

      this.setState({
        stage : 2
      });
    }

    if(stage == 2) { // Compare form
      if(
        result == 'success' &&
        valiants.form.form == form
      ) {
        onSuccess();
      } else if(
        result == 'error' &&
        valiants.form.form !== form
      ) {
        onSuccess();
      } else {
        onError();
      }

      onEnd();
    }
  }

  render() {
    const {
      cycleTime = 3
    } = this.props;

    const {
      stage = 0,
      color,
      valiants,
      form
    } = this.state;

    if(stage == 0) {
      return <View style={styles.wrap}>
        <Text style={styles.title}>ЗАПОМНИТЕ ЦВЕТ И ФОРМУ</Text>
        <View style={styles.inner}>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text style={styles.itemTitleText}>Цвет</Text>
            </View>
            <View style={styles.itemBlock}>
              {GameForm[this.getRandValue(this.activeForms, form)](80, color)}
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text style={styles.itemTitleText}>Форма</Text>
            </View>
            <View style={styles.itemBlock}>
              {GameForm[form](80, this.getRandValue(this.activeColors, color))}
            </View>
          </View>
        </View>
        <View>
          <TimerButton
            onPress={this.onColor}
            cycleTime={cycleTime}
          />
        </View>
      </View>;
    }

    return <View style={styles.wrap}>
      <Text style={styles.title}>{stage == 1 ? 'ЦВЕТ' : 'ФОРМА'} ФИГУРЫ СОВПАДАЕТ?</Text>
      <View style={styles.inner}>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitleText}>Цвет</Text>
          </View>
          <View style={styles.itemBlock}>
            {GameForm[valiants.color.form](80, valiants.color.color)}
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitleText}>Форма</Text>
          </View>
          <View style={styles.itemBlock}>
            {GameForm[valiants.form.form](80, valiants.form.color)}
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
    justifyContent : 'center',
    alignItems : 'center'
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 12,
    fontWeight : 'bold'
  },
  item : {
    flexDirection : 'row',
    marginVertical : 6,
    alignItems : 'center'
  },
  itemTitle : {
    width : 70,
    height : 28,
    backgroundColor : '#2e8dfd',
    justifyContent : 'center',
    alignItems : 'center',
    borderTopLeftRadius : 14,
    borderBottomLeftRadius : 14
  },
  itemTitleText : {
    color : '#fff',
    fontSize : 12
  },
  itemBlock : {
    width : 100,
    height : 100,
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
