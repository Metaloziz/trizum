import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, ImageSourcePropType } from 'react-native';

import { Game, GameResult } from '../../common/types';
import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';

import _ from 'lodash';
import { DifferenceGameLevel } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import { UserPoints } from './UserPoints';
import { Counter } from './Counter';
import { Area, Point } from './types';
import { defaultPoints } from './assets/points';

const imageOne = require('./assets/difference-image-default-one.jpg');
const imageTwo = require('./assets/difference-image-default-two.jpg');

const START_TIMER = 3;

type ImageSize = {
  size: Area[];
};

const defaultGameLevels = [
  {
    differences: { areas: [], points: defaultPoints },
    images: [{ path: imageOne }, { path: imageTwo }],
  },
];

interface DifferenceState {
  started: boolean;
  errors: number;
  success: number;
  actions: number;
  levels: number;
  gameLevels: DifferenceGameLevel[];
  findingPoints: Record<number, Point[]>;
  imageSizes: ImageSize[];
  gameArea: Area;
  gameView: Record<number, Record<number, Area>>;
  ratio: Area;
}

export default class extends Component<any, DifferenceState> implements Game {
  timer: any;
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      errors: 0,
      success: 0,
      actions: 0,
      levels: 0,
      gameLevels: [],
      findingPoints: {},
      imageSizes: [],
      gameArea: { width: 0, height: 0 },
      gameView: {},
      ratio: { width: 0, height: 0 },
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;
    onRef(this);
  }

  setStarted = (status: boolean) =>
    this.setState({
      started: status,
    });

  setFindPoint = (pointIndex: number, points: Point[]) => {
    return this.setState((prev: any) => ({
      findingPoints: {
        ...prev.findingPoints,
        [pointIndex]: points,
      },
    }));
  };

  public resume = () => {
    this.setStarted(true);
  };

  public start = () => {
    this.reset(() => {
      this.onNext();
      this.resume();
    });
  };

  public stop = () => {
    this.setStarted(false);
    this.setState({ levels: 0, success: 0, errors: 0, actions: 0, findingPoints: {} });
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

  startLogic = () => {
    const { differenceGameLevels = defaultGameLevels } = this.props;
    this.calcDimensions(differenceGameLevels);
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;
    const { success, errors } = this.state;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success,
      failed: errors,
      time: time,
      finished: status === 'win' ? true : false,
    };

    onEnd(result);

    this.stop();
  };

  onResult = (result: boolean) => {
    const { errorAacceptable } = this.props;

    const { levels: currentLevel, gameLevels, findingPoints: currentFindingPoints, success: currentSuccess, errors: currentErrors } = this.state;

    const countDifference = gameLevels[currentLevel].differences.points.length / 4;

    const isLastLevel = gameLevels.length - (currentLevel + 1) === 0;

    const success = currentSuccess + (result ? 1 : 0);

    const errors = currentErrors + (result ? 0 : 1);

    const levels = currentLevel + (result && success === countDifference && !isLastLevel ? 1 : 0);

    const levelSuccess = Object.keys(currentFindingPoints).length + (result ? 1 : 0);

    this.setState(
      prev => ({ ...prev, success, errors, levels }),
      () => {
        if (errors >= errorAacceptable) {
          return this.end('lose');
        }

        if (!isLastLevel && levelSuccess === countDifference) {
          this.setState({ findingPoints: {} });
        }

        if (isLastLevel && levelSuccess === countDifference) {
          return this.end('win');
        }
      },
    );
  };

  calcDimensions = (gameLevels: DifferenceGameLevel[]) => {
    const imageSizes: ImageSize[] = [];

    gameLevels.forEach(levels => {
      const sizes: Area[] = [];

      levels.images.forEach(({ path }) => {
        Image.getSize(path, (width, height) => {
          sizes.push({ width, height });
        });
      });

      imageSizes.push({ size: sizes });
    });

    this.setState({ gameLevels, imageSizes });
  };

  incrimentActions = () =>
    this.setState({
      actions: this.state.actions + 1,
    });

  calcInArea = (a: any, b: any, c: any, d: any, e: any) => {
    const xPoints = [a.x, b.x, c.x, d.x].sort((a, b) => a - b);
    const yPoints = [a.y, b.y, c.y, d.y].sort((a, b) => a - b);

    const maxX = _.last(xPoints);
    const minX = _.first(xPoints);
    const maxY = _.last(yPoints);
    const minY = _.first(yPoints);

    const value = minX < e.x && e.x < maxX && minY < e.y && e.y < maxY;

    return value;
  };

  loopingPoints = ({ x, y }: Point) => {
    const { gameLevels, levels, ratio } = this.state;
    const E = { x, y };

    const points = gameLevels[levels].differences.points.map(({ x, y }) => ({
      x: Math.round(x / ratio.width),
      y: Math.round(y / ratio.width),
    }));

    let finding = false;

    for (let index = 0; index < points.length; index += 4) {
      const [A, B, C, D] = points.slice(index, index + 4);
      const isFinding = this.calcInArea(A, B, C, D, E);

      if (isFinding) {
        this.setFindPoint(index, [A, B, C, D]);
        finding = true;
      }
    }

    this.onResult(finding);
  };

  onHandleClick = (event: any) => {
    this.incrimentActions();

    const { layerX: x, layerY: y } = event;

    this.loopingPoints({ x, y });
  };

  setGameArea = (width: number, height: number) => this.setState({ gameArea: { width, height } });

  setDimensionsForGameView = (
    level: number,
    numberImage: number,
    width: number,
    height: number,
  ) => {
    this.setState(prevState => ({
      ...prevState,
      gameView: {
        ...prevState.gameView,
        [level]: { ...prevState.gameView[level], [numberImage]: { width, height } },
      },
    }));
  };

  calcRatio = (areaImage: Area, areaView: Area) => ({
    width: areaImage.width / areaView.width,
    height: areaImage.height / areaView.height,
  });

  setRatio = (levelNumber: number, width: number, height: number) => {
    const { started, imageSizes } = this.state;
    const imageSize = imageSizes[levelNumber].size[0];

    const ratio = this.calcRatio(imageSize, { width, height });

    if (started && isFinite(ratio.width) && isFinite(ratio.height)) {
      this.setState({ ratio });
    }
  };

  calcTouchArea = (
    levels: number,
    numberImage: number,
    gameView: Record<number, Record<number, Area>>,
  ) => {
    if (Object.keys(gameView).length > 0) {
      const { imageSizes } = this.state;
      const { width: imageWidth, height: imageHeight } = imageSizes[levels].size[numberImage];
      const { height } = gameView[0][numberImage];

      return imageWidth / (imageHeight / height);
    }
    return 0;
  };

  calcDifferenceArea = (points: Point[]) => {
    const [A, B, C, D] = points;
    return {
      height: D.y - A.y,
      width: B.x - A.x,
      left: A.x,
      top: A.y,
    };
  };

  renderInner = () => {
    const { timeComplete } = this.props;
    const { levels, gameLevels, findingPoints, gameView } = this.state;

    return (
      <View
        style={{
          minHeight: 675,
          ...styles.wrapLevels,
        }}
      >
        <Counter findingPoints={findingPoints} gameLevel={gameLevels[levels]} />
        <View style={{ ...styles.differenceImage, width: this.calcTouchArea(levels, 0, gameView) }}>
          <UserPoints numberImage={1} findingPoints={findingPoints} />
          <TouchableOpacity
            style={[
              styles.touchArea,
              styles.touchAreaFirst,
              {
                width: this.calcTouchArea(levels, 0, gameView),
              },
            ]}
            onPress={({ nativeEvent }) => this.onHandleClick(nativeEvent)}
            activeOpacity={1}
          >
            <Image
              source={gameLevels[levels].images[0].path as ImageSourcePropType}
              style={styles.image}
              resizeMode="contain"
              onLayout={({
                nativeEvent: {
                  layout: { width, height },
                },
              }) => {
                this.setRatio(levels, width, height);
                this.setDimensionsForGameView(levels, 0, width, height);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.differenceImage, width: this.calcTouchArea(levels, 0, gameView) }}>
          <UserPoints numberImage={2} findingPoints={findingPoints} />
          <TouchableOpacity
            style={[
              styles.touchArea,
              {
                width: this.calcTouchArea(levels, 0, gameView),
              },
            ]}
            onPress={({ nativeEvent }) => this.onHandleClick(nativeEvent)}
            activeOpacity={1}
          >
            <Image
              source={gameLevels[levels].images[1].path as ImageSourcePropType}
              style={styles.image}
              resizeMode="contain"
              onLayout={({
                nativeEvent: {
                  layout: { width, height },
                },
              }) => this.setDimensionsForGameView(levels, 1, width, height)}
            />
          </TouchableOpacity>
        </View>

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
        <TimerAll
          ref={(ref: any) => (this.timerAll = ref)}
          renderTime={(time: any) => (
            <View>
              <Text style={styles.timer}>{time} сек</Text>
            </View>
          )}
        />
      </View>
    );
  };

  render() {
    const { started } = this.state;
    const { width } = this.props;

    return (
      <View
        style={{ ...styles.wrap, width: width }}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => this.setGameArea(width, height)}
      >
        {started && <StartTimer time={START_TIMER} renderComponent={this.renderInner} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapLevels: {
    justifyContent: 'center',
    width: "85%",
    marginHorizontal: "auto"
  },
  timer: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
  },
  wrap: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  wrapTouchArea: {
    flexDirection: 'row',
  },
  differenceImage: {
    flex: 1,
    marginHorizontal: 'auto',
    position: 'relative',
  },
  touchArea: {
    flex: 1,
    marginHorizontal: 'auto',
  },
  touchAreaFirst: {
    marginBottom: 15,
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 15,
    marginHorizontal: 12,
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
  image: {
    flex: 1,
  },
});
