import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';
import StartTimer from '../../components/startTimer';

import { Game, GameResult } from '../../common/types';

import { Board, WordsList } from './components';

import { Board as BoardType, Props, WordsPosition, UserClick } from './types';
import {
  getHorizontalPosition,
  getOrientationWord,
  getRandomChar,
  getVerticalPosition,
  generateRandomChar,
} from './utils/words';

const HEIGHT_AREA = 680;
const START_TIMER = 3;

interface State {
  started: boolean;
  success: number;
  board: BoardType;
  wordsMap: WordsPosition[];
  userClick: UserClick[];
  selected: string[];
}

export default class extends Component<Props, State> implements Game {
  timer: any;
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      success: 0,
      board: [],
      wordsMap: [],
      userClick: [],
      selected: [],
    };
  }

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
      success: 0,
      selected: [],
      userClick: [],
      wordsMap: [],
      board: [],
    });
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
      },
      cb,
    );
  };

  onNext = () => {
    this.startLogic();
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;

    const { success } = this.state;

    const time = this.timerAll?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success,
      failed: 0,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  startLogic = () => {
    console.log('START LOGIC !!!!');
    const { words } = this.props;

    let wordsMap: WordsPosition[] = [];

    const wordsList = words
      .sort((a, b) => a.length - b.length)
      .map(word => ({ word, orientation: getOrientationWord() }));

    const horizontalWords = wordsList.filter(({ orientation }) => orientation === 'horizontal');
    const verticalWords = wordsList.filter(({ orientation }) => orientation === 'vertical');

    const board: BoardType = {};

    const rows = verticalWords[verticalWords.length - 1].word.length + 4;
    const col = horizontalWords[horizontalWords.length - 1].word.length * 3;

    for (let y = 0; y < rows; y++) {
      board[y] = Array.from({ length: col }).map((item, index) => '');
    }

    wordsList.forEach(({ word, orientation }) => {
      if (orientation === 'horizontal') {
        const chars = word.split('');
        const { x, y, status } = getHorizontalPosition(board, word);
        if (!status) {
          console.log('LOOPING');
          return this.startLogic();
        }
        chars.forEach((char, index) => {
          board[y][x + index] = char.toLocaleUpperCase();
        });
        const start = { x, y };
        const end = { x: x + (word.length - 1), y };
        wordsMap.push({ orientation, start, end, word });
        console.table(board);
      }
      if (orientation === 'vertical') {
        const chars = word.split('');
        const { x, y, status } = getVerticalPosition(board, word);
        if (!status) {
          console.log('LOOPING');
          return this.startLogic();
        }
        chars.forEach((char, index) => {
          board[y + index][x] = char.toLocaleUpperCase();
        });
        const start = { x, y };
        const end = { x, y: y + (word.length - 1) };
        wordsMap.push({ orientation, start, end, word });
        console.table(board);
      }
    });

    generateRandomChar(board, rows);

    this.setState({ board, wordsMap });
  };

  addUserClick = (value: UserClick) =>
    this.setState(prev => ({ ...prev, userClick: [...prev.userClick, { ...value }] }));

  deleteClick = () => {
    const { userClick: currentUserClick } = this.state;
    const [last] = currentUserClick.slice(-1);
    if (last.start) {
      const userClick = currentUserClick.slice(0, -1);
      this.setState({ userClick });
    }
  };

  addSelected = (word: string) => {
    const {words } = this.props;
    const { selected: currentSelected, success: currentSuccess } = this.state;
    const countSelected = currentSelected.length + 1;
    const selected = [...currentSelected, word];
    const success = currentSuccess + 1;

    this.setState({ selected, success }, () => {
      if (countSelected === words.length) {
        return this.end('win');
      }
    });
  };

  renderInner = () => {
    const {timeComplete,  words } = this.props;
    const { board, wordsMap, userClick } = this.state;

    console.log({timeComplete})

    return (
      <View
        style={{
          minHeight: HEIGHT_AREA,
          ...styles.inner,
        }}
      >
        {timeComplete > 0 && (
          <View style={styles.progressTime}>
            <Timer
              ref={ref => (this.timer = ref)}
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
        <Board
          board={Object.values(board)}
          map={wordsMap}
          userClick={userClick}
          addUserClick={this.addUserClick}
          deleteUserClick={this.deleteClick}
          addSelected={this.addSelected}
        />
        <WordsList words={words} />
        <TimerAll ref={ref => (this.timerAll = ref)} />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  progressTime: {
    width: "100%",
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
  wrapLevels: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  level: {
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    marginHorizontal: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelStatistic: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  levelInner: {
    backgroundColor: '#7F28D9',
  },
  levelSuccess: {
    backgroundColor: 'green',
  },
  levelError: {
    backgroundColor: 'red',
  },
  сontent: {
    flex: 1,
    maxWidth: 860,
    position: 'relative',
    left: '10%',
    right: '10%',
    justifyContent: 'center',
  },
});
