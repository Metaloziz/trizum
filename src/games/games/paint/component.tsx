import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Props } from './types';

import { Game, GameResult } from '../../common/types';

import StartTimer from '../../components/startTimer';
import Timer from '../../components/timerRevert';
import { arrayShuffle, isWeb } from '../../common/utils';

const START_TIMER = 3;

const imageBackground = require('./assets/background.png');

const MapElements = [
  {
    id : 1,
    image : require('./assets/animals/1.png'),
    mask : require('./assets/templates/1.png'),
  },
  {
    id : 2,
    image : require('./assets/animals/2.png'),
    mask : require('./assets/templates/2.png'),
  },
  {
    id : 3,
    image : require('./assets/animals/3.png'),
    mask : require('./assets/templates/3.png'),
  },
  {
    id : 4,
    image : require('./assets/animals/4.png'),
    mask : require('./assets/templates/4.png'),
  },
  {
    id : 5,
    image : require('./assets/animals/5.png'),
    mask : require('./assets/templates/5.png'),
  },
];

export default class extends Component<any, any> implements Game {

  constructor(props : any) {
    super(props);

    this.state = {
      started : false,
      elements : [],
      variants : [],
      score : 0
    };
  }

  componentDidMount() {
    const {
      onRef = () => {}
    } = this.props;

    onRef(this);

    // this.reset();
    // this.start();
  }

  public resume = () => {
    this.setState({
      started : true
    });
  }

  public start = () => {
    this.reset(() => {
      this.onNext();
      this.resume();
    });
  }

  public stop = () => {
    this.setState({
      started : false,
      elements : [],
      variants : [],
      score : 0
    });
  }

  private reset = (cb : any) => {
    this.setState({
      started : false,
      elements : [],
      variants : [],
      score : 0
    }, cb);
  }

  onNext = () => {
    this.startLogic();
  }

  startLogic = () => {
    const {
      elementsTotal = 1
    } = this.props;

    const randShuffle = arrayShuffle(MapElements.slice())?.slice(0, elementsTotal);
    const randVariants = arrayShuffle(MapElements.slice());

    this.setState({
      elements : randShuffle,
      variants : randVariants,
    });
  }

  public getConfig = () => {
    return [
      {
        name : 'timeComplete',
        type : 'select',
        title : 'Время на прохождение уровня',
        option : [10, 15, 30, 60, 120, 180].map(a => ({
          title : `${a} сек`,
          value : a
        })),
        value : 10
      },
      {
        name : 'elementsTotal',
        type : 'select',
        title : 'Количество фигур',
        option : [2, 3, 4].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 2
      }
    ];
  }

  public prepareConfig = (result : any) => {
    return {
      timeComplete : parseInt(result.timeComplete),
      elementsTotal : parseInt(result.elementsTotal)
    };
  }

  onClip = (id : any) => () => {
    const {
      onFeedbackError = () => {},
      onFeedbackSuccess = () => {},
    } = this.props;

    const elements = this.state.elements.slice();
    const variants = this.state.variants.slice();

    const exist = elements.find((a : any) => a.id == id) || false;

    if(exist) {
      onFeedbackSuccess();

      const setElements = elements.filter((a : any) => a.id != id);
      const setVariants = variants.filter((a : any) => a.id != id);

      this.setState({
        elements : setElements,
        variants : setVariants
      }, () => {
        if(setElements.length == 0) {
          this.onWin();
        }
      });
      return;
    }

    onFeedbackError();
    this.onEnd();
  }

  onWin = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : 'win'
    };

    onEnd(result);

    this.stop();
  }

  onEnd = () => {
    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : 'lose'
    };

    onEnd(result);

    this.stop();
  }

  renderInner = () => {
    const {
      elements = [],
      variants = []
    } = this.state;

    const {
      width,
      timeComplete
    } = this.props;

    const drawSpace = 12;
    const drawSize = (isWeb() ? width * 0.6 : width) - (drawSpace*2);
    const imageSize = drawSize - (drawSpace*2);

    return <View
      style={{
        ...styles.inner,
        minHeight : width
      }}
    >
      <Image
        source={imageBackground}
        style={styles.background}
      />
      <View style={styles.progressTime}>
        <Timer
          ref='timer'
          time={timeComplete}
          onEnd={this.onEnd}
          renderComponent={() => <View
            style={{
              ...styles.progressTimeInner,
              width : `100%`
            }}
          />}
          renderTime={(t : any) => {
            let progress = ((timeComplete - t) / timeComplete) * 100;

            if(progress > 100) {
              progress = 100;
            }

            return <View
              style={{
                ...styles.progressTimeInner,
                width : `${progress}%`
              }}
            />
          }}
        />
      </View>
      <View style={styles.wrapMain}>
        <View
          style={{
            ...styles.wrapDraw,
            width : drawSize,
            height : drawSize,
            margin : drawSpace
          }}
        >
          {elements.map((a : any) => <Image
            key={`mask-${a.id}`}
            source={a.mask}
            style={{
              ...styles.imageMask,
              width : imageSize,
              height : imageSize,
              top : drawSpace,
              left : drawSpace
            }}
          />)}
        </View>
        <View
          style={{
            ...styles.wrapVariants,
            width : drawSize,
            margin : drawSpace,
            marginTop : 0
          }}
        >
          {variants.map((a : any) => <TouchableOpacity
            key={`variant-${a.id}`}
            activeOpacity={0.8}
            style={{
              ...styles.wrapVariant,
              width : drawSize/4,
              height : drawSize/4,
            }}
            onPress={this.onClip(a.id)}
          >
            <Image
              source={a.image}
              style={styles.variantImage}
            />
          </TouchableOpacity>)}
        </View>
      </View>
    </View>;
  }

  render() {
    const {
      started
    } = this.state;

    const {
      width
    } = this.props;

    return <View
      style={{
        ...styles.wrap,
        width : width
      }}
    >
      {started && <StartTimer
        time={START_TIMER}
        renderComponent={this.renderInner}
      />}
    </View>;
  }

}

const styles = StyleSheet.create({
  wrap : {
    marginTop : 12,
    marginBottom : 12,
    borderRadius : 8,
    overflow : 'hidden'
  },
  inner : {
    flex : 1,
  },
  wrapMain : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  background : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    resizeMode : 'cover'
  },
  wrapDraw : {
    backgroundColor : '#fff',
    borderRadius : 8
  },
  wrapVariants : {
    backgroundColor : '#fff',
    borderRadius : 8,
    flexDirection : 'row',
    flexWrap : 'wrap'
  },
  imageMask : {
    position : 'absolute',
    resizeMode : 'contain'
  },
  wrapVariant : {
    alignItems : 'center',
    justifyContent : 'center'
  },
  variantImage : {
    width : '80%',
    height : '80%',
    resizeMode : 'contain'
  },
  progressTime : {
    height : 6,
    backgroundColor : '#E6EEF8',
    borderRadius : 3,
    overflow : 'hidden',
    marginTop : 12,
    marginHorizontal : 12
  },
  progressTimeInner : {
    height : '100%',
    backgroundColor : '#7427CC',
    borderRadius : 2,
  },
});