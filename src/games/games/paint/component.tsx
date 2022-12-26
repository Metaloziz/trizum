import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ImageSourcePropType } from 'react-native';
import { Props, GameItem, GameStatistic } from './types';

import { Game, GameResult } from '../../common/types';

import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';
import TimerAll from '../../components/timer';
import { arrayShuffle, isWeb } from '../../common/utils';

const HEIGHT_AREA = 680;

const START_TIMER = 3;

const DRAW_SPACE = 12;

const imageBackground = require('./assets/background.png');

const MapElements = [
  {
    id: 1,
    image: require('./assets/animals/1.png'),
    mask: require('./assets/templates/1.png'),
  },
  {
    id: 2,
    image: require('./assets/animals/2.png'),
    mask: require('./assets/templates/2.png'),
  },
  {
    id: 3,
    image: require('./assets/animals/3.png'),
    mask: require('./assets/templates/3.png'),
  },
  {
    id: 4,
    image: require('./assets/animals/4.png'),
    mask: require('./assets/templates/4.png'),
  },
  {
    id: 5,
    image: require('./assets/animals/5.png'),
    mask: require('./assets/templates/5.png'),
  },
  {
    id: 6,
    image: require('./assets/animals/6.png'),
    mask: require('./assets/templates/6.png'),
  },
  {
    id: 7,
    image: require('./assets/animals/7.png'),
    mask: require('./assets/templates/7.png'),
  },
  {
    id: 8,
    image: require('./assets/animals/8.png'),
    mask: require('./assets/templates/8.png'),
  },
  {
    id: 9,
    image: require('./assets/animals/9.png'),
    mask: require('./assets/templates/9.png'),
  },
  {
    id: 10,
    image: require('./assets/animals/10.png'),
    mask: require('./assets/templates/10.png'),
  },
];

interface State {
  started: boolean;
  elements: GameItem[];
  variants: GameItem[];
  score: number;
  gameStatistic: GameStatistic[];
}

export default class extends Component<Props, State> implements Game {
  timerRef: any;
  timerAll: any;

  constructor(props: any) {
    super(props);

    this.state = {
      started: false,
      elements: [],
      variants: [],
      score: 0,
      gameStatistic: [],
    };
  }

