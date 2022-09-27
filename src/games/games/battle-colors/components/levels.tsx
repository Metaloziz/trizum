import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class extends PureComponent<any, any> {

  render() {
    const {
      count = 2,
      onLevel = 3,
      progress = []
    } = this.props;

    const levelsSize = count * onLevel;
    const arrows = [];
    const levels = [];

    for(let i = 1;i<count;i++) {
      arrows.push(<View
        key={`arrow-${i}`}
        style={styles.arrow}
      />);
    }

    for(let i = 0;i<levelsSize;i++) {
      levels.push(<View
        key={`level-${i}`}
        style={{
          ...styles.level,
          ...(i == 0 ? {marginLeft : 0} : {}),
          ...(typeof progress[i] != 'undefined' ? {
            backgroundColor : progress[i]
          } : {})
        }}
      />);
    }

    return <View>
      <View style={styles.wrap}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Уровень 1</Text>
        </View>
        <View style={styles.wrapProgress}>
          <View
            style={styles.progress}
          />
          <View
            style={{
              ...styles.fill,
              ...styles.fillLevels
            }}
          >
            {levels}
          </View>
          <View
            style={{
              ...styles.fill,
              ...styles.fillArrow
            }}
          >
            {arrows}
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Уровень {count}</Text>
        </View>
      </View>
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    flex : 1,
    flexDirection : 'row'
  },
  wrapProgress : {
    flex : 1,
    height : 22,
    justifyContent : 'center',
    marginHorizontal : 6
  },
  item : {
    backgroundColor : '#e8eff6',
    height : 22,
    width : 60,
    borderRadius : 11,
    justifyContent : 'center',
    alignItems : 'center'
  },
  itemTitle : {
    fontSize : 9
  },
  progress : {
    height : 4,
    backgroundColor : '#e8eff6',
    borderRadius : 2
  },
  fill : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%'
  },
  fillArrow : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-evenly'
  },
  fillLevels : {
    flexDirection : 'row',
    alignItems : 'center'
  },
  level : {
    flex : 1,
    height : 4,
    marginLeft : 2,
    borderRadius : 2
  },
  arrow : {
    height : 12,
    width : 1,
    backgroundColor : '#cdcdcd'
  }
});
