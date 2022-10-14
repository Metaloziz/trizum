import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Props } from './types';

import Timer from '../../components/timer';
import StartTimer from '../../components/startTimer';
import { preloadFile as SoundPreload } from '../../common/sound';
import { rand } from '../../common/utils';

import BlinkView from './components/blink';

import { Game, GameResult } from '../../common/types';

const SPACE = 10;
const START_TIMER = 3;
const DELAY = 1200;

const SOUND_DO = require('./assets/do.wav');
const SOUND_RE = require('./assets/re.wav');
const SOUND_MI = require('./assets/mi.wav');
const SOUND_FA = require('./assets/fa.mp3');

export default class extends Component<any, any> implements Game {

  timerRef : any;
  soundItems : any;
  blinks : any;
  blinksPress : any;
  blinksRef : any;

  constructor(props : any) {
    super(props);

    this.soundItems = [];
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];

    this.state = {
      stage : 'listen',
      blink : false,
      started : false
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
    this.soundItems = [];
    this.blinksRef = [];

    Promise.all([
      SoundPreload(SOUND_DO),
      SoundPreload(SOUND_RE),
      SoundPreload(SOUND_MI),
      SoundPreload(SOUND_FA),
    ]).then(list => {
      this.soundItems = list;

      this.reset(() => {
        this.onNext();
        this.resume();
      });
    });
  }

  public stop = () => {
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];

    this.setState({
      stage : 'listen',
      blink : false,
      started : false
    });
  }

  private reset = (cb : any) => {
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];

    this.setState({
      stage : 'listen',
      blink : false,
      started : false
    }, cb);
  }

  onNext = () => {
    setTimeout(() => {
      this.startLogic();
    }, (START_TIMER + 1) * 1000);
  }

  startLogic = async () => {
    const {
      blinks = 2,
      colorsMap
    } = this.props;

    const data = [];

    for(let r = 0;r<blinks;r++) {
      data.push(
        rand(0, colorsMap.length - 1)
      );
    }

    this.blinks = data.slice();
    this.blinksPress = [];

    for(let i = 0;i < data.length;i++) {
      await this.onBlink(data[i], i == 0);
    }

    setTimeout(() => {
      this.setState({
        blink : false,
        stage : 'repeat'
      });
    }, DELAY);
  }

  onBlink = async (value : any, skipDelay = false) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.blinksRef?.[value]?.onBlink();
        // this.setState({
        //   blink : value
        // }, () => {
          resolve(true);
        // });
      }, skipDelay ? 0 : DELAY);
    });
  }

  public getConfig = () => {
    return [
      {
        name : 'blinks',
        type : 'select',
        title : 'Кол-во миганий',
        option : [2,3,4,5,6,7,8,9].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 2
      },
      {
        name : 'sound',
        type : 'select',
        title : 'Звук',
        option : [
          {
            title : 'Вкл',
            value : 1
          },
          {
            title : 'Выкл',
            value : 0
          }
        ],
        value : 1
      }
    ];
  }

  public prepareConfig = (result : any) => {
    return {
      sound : parseInt(result.sound),
      blinks : parseInt(result.blinks)
    };
  }

  onPress = (index : any) => () => {
    const needIndex = this.blinks[this.blinksPress.length];

    if(index == needIndex) {
      this.blinksPress.push(index);

      if(
        this.blinksPress.length >= this.blinks.length
      ) {
        this.end('win');
      }
    } else {
      this.end('lose');
    }
  }

  private end = (status = 'win') => {
    const time = this.timerRef?.getValue();

    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : status == 'win' ? 'win' : 'lose',
      time : time
    };

    onEnd(result);

    this.stop();
  }

  onRefBlink = (index : any) => (ref : any) => {
    this.blinksRef[index] = ref;
  }

  renderInner = () => {
    const {
      started,
      blink = false,
      stage = 'listen'
    } = this.state;

    const {
      blinks = 2,
      width,
      colorsMap,
      sound = 1
    } = this.props;

    const sizeBlink = Math.round((width - ((colorsMap.length - 1) * SPACE)) / colorsMap.length);

    return <>
      <View style={styles.wrapTop}>
        <Text style={styles.title}>{stage == 'listen' ? 'Запоминай' : 'Повторяй'}</Text>
      </View>
      <View
        style={{
          ...styles.game,
          width : width,
          height : width
        }}
      >
        {colorsMap.map((a : any, i : number) => <BlinkView
          key={`blink-${i}`}
          ref={this.onRefBlink(i)}
          color={a}
          size={sizeBlink}
          active={i === blink}
          onPress={stage == 'repeat' ? this.onPress(i) : undefined}
          sound={sound === 1 ? this.soundItems[i] : undefined}
        />)}
      </View>
      <View style={styles.wrapBottom}>
        {started && stage == 'repeat' && <Timer
          ref={ref => this.timerRef = ref}
          renderTime={(time : any) => <Text style={styles.timer}>{time} сек</Text>}
        />}
      </View>
    </>;
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
        width : width,
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
    marginBottom : 12
  },
  game : {
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  timer : {
    textAlign : 'center',
    marginTop : 12,
    fontSize : 14,
    lineHeight : 20,
  },
  wrapTop : {
    flex : 1,
    minHeight : 40
  },
  wrapBottom : {
    flex : 1,
    minHeight : 40
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 14,
    fontWeight : 'bold',
    marginBottom : 12
  }
});
