import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { rand } from '../../../common/utils';

interface Props {
  speed: number;
  onResult: (result: boolean) => void;
  width: number;
}
interface State {
  number: number[];
  show: boolean;
}

export default class extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      number: [rand(1, 99), rand(1, 99)],
      show: true,
    };
  }

  componentDidMount() {
    const { speed } = this.props;

    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, speed);
  }

  onPress = (reason: boolean) => () => {
    const { onResult = () => {} } = this.props;

    onResult(reason);
  };

  render() {
    const { show = false, number } = this.state;

    const { width } = this.props;

    let size = Math.floor(width / 4);

    if (size > 200) {
      size = 200;
    }

    return (
      <View style={styles.wrap}>
        <View style={styles.inner}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              ...styles.item,
            }}
          >
            {show && <Text style={styles.itemTitle}>{number[0]}</Text>}
          </View>
          <View
            style={{
              width: size,
              ...styles.center,
            }}
          >
            <View style={styles.dot} />
          </View>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              ...styles.item,
            }}
          >
            {show && <Text style={styles.itemTitle}>{number[1]}</Text>}
          </View>
        </View>
        <View style={styles.wrapBottom}>
          {!show && (
            <>
              <Text style={styles.title}>Какое из чисел больше?</Text>
              <View style={styles.wrapButtons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPress(number[0] >= number[1])}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTitle}>Слева</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpace} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPress(number[1] >= number[0])}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTitle}>Справа</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginBottom: 12,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 28,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapButtons: {
    marginTop: 12,
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  button: {
    height: 40,
    width: 110,
    borderRadius: 20,
    backgroundColor: '#2E8DFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpace: {
    flex: 1,
  },
  wrapBottom: {
    height: 70,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 14,
  },
});
