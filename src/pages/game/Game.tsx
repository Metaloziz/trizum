import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { OptionT } from 'app/types/OptionT';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { Option } from 'components/select-mui/CustomSelect';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';

import Two048 from '../../assets/images/game/2048.png';
import BattleColors from '../../assets/images/game/battle-colors.png';
import Schulte from '../../assets/images/game/shulte.png';
import VerticalShift from '../../assets/images/game/vertical-shift.jpg';

import { Factory } from '../../games';
import { CurrentGame } from './CurrentGame/CurrentGame';

import styles from './Game.module.scss';
import { GamePreview } from './GamePreview/GamePreview';

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'shiftVertical',
    prevImg: VerticalShift,
  },
  {
    title: 'Ментальный счет',
    name: 'mental',
    prevImg: Schulte,
  },
  {
    title: 'Таблица Шульте',
    name: 'shulte',
    prevImg: Schulte,
  },
  {
    title: '2048',
    name: 'game2048',
    prevImg: Two048,
  },
  {
    title: 'Битва полушарий',
    name: 'battleColors',
    prevImg: BattleColors,
  },
];

class Game extends Component<any, any> {
  gameComponent: any;

  game: any;

  constructor(props: any) {
    super(props);

    const game = [Games[0].name];
    this.gameComponent = Factory(game);

    this.state = {
      started: false,
      isOpenModal: false,
      resultModal: false,
      gameResult: [],
    };
  }

  componentDidMount() {
    gamesStore.getPresets();
    gamesStore.getGames();
    gamesStore.setIsCurrentGameView(false);
  }

  componentWillUnmount() {
    gamesStore.getPreset('');
  }

  toggleModal = (value: boolean) => {
    this.setState({
      isOpenModal: value,
    });
  };

  closeResultModal = () => {
    this.setState({
      resultModal: false,
      gameResult: [],
    });
  };

  onEnd = (result: any) => {
    this.setState(
      {
        started: false,
        resultModal: true,
        gameResult: result,
      },
      async () => {
        await gamesStore.sendResults({
          userGroupId: '1ed25e67-b3ef-6bc2-9492-95bc14986080',
          courseWorkId: '1ed25e4d-c767-6336-80f6-5d295491aaa1',
          workGamePresetId: '1ed25e48-cd5b-67ec-8c22-390a41dd25b3',
          finished: true,
          workCompleted: false,
          courseCompleted: false,
          timeMax: 2,
          ...result,
        });
        const message = [`Ваше время: ${result.time} секунд`];

        if (result?.timeDiff) {
          message.push(`Среднее время: ${result.timeDiff} секунд`);
        }

        if (result?.score) {
          message.push(`Ваш результат: ${result.score}`);
        }

        if (result?.success) {
          message.push(`Правильных ответов: ${result.success}`);
        }

        if (result?.failed) {
          message.push(`Допущено ошибок: ${result.failed}`);
        }
        console.log(message.join('\n'));
      },
    );
  };

  onStart = () => {
    this.setState(
      {
        started: true,
      },
      () => {
        this.game?.start();
      },
    );
  };

  onRepeat = () => {
    this.setState({
      resultModal: false,
    });
    this.onStart();
  };

  onRefGame = (ref: any) => {
    this.game = ref;
  };

  setGame = (game: string) => () => {
    this.gameComponent = Factory(game);
    this.setState({
      started: false,
    });
    gamesStore.getGame(game);
  };

  setPreset = (data: OptionT) => {
    gamesStore.getPreset(data.value);
  };

  render() {
    const { started = false, isOpenModal, resultModal, gameResult } = this.state;
    const GameComponent = this.gameComponent;
    const { actualPresets, gamePreset, deletePreset, isCurrentGameView, setIsCurrentGameView } =
      gamesStore;
    const { role } = appStore;
    const widthScreen = window.innerWidth;
    const settings = gamePreset.gamePreset.settings[0];

    console.log('isCurrentGameView', [isCurrentGameView]);

    const gameViewSize = changedViewScreen(widthScreen, 700);

    const presetArr: Option[] = [
      {
        value: 'Создать шаблон',
        label: 'Создать шаблон',
      },
    ];

    actualPresets?.map(el =>
      presetArr.push({
        value: el.name,
        label: el.name,
      }),
    );

    // const presetArr = presetOptions(actualPresets);

    return (
      <div className={styles.innerContent}>
        {(role === Roles.Methodist || role === Roles.Admin) && (
          <GameModal open={isOpenModal} onClose={this.toggleModal} deletePreset={deletePreset} />
        )}
        <GameResultModal
          open={resultModal}
          time={gameResult.time}
          error={gameResult.failed}
          success={gameResult.success}
          onClose={this.closeResultModal}
          onStart={this.onRepeat}
        />

        {/* отображается список игр */}
        {!isCurrentGameView && (
          <div className={styles.gameList}>
            {Games.map(gam => (
              <GamePreview
                key={`game-${gam.name}`}
                onClick={() => setIsCurrentGameView(true)}
                gam={gam}
                onClick1={() => this.toggleModal(true)}
                game={this.setGame(gam.name)}
              />
            ))}
          </div>
        )}
        {/* отображается конкретная игра */}
        {isCurrentGameView && (
          <Routes>
            {Games.map(gam => (
              <Route
                key={gam.name}
                path={gam.name}
                element={
                  <CurrentGame
                    gameViewSize={gameViewSize}
                    role={role}
                    option={presetArr}
                    onChangeSelect={data => this.setPreset(data)}
                    onClick={() => this.toggleModal(true)}
                    gamePreset={gamePreset}
                    onRef={this.onRefGame}
                    onEnd={this.onEnd}
                    settings={settings}
                    started={started}
                    onStart={this.onStart}
                    gam={gam}
                    GameComponent={GameComponent}
                    setIsCurrentGameView={setIsCurrentGameView}
                  />
                }
              />
            ))}
          </Routes>
        )}
      </div>
    );
  }
}

export default observer(Game);

export const GameWrapper = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <Game />;
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Unauthorized:
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});
