import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Timer from '../../../components/timerRevert';

interface Props {
  cycleTime: number;
  onPress: () => void;
}

export default class extends PureComponent<Props> {
  render() {
    const { cycleTime = 2, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
        <View style={styles.wrapProgress}>
          <Timer
            time={cycleTime}
            onEnd={onPress}
            renderTime={(timer: number) => {
              let progress = ((cycleTime - timer) / cycleTime) * 100;

              if (progress > 100) {
                progress = 100;
              }

              return (
                <View
                  style={{
                    ...styles.progress,
                    width: `${progress}%`,
                  }}
                />
              );
            }}
          />
        </View>
        <Text style={styles.buttonTitle}>Начать</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2e8dfd',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 14,
  },
  wrapProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
