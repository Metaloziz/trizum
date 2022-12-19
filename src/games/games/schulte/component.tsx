import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { Game, GameResult } from '../../common/types';
import { Props, NeedItem, GameStatistic } from './types';

import ErrorBlock from './components/errorBlock';

import Timer from '../../components/timer';
import TimerRevert from '../../components/timerRevert';

import { generateLayout } from './utils/logic';

const ErrorColor = 'rgba(0,255,0, 0.1)';
const HEIGHT_AREA = 650;

interface State {
  started: boolean;
  need: NeedItem | undefined;
  list: NeedItem[];
  layout: NeedItem[][];
  gameStatistic: GameStatistic[];
}

export default class extends Component<Props, State> implements Game {
  counterFailed: any;
  counterSuccess: any;
  levelMaxCompleted: any;
  errorBlock: any;
  successBlock: any;
  timerRef: any;

  constructor(props: any) {
    super(props);

    this.counterFailed = 0;
    this.counterSuccess = 0;
    this.levelMaxCompleted = 0;

    this.state = {
      started: false,
      need: {
        text: '',
        color: '',
      },
      list: [],
      layout: [],
      gameStatistic: [],
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);

    this.reset(() => {});
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
      gameStatistic: [],
    });
  };

  private reset = (cb: any) => {
    const { list, layout } = generateLayout(this.props);

    this.counterFailed = 0;
    this.counterSuccess = 0;
    this.levelMaxCompleted = 0;

    this.setState(
      {
        started: false,
        list,
        layout,
      },
      cb,
    );
  };

  private onSelect = (item: NeedItem, x: number, y: number) => () => {
    const { need } = this.state;

    if ((need && need.text != item.text) || (need && need.color != item.color)) {
      this.counterFailed++;
      this.errorBlock?.show(x, y);
      return;
    }

    if (parseInt(item.text) > this.levelMaxCompleted) {
      this.levelMaxCompleted = parseInt(item.text);
    }

    this.counterSuccess++;
    this.successBlock?.show(x, y);

    this.onNext();
  };

  private triggerEngine = () => {
    const {
      perSuccessLevel: maxAverageTime,
      maxErrorLevel: countUserPress,
      upgrade,
      colorsMap,
      digitMin,
    } = this.props;

    const { gameStatistic: currentGameStatistic, layout, list: currentList } = this.state;

    const lastTime = currentGameStatistic.reduce((acc, { time }) => acc + time, 0);
    const currentTime = this.timerRef?.getValue() || 0;

    const lastClickTime = currentTime - lastTime;
    const userClickTime = lastClickTime > 0 ? lastClickTime : 0.5;

    const gameStatistic = [
      ...currentGameStatistic,
      { time: userClickTime, elementsTotal: layout.length },
    ];

    const lastStatistic = gameStatistic.slice(-countUserPress);

    let list = currentList;
    let elementsTotal = layout.length;

    if (lastStatistic.length === countUserPress) {
      const averageTime =
        lastStatistic.reduce((acc, { time }) => acc + time, 0) / lastStatistic.length;

      if (maxAverageTime > averageTime && elementsTotal < 10) {
        elementsTotal += upgrade;
        const newList = generateLayout({ elementsTotal, digitMin, colorsMap });
        list = newList.list;
        this.setState({ layout: newList.layout });
      }

      if (maxAverageTime < averageTime && elementsTotal > 2) {
        elementsTotal -= upgrade;
        const newList = generateLayout({ elementsTotal, digitMin, colorsMap });
        list = newList.list;
        this.setState({ layout: newList.layout });
      }
    }

    return { gameStatistic, list };
  };

  private onNext = () => {
    const { list = [] } = this.state;

    if (list.length == 0) {
      this.end(true);
      return;
    }

    const { gameStatistic, list: newList } = this.triggerEngine();

    const setList = newList.slice(); // Delete link
    const need = setList.pop();

    this.setState({
      list: setList,
      need,
      gameStatistic,
    });
  };

  private end = (finished = false) => {
    const time = this.timerRef.getValue();

    const { onEnd = () => {} } = this.props;

    const result: GameResult = {
      finished: finished,
      result: 'end',
      time: time,
      failed: this.counterFailed,
      success: this.counterSuccess,
      levelMaxCompleted: this.levelMaxCompleted,
    };

    onEnd(result);

    this.counterFailed = 0;
    this.counterSuccess = 0;
    this.levelMaxCompleted = 0;

    this.stop();
  };

  render() {
    const { elementsTotal, timeComplete } = this.props;

    const { started = false, need, layout } = this.state;

    const cellSize = HEIGHT_AREA / elementsTotal;

    return (
      <View style={styles.wrap}>
        {started && timeComplete && timeComplete > 0 && (
          <View style={styles.progressTime}>
            <TimerRevert
              time={5000000}
              onEnd={() => this.end(false)}
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
        {started && (
          <Text style={styles.title}>
            Выберите:{' '}
            <Text style={{ ...styles.title, ...styles.titleActive, color: need?.color }}>
              {need?.text}
            </Text>
          </Text>
        )}
        <View
          style={{
            ...styles.game,
            width: HEIGHT_AREA,
            height: (HEIGHT_AREA / elementsTotal) * elementsTotal,
          }}
        >
          <ErrorBlock onRef={(ref: any) => (this.errorBlock = ref)} size={HEIGHT_AREA / elementsTotal} />
          <ErrorBlock
            onRef={(ref: any) => (this.successBlock = ref)}
            size={HEIGHT_AREA / elementsTotal}
            color={ErrorColor}
          />
          {layout.map((row, ri: number) => (
            <View
              key={`row-${ri}`}
              style={{
                ...styles.row,
                ...(layout.length - 1 == ri
                  ? {
                      borderBottomWidth: 0,
                    }
                  : {}),
              }}
            >
              {row.map((cell, ci: number) => (
                <TouchableOpacity
                  key={`cell-${ri}-${ci}`}
                  style={{
                    ...styles.cell,
                    ...(row.length - 1 == ci
                      ? {
                          borderRightWidth: 0,
                        }
                      : {}),
                  }}
                  activeOpacity={0.8}
                  onPress={this.onSelect(cell, ci, ri)}
                >
                  <Text
                    style={{
                      ...styles.cellTitle,
                      fontSize: row.length > 7 ? cellSize / row.length :  cellSize * 0.3,
                      color: cell.color,
                    }}
                  >
                    {cell.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        {started && (
          <Timer
            ref={(ref: any) => (this.timerRef = ref)}
            renderTime={(time: number) => <Text style={styles.timer}>{time} сек</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    marginBottom: 12,
  },
  game: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cdcdcd',
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#cdcdcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleActive: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  timer: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 22,
  },
  progressTimeInner: {
    height: 6,
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
});
