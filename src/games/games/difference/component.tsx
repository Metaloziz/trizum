import React, { Component, createRef } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native';

import { Game, GameResult } from '../../common/types';
import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';

import _ from 'lodash';

const imageOne = require('./assets/difference-image-default-one.jpg');
const imageTwo = require('./assets/difference-image-default-two.jpg');

const START_TIMER = 3;

type Point = {
  x: number;
  y: number;
};

type Area = {
  width: number;
  height: number;
};

const mockPointDifference = [
  { x: 185, y: 60 },
  { x: 208, y: 60 },
  { x: 185, y: 81 },
  { x: 208, y: 81 },
  { x: 120, y: 65 },
  { x: 128, y: 65 },
  { x: 120, y: 77 },
  { x: 128, y: 77 },
  { x: 509, y: 4 },
  { x: 533, y: 4 },
  { x: 533, y: 31 },
  { x: 509, y: 31 },
  { x: 498, y: 353 },
  { x: 506, y: 353 },
  { x: 506, y: 366 },
  { x: 498, y: 366 },
];

export default class extends Component<any, any> implements Game {
  timer: any;
  timerAll: any;
  gameArea: any;

  constructor(props: any) {
    super(props);

    this.gameArea = createRef();

    this.state = {
      started: false,
      errors: 0,
      success: 0,
      actions: 0,
      images: [],
      initPoints: mockPointDifference,
      points: mockPointDifference,
      findPoints: {},
      ratio: {
        width: 0,
        heigth: 0,
      },
      area: {
        width: 0,
        height: 0,
        image: {
          first: {
            width: 0,
            height: 0,
          },
          second: {
            width: 0,
            height: 0,
          },
        },
        renderView: {
          first: {
            width: 0,
            height: 0,
          },
          second: {
            width: 0,
            height: 0,
          },
        },
      },
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;
    onRef(this);
    Image.getSize(imageOne, (width, height) =>
      this.setSizeDimensions('image', 'first', { width, height }),
    );
    Image.getSize(imageTwo, (width, height) =>
      this.setSizeDimensions('image', 'second', { width, height }),
    );
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (Object.keys(this.state.findPoints).length === this.state.points.length / 4) {
      return this.end();
    }
    if (this.state.actions === this.props.errorAacceptable) {
      return this.end('lose');
    }
  }

  setStarted = (status: boolean) => {
    this.setState({
      started: status,
    });
  };

  setFindPoint = (pointIndex: number, points: Point[]) => {
    return this.setState((prev: any) => ({
      findPoints: {
        ...prev.findPoints,
        [pointIndex]: points,
      },
    }));
  };

  setInitPoinst = () => {
    console.log('init points');
    return this.setState((prev: any) => ({ ...prev, points: prev.initPoints }));
  };

  setSizeDimensions = (type: string, countImage: 'first' | 'second', { width, height }: Area) => {
    this.setState((prev: any) => ({
      ...prev,
      area: { ...prev.area, [type]: { ...prev.area[type], [countImage]: { width, height } } },
    }));
    if (countImage === 'first') {
      this.setRatio({ width, height });
    }
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
    this.setState((prev: any) => ({
      ...prev,
      findPoints: {},
      actions: 0,
    }));
    this.setInitPoinst();
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
        images: [],
      },
      cb,
    );
  };

  onNext = () => {
    // this.startLogic();
  };

  startLogic = () => {};

  onWin = () => {
    const { success, onEnd } = this.props;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    const successPoint = Object.keys(this.state.findPoints).length;

    const result: GameResult = {
      result: 'win',
      success: successPoint,
      failed: 0,
      finished: true,
      time: time,
    };

    onEnd(result);

    return this.stop();
  };

  onEnd = () => {
    this.end('lose');
  };

  private end = (status = 'win') => {
    const { onEnd = () => {} } = this.props;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    const result: GameResult = {
      result: status == 'win' ? 'win' : 'lose',
      success: Object.keys(this.state.findPoints).length,
      failed: this.state.errors,
      time: time,
    };

    onEnd(result);

    this.stop();
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
    const E = { x, y };

    for (let index = 0; index < this.state.points.length; index += 4) {
      const [A, B, C, D] = this.state.points.slice(index, index + 4);
      const isFinding = this.calcInArea(A, B, C, D, E);
      if (isFinding) {
        this.setFindPoint(index, [A, B, C, D]);
      }
    }
  };

  onHandleClick = (event: any) => {
    this.incrimentActions();

    const { layerX: x, layerY: y } = event;

    this.loopingPoints({ x, y });
  };

  setArea = (width: number, height: number) => {
    this.setState((prev: any) => ({ ...prev, area: { ...prev.area, width, height } }));
  };

  setSizeRenderView = (event: LayoutChangeEvent, countImage: 'first' | 'second') => {
    const {
      nativeEvent: {
        layout: { width, height },
      },
    } = event;
    this.setSizeDimensions('renderView', countImage, { width, height });
  };

  calcRatio = (areaImage: Area, areaView: Area) => ({
    width: areaImage.width / areaView.width,
    height: areaImage.height / areaView.height,
  });

  setRatio = (renderView: Area) => {
    const {
      started,
      area: { image },
    } = this.state;

    const ratio = this.calcRatio(image.first, renderView);

    if (started && isFinite(ratio.width) && isFinite(ratio.height)) {
      console.log('set ratio ---', { started, image, renderView, ratio });
      this.setState((prev: any) => ({
        ...prev,
        points: prev.points.map((point: Point) => ({
          x: Math.round(point.x / ratio.width),
          y: Math.round(point.y / ratio.width),
        })),
      }));
    }
  };

  calcTouchArea = (countArea: 'first' | 'second') => {
    return (
      this.state.area.image[countArea].width /
      (this.state.area.image[countArea].height / this.state.area.renderView[countArea].height)
    );
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

  calcCountDifference = () => this.state.points.length / 4;
  calcCountFindDifference = () => Object.keys(this.state.findPoints).length;

  renderInner = () => {
    const { width, timeComplete } = this.props;

    return (
      <View
        style={{
          minHeight: width,
          ...styles.wrapLevels,
        }}
      >
        <View style={styles.counterWrapper}>
          <Text>
            Найдено отличий {this.calcCountFindDifference()}/{this.calcCountDifference()}
          </Text>
        </View>
        <View style={{ ...styles.differenceImage, width: this.calcTouchArea('first') }}>
          <View style={styles.pointsWrap}>
            <View style={styles.pointsArea}>
              {Object.values(this.state.findPoints).map((value: any) => {
                const [A, B, C, D] = value;
                console.log({ A, B, C, D });
                return (
                  <View
                    // key={`${A},${B},${C},${D}`}
                    style={{
                      ...styles.differenceArea,
                      ...this.calcDifferenceArea([A, B, C, D]),
                    }}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.touchArea,
              styles.touchAreaFirst,
              {
                width: this.calcTouchArea('first'),
              },
            ]}
            onPress={({ nativeEvent }) => this.onHandleClick(nativeEvent)}
            activeOpacity={1}
          >
            <Image
              source={imageOne}
              style={styles.image}
              resizeMode="contain"
              onLayout={event => this.setSizeRenderView(event, 'first')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.differenceImage, width: this.calcTouchArea('second') }}>
          <View style={styles.pointsWrap}>
            <View style={styles.pointsArea}>
              {Object.values(this.state.findPoints).map((value: any) => {
                const [A, B, C, D] = value;
                return (
                  <View
                    // key={`${A},${B},${C},${D}`}
                    style={{
                      ...styles.differenceArea,
                      ...this.calcDifferenceArea([A, B, C, D]),
                    }}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.touchArea,
              {
                width: this.calcTouchArea('second'),
              },
            ]}
            onPress={({ nativeEvent }) => this.onHandleClick(nativeEvent)}
            activeOpacity={1}
          >
            <Image
              source={imageTwo}
              style={styles.image}
              resizeMode="contain"
              onLayout={event => this.setSizeRenderView(event, 'second')}
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
              renderTime={(t: any) => {
                let progress = ((timeComplete - t) / timeComplete) * 100;

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
        ref={this.gameArea}
        onLayout={({ nativeEvent: { layout } }) => this.setArea(layout.width, layout.height)}
      >
        {started && <StartTimer time={START_TIMER} renderComponent={this.renderInner} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapLevels: {
    justifyContent: 'center',
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
  counterWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  differenceImage: {
    flex: 1,
    marginHorizontal: 'auto',
    position: 'relative',
  },
  pointsWrap: {
    position: 'absolute',
    zIndex: 9999,
  },
  pointsArea: {
    flex: 1,
    position: 'relative',
  },
  differenceArea: {
    position: 'absolute',
    zIndex: 1,
    borderColor: 'red',
    borderWidth: 1,
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
  imageFirst: {
    marginBottom: 20,
  },
  differencePointView: {
    position: 'absolute',
    zIndex: 9999,
  },
  differencePoint: {
    position: 'absolute',
    zIndex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
});
