import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Props } from './types';

import TimerRevert from '../../components/timerRevert';
import Timer from '../../components/timer';
import StartTimer from '../../components/startTimer';
import { isWeb } from '../../common/utils';

import { Game, GameResult } from '../../common/types';

import Item from './components/item';

const START_TIMER = 3;
const START_GAME = 5;

const imageBackground = require('./assets/background.png');

export default class extends Component<any, any> implements Game {

  list : any;
  timerRef : any;

  constructor(props : any) {
    super(props);

    this.list = [];

    this.state = {
      ended : false,
      started : false,
      another : 0,
      flight : true
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
      ended : false,
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
      ended : false,
      started : false,
      another : 0,
      flight : true
    });
  }

  private reset = (cb : any) => {
    this.setState({
      ended : false,
      started : false,
      another : 0,
      flight : true
    }, cb);
  }

  onNext = () => {
    this.startLogic();
  }

  startLogic = () => {
    const {
      elementsTotal
    } = this.props;

    setTimeout(() => {
      this.setState({
        another : Math.ceil(elementsTotal * 1.5)
      });
    }, (START_TIMER + START_GAME) * 1000);
  }

  public getConfig = () => {
    return [
      {
        name : 'timeComplete',
        type : 'select',
        title : 'Время на перемешивание',
        option : [10, 15, 30, 60, 120, 180].map(a => ({
          title : `${a} сек`,
          value : a
        })),
        value : 10
      },
      {
        name : 'elementsTotal',
        type : 'select',
        title : 'Количество светлячков',
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

  endFlight = () => {
    const {
      elementsTotal
    } = this.props;

    this.list = [];

    for(let i = 0;i<elementsTotal;i++) {
      this.list.push(false);
    }

    this.setState({
      flight : false
    });
  }

  onPressResult = (type : string, id : number) => () => {
    if(this.state.flight) {
      return;
    }

    if(type == 'lose') {
      this.end('lose');
      return;
    }

    this.list[id] = true;

    if(typeof this.list.find((a : any) => a == false) != 'undefined') {
      return;
    }

    this.end('win');
  }

  private end = (status = 'win') => {
    this.setState({
      ended : true
    });

    const time = this.timerRef?.getValue();

    setTimeout(() => {
      const {
        onEnd = () => {}
      } = this.props;

      const result : GameResult = {
        result : status == 'win' ? 'win' : 'lose',
        time : time
      };

      onEnd(result);

      this.stop();
    }, 2000);
  }

  renderInner = () => {
    const {
      flight = true,
      another = 0,
      ended = false
    } = this.state;
    const {
      width,
      elementsTotal,
      timeComplete
    } = this.props;

    const height = width * (isWeb() ? 1 : 1.2);
    const items = [];
    const anotherItems = [];

    for(let i = 0;i<elementsTotal;i++) {
      items.push(<Item
        key={`light-${i}`}
        height={height}
        flight={flight}
        onPress={this.onPressResult('win', i)}
        type='win'
        ended={ended}
        {...this.props}
      />);
    }

    for(let i = 0;i<another;i++) {
      anotherItems.push(<Item
        key={`light-another-${i}`}
        height={height}
        flight={flight}
        onPress={this.onPressResult('lose', -1)}
        type='lose'
        ended={ended}
        {...this.props}
      />);
    }

    return <View>
      {another > 0 && <TimerRevert
        time={timeComplete}
        onEnd={this.endFlight}
        renderTime={(t : any) => null}
      />}
      <View style={styles.wrapTop}>
        {flight && <Text style={styles.title}>{another == 0 ? 'Запоминай' : 'Следи'}</Text>}
        {!flight && <Text style={styles.title}>Найди</Text>}
      </View>
      <View
        style={{
          ...styles.inner,
          height : height
        }}
      >
        <Image
          source={imageBackground}
          style={styles.background}
        />
        {items}
        {anotherItems}
      </View>
      <View style={styles.wrapBottom}>
        {!flight && <Timer
          ref={ref => this.timerRef = ref}
          renderTime={(time : any) => <Text style={styles.timer}>{time} сек</Text>}
        />}
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
    // flex : 1,
  },
  background : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    resizeMode : 'cover'
  },
  wrapTop : {
    flex : 1,
    marginBottom : 8
  },
  timer : {
    textAlign : 'center',
    marginTop : 4,
    fontSize : 14,
    lineHeight : 20,
  },
  wrapBottom : {
    minHeight : 24
  },
  title : {
    textAlign : 'center',
    color : '#2e8dfd',
    fontSize : 14,
    fontWeight : 'bold'
  }
});
