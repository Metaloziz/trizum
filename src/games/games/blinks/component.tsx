import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Props } from './types';

import Timer from '../../components/timer';
import StartTimer from '../../components/startTimer';
import TimerRevert from '../../components/timerRevert';
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
  successPress : any;
  failPress : any;
  result : GameResult;

  constructor(props : any) {
    super(props);

    this.soundItems = [];
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    this.result = {
      result : 'win',
      time : 0,
      levelMaxCompleted : 0,
      success : 0,
      failed : 0,
      finished : true
    };

    this.state = {
      level : 0,
      levels : [],
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
    this.successPress = 0;
    this.failPress = 0;

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
    this.successPress = 0;
    this.failPress = 0;

    this.setState({
      level : 0,
      levels : [],
      stage : 'listen',
      blink : false,
      started : false
    });
  }

  private reset = (cb : any) => {
    this.blinks = [];
    this.blinksPress = [];
    this.blinksRef = [];
    this.successPress = 0;
    this.failPress = 0;

    this.setState({
      level : 0,
      levels : [],
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

  onNextLevel = () => {
    setTimeout(() => {
      this.setState({
        stage : 'listen',
        blink : true
      }, () => {
        this.startLogic();
      });
    }, 1000);
  }

  startLogic = async () => {
    const {
      blinksCount = 2,
      colorsMap
    } = this.props;

    const data = [];

    for(let r = 0;r<blinksCount;r++) {
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
        name : 'timeComplete',
        type : 'select',
        title : 'Время на прохождение',
        option : [
          {
            title : 'Бесконечно',
            value : 0,
          },
          {
            title : '10 секунд',
            value : 10,
          },
          {
            title : '20 секунд',
            value : 20,
          },
          {
            title : '30 секунд',
            value : 30,
          },
        ],
        value : 0
      },
      {
        name : 'levelMaxCompleted',
        type : 'select',
        title : 'Кол-во уровней',
        option : [1,2,3,4,5,6,7,8,9].map(a => ({
          title : `${a}`,
          value : a
        })),
        value : 1
      },
      {
        name : 'blinksCount',
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
      blinksCount : parseInt(result.blinksCount),
      levelMaxCompleted : parseInt(result.levelMaxCompleted),
      timeComplete : parseInt(result.timeComplete),
    };
  }

  onPress = (index : any) => () => {
    const needIndex = this.blinks[this.blinksPress.length];

    if(index == needIndex) {
      this.blinksPress.push(index);

      this.successPress++;

      if(
        this.blinksPress.length >= this.blinks.length
      ) {
        this.end('win');
      }
    } else {
      this.failPress++;
      this.end('lose');
    }
  }

  private end = (status = 'win') => {
    const time = this.timerRef?.getValue();

    this.result.time += time;
    this.result.levelMaxCompleted = status == 'win' ? this.state.level+1 : this.result.levelMaxCompleted;
    this.result.success = this.successPress;
    this.result.failed = this.failPress;

    if(this.state.level+1 < this.props.levelMaxCompleted) {
      this.setState({
        level : this.state.level+1
      }, () => {
        this.onNextLevel();
      });
      return;
    }

    const {
      onEnd = () => {}
    } = this.props;

    // const result : GameResult = {
    //   result : status == 'win' ? 'win' : 'lose',
    //   finished : status === 'win',
    //   time : time,
    //   success : this.successPress,
    //   failed : this.failPress,
    // };

    onEnd(this.result);

    this.stop();

    // this.onNextLevel();
    // return;
    // const time = this.timerRef?.getValue();
    //
    // const {
    //   onEnd = () => {}
    // } = this.props;
    //
    // const result : GameResult = {
    //   result : status == 'win' ? 'win' : 'lose',
    //   finished : status === 'win',
    //   time : time,
    //   success : this.successPress,
    //   failed : this.failPress,
    // };
    //
    // onEnd(result);
    //
    // this.stop();
  }

  onEndTime = () => {
    const time = this.timerRef?.getValue();

    this.result.time += time;
    this.result.success = this.successPress;
    this.result.failed = this.failPress;
    this.result.finished = false;

    const {
      onEnd = () => {}
    } = this.props;

    onEnd(this.result);

    this.stop();
  }

  onRefBlink = (index : any) => (ref : any) => {
    this.blinksRef[index] = ref;
  }

  renderInner = () => {
    const {
      started,
      blink = false,
      stage = 'listen',
      level = 0
    } = this.state;

    const {
      blinksCount = 2,
      width,
      colorsMap,
      sound = 1,
      levelMaxCompleted = 5,
      timeComplete = 3
    } = this.props;

    const sizeBlink = Math.round((width - ((colorsMap.length - 1) * SPACE)) / colorsMap.length);

    return <>
      {levelMaxCompleted > 1 && <Text style={styles.levels}>Уровень {level+1}/{levelMaxCompleted}</Text>}
      {timeComplete > 0 && <View style={styles.progressTime}>
        <TimerRevert
          time={timeComplete}
          onEnd={this.onEndTime}
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
      </View>}
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
  },
  levels : {
    textAlign : 'center',
    fontSize : 14,
    fontWeight : 'bold',
    marginBottom : 12
  },
  progressTime : {
    height : 6,
    backgroundColor : '#E6EEF8',
    borderRadius : 3,
    overflow : 'hidden',
    marginTop : 0,
    marginHorizontal : 0,
    marginBottom : 12
  },
  progressTimeInner : {
    height : 6,
    backgroundColor : '#7427CC',
    borderRadius : 2,
  },
});
