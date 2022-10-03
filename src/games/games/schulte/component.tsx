import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Props } from './types';
import { generateLayout } from './utils/logic';

import { Game, GameResult } from '../../common/types';

import Timer from '../../components/timer';

import ErrorBlock from './components/errorBlock';

const SizesConfig = [
  {
    title : '3 на 3',
    value : 0,
    option : {
      elementsTotal: 3
    }
  },
  {
    title : '4 на 4',
    value : 1,
    option : {
      elementsTotal: 4
    }
  },
  {
    title : '6 на 6',
    value : 2,
    option : {
      elementsTotal: 6
    }
  },
];

export default class extends Component<any, any> implements Game {

  counterFailed : any;
  errorBlock : any;

  constructor(props : any) {
    super(props);

    this.counterFailed = 0;

    this.state = {
      started : false,
      need : {},
      list : [],
      layout : []
    };
  }

  componentDidMount() {
    const {
      onRef = () => {}
    } = this.props;

    onRef(this);

    this.reset(() => {});
  }

  public getConfig = () => {
    return [
      {
        name : 'size',
        type : 'select',
        title : 'Размер поля',
        option : SizesConfig,
        value : 0
      },
      {
        name : 'colors',
        type : 'select',
        title : 'Кол-во цветов',
        option : [
          {
            title : '1 цвет',
            value : 1
          },
          {
            title : '2 цвета',
            value : 2
          },
        ],
        value : 1
      },
    ];
  }

  public prepareConfig = (result : any) => {
    const size = SizesConfig[parseInt(result.size)] || SizesConfig[0];

    return {
      ...size.option,
      colors : result.colors
    };
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
      started : false
    });
  }

  private reset = (cb : any) => {
    const {
      list,
      layout
    } = generateLayout(this.props);

    this.counterFailed = 0;

    this.setState({
      started : false,
      list,
      layout
    }, cb);
  }

  private onSelect = (item : any, x : any, y : any) => () => {
    const {
      onFeedbackError = () => {},
      onFeedbackSuccess = () => {},
    } = this.props;

    const {
      need = {}
    } = this.state;

    if(
      need.text != item.text ||
      need.color != item.color
    ) {
      this.counterFailed++;
      onFeedbackError(item, x, y);
      this.errorBlock?.show(x, y);
      return;
    }

    onFeedbackSuccess(item, x, y);
    this.onNext();
  }

  private onNext = () => {
    const {
      list = []
    } = this.state;

    if(list.length == 0) {
      this.end();
      return;
    }

    const setList = list.slice(); // Delete link
    const need = setList.pop();

    this.setState({
      list : setList,
      need
    });
  }

  private end = () => {
    const timer : any = this.refs?.timer;
    const time = timer?.getValue();

    const {
      onEnd = () => {}
    } = this.props;

    const result : GameResult = {
      result : 'end',
      time : time,
      failed : this.counterFailed
    };

    onEnd(result);

    this.counterFailed = 0;

    this.stop();
  }

  render() {
    const {
      started = false,
      need,
      layout
    } = this.state;

    const {
      elementsTotal,
      width
    } = this.props;

    return <View style={styles.wrap}>
      {started && <Text style={styles.title}>Выберите: <Text style={{...styles.title, ...styles.titleActive, color : need?.color}}>{need?.text}</Text></Text>}
      <View
        style={{
          ...styles.game,
          width : width,
          height : (width / elementsTotal) * elementsTotal
        }}
      >
        <ErrorBlock
          onRef={(ref : any) => this.errorBlock = ref}
          size={width/elementsTotal}
        />
        {layout.map((row : any, ri : number) => <View
          key={`row-${ri}`}
          style={{
            ...styles.row,
            ...(layout.length - 1 == ri ? {
              borderBottomWidth : 0
            } : {})
          }}
        >
          {row.map((cell : any, ci : number) => <TouchableOpacity
            key={`cell-${ri}-${ci}`}
            style={{
              ...styles.cell,
              ...(row.length - 1 == ci ? {
                borderRightWidth : 0
              } : {})
            }}
            activeOpacity={0.8}
            onPress={this.onSelect(cell, ci, ri)}
          >
            <Text
              style={{
                ...styles.cellTitle,
                color : cell.color
              }}
            >{cell.text}</Text>
          </TouchableOpacity>)}
        </View>)}
      </View>
      {started && <Timer
        ref='timer'
        renderTime={(time : any) => <Text style={styles.timer}>{time} сек</Text>}
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
    backgroundColor : '#fff',
    borderWidth : 1,
    borderColor : '#cdcdcd'
  },
  row : {
    flex : 1,
    borderBottomWidth : 1,
    borderColor : '#cdcdcd',
    flexDirection : 'row'
  },
  cell : {
    flex : 1,
    borderRightWidth : 1,
    borderColor : '#cdcdcd',
    alignItems : 'center',
    justifyContent : 'center'
  },
  cellTitle : {
    fontSize : 18,
    fontWeight : 'bold'
  },
  titleActive : {
    fontWeight : 'bold'
  },
  title : {
    fontSize : 16,
    lineHeight : 20,
    textAlign : 'center',
    marginBottom : 26
  },
  timer : {
    textAlign : 'center',
    marginTop : 12,
    fontSize : 14,
    lineHeight : 20,
  }
});