  componentDidMount() {
    const { onRef = () => {} } = this.props;

    onRef(this);

    // this.reset();
    // this.start();
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
      elements: [],
      variants: [],
      score: 0,
      gameStatistic: [],
    });
  };

  private reset = (cb: any) => {
    this.setState(
      {
        started: false,
        elements: [],
        variants: [],
        score: 0,
      },
      cb,
    );
  };

  onNext = () => {
    this.startLogic();
  };

  startLogic = () => {
    const { elementsTotal, digitMax } = this.props;

    const randVariants = arrayShuffle(MapElements.slice()).slice(0, digitMax);

    const randShuffle = arrayShuffle(randVariants.slice())?.slice(0, elementsTotal);

    this.setState({
      elements: randShuffle,
      variants: randVariants,
    });
  };

  onClip = (id: number) => () => {
    const { onFeedbackError = () => {}, onFeedbackSuccess = () => {} } = this.props;
    const elements = this.state.elements.slice();
    const variants = this.state.variants.slice();

    const exist = elements.find(element => element.id == id) || false;

    if (exist) {
      const score = this.state.score + 1;
      onFeedbackSuccess();
      const { gameStatistic, elements, variants } = this.triggerEngine(id);
      const setElements = elements.filter(element => element.id != id);
      const setVariants = variants.filter(variant => variant.id != id);

      this.setState(
        {
          elements: setElements,
          variants: setVariants,
          gameStatistic,
          score,
        },
        () => {
          if (setElements.length == 0) {
            this.onWin();
          }
        },
      );
      return;
    }

    onFeedbackError();
    this.onEnd();
  };

  private triggerEngine = (id: number) => {
    const {
      perSuccessLevel: maxAverageTime,
      maxErrorLevel: countUserPress,
      upgrade: countElements,
      downgrade: countVariants,
    } = this.props;

    const {
      gameStatistic: currentGameStatistic,
      elements: currentElements,
      variants: currentVariants,
    } = this.state;

    const lastTime = currentGameStatistic.reduce((acc, { time }) => acc + time, 0);
    const currentTime = this.timerAll?.getValue() || 0;

    const lastClickTime = currentTime - lastTime;
    const userClickTime = lastClickTime > 0 ? lastClickTime : 0.5;

    const gameStatistic = [
      ...currentGameStatistic,
      { time: userClickTime, elements: currentElements.length, variants: currentVariants.length },
    ];

    const lastStatistic = gameStatistic.slice(-countUserPress);

    let elements = currentElements;
    let variants = currentVariants;

    if (lastStatistic.length === countUserPress) {
      const averageTime =
        lastStatistic.reduce((acc, { time }) => acc + time, 0) / lastStatistic.length;

      let availableElements: GameItem[] = [];
      let availableVariants: GameItem[] = [];

      MapElements.forEach(mapElement => {
        const existElement = currentElements.find(element => element.id === mapElement.id);
        const existVariant = currentVariants.find(variant => variant.id === mapElement.id);
        if (!existElement) {
          availableElements.push(mapElement);
        }
        if (!existVariant) {
          availableVariants.push(mapElement);
        }
      });

      if (maxAverageTime > averageTime) {
        elements = [...elements, ...availableElements.slice(0, countElements)];
        variants = [...variants, ...availableVariants.slice(0, countVariants)];
      }

      if (maxAverageTime <= averageTime && elements.length > 2) {
        const selectedElement = elements.find(element => element.id === id);

        const countCurrentElements = elements.length;

        if (selectedElement) {
          elements = elements.slice(0, countCurrentElements - 1);
          let deletedItems: GameItem[] = [];

          variants.forEach(variant => {
            const existItem = elements.find(elements => elements.id === variant.id);
            if (!existItem) {
              deletedItems.push(variant);
            }
          });

          variants = variants.filter(
            variant => variant.id !== selectedElement.id && variant.id !== deletedItems[0].id,
          );
        }
      }
    }

    return { gameStatistic, elements, variants };
  };

  onWin = () => {
    const { onEnd = () => {} } = this.props;
    const { score } = this.state;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    const result: GameResult = {
      result: 'win',
      success: score,
      failed: 0,
      finished: true,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  onEnd = () => {
    const { onEnd = () => {} } = this.props;
    const { score } = this.state;

    const timer: any = this.timerAll;
    const time = timer?.getValue();

    if (score > 0 || score >= MapElements.length) {
      this.onWin();
    }

    const result: GameResult = {
      result: 'lose',
      finished: false,
      success: score,
      failed: 1,
      time: time,
    };

    onEnd(result);

    this.stop();
  };

  renderInner = () => {
    const { timeComplete } = this.props;

    const { elements = [], variants = [] } = this.state;

    const drawSize = (isWeb() ? HEIGHT_AREA * 0.6 : HEIGHT_AREA) - DRAW_SPACE * 2;
    const imageSize = drawSize - DRAW_SPACE * 2;

    return (
      <View
        style={{
          ...styles.inner,
          minHeight: HEIGHT_AREA,
        }}
      >
        <Image source={imageBackground} style={styles.background} />
        {timeComplete && timeComplete > 0 && (
          <View style={styles.progressTime}>
            <Timer
              ref={(ref: any) => (this.timerRef = ref)}
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
        <View style={styles.wrapMain}>
          <View
            style={{
              ...styles.wrapDraw,
              width: drawSize,
              height: drawSize,
              margin: DRAW_SPACE,
            }}
          >
            {elements.map(({ id, mask }) => (
              <Image
                key={`mask-${id}`}
                source={mask as ImageSourcePropType}
                style={{
                  ...styles.imageMask,
                  width: imageSize,
                  height: imageSize,
                  top: DRAW_SPACE,
                  left: DRAW_SPACE,
                }}
              />
            ))}
          </View>
          <View
            style={{
              ...styles.wrapVariants,
              width: drawSize,
              margin: DRAW_SPACE,
              marginTop: 0,
            }}
          >
            {variants.map(({ id, image }) => (
              <TouchableOpacity
                key={`variant-${id}`}
                activeOpacity={0.8}
                style={{
                  ...styles.wrapVariant,
                  width: drawSize / 4,
                  height: drawSize / 4,
                }}
                onPress={this.onClip(id)}
              >
                <Image source={image as ImageSourcePropType} style={styles.variantImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TimerAll
          ref={(ref: any) => (this.timerAll = ref)}
          renderTime={(time: number) => <Text style={styles.timer}>{time} сек</Text>}
        />
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
    marginBottom: 6,
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
  },
  wrapMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wrapDraw: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  wrapVariants: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageMask: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  wrapVariant: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  progressTime: {
    height: 6,
    backgroundColor: '#E6EEF8',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
    marginHorizontal: 12,
  },
  progressTimeInner: {
    height: '100%',
    backgroundColor: '#7427CC',
    borderRadius: 2,
  },
});
