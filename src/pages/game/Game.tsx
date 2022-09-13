import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { OptionT } from 'app/types/OptionT';
import Button from 'components/button/Button';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';
import { Option } from 'components/select-mui/CustomSelect';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Two048 from '../../assets/images/game/2048.png';
import Play from '../../assets/images/game/play.svg';
import Schulte from '../../assets/images/game/shulte.png';
import VerticalShift from '../../assets/images/game/vertical-shift.jpg';

import { Factory } from '../../games';

import styles from './Game.module.scss';

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'verticalShift',
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
    name: '2048',
    prevImg: Two048,
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
      // game,
    };
  }

  componentDidMount() {
    gamesStore.getPresets();
    gamesStore.getGames();
  }

  toggleModal = (value: boolean) => {
    this.setState({
      isOpenModal: value,
    });
  };

  onEnd = (result: any) => {
    this.setState(
      {
        started: false,
      },
      () => {
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

        /* eslint-disable no-alert */
        alert(message.join('\n'));
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
    const { started = false, isOpenModal } = this.state;
    const GameComponent = this.gameComponent;
    const { actualPreset } = gamesStore;
    const { role } = appStore;
    const widthScreen = window.screen.width;
    let gameViewSize = 700;
    if (widthScreen <= 1000 && widthScreen > 760) {
      gameViewSize = widthScreen - 300;
    } else if (widthScreen < 760) {
      gameViewSize = widthScreen - 200;
    } else if (widthScreen < 420) {
      gameViewSize = 200;
    }
    const presetArr: Option[] = [
      {
        value: 'Создать шаблон',
        label: 'Создать шаблон',
      },
    ];
    actualPreset.map(el =>
      presetArr.push({
        value: el.name,
        label: el.name,
      }),
    );
    return (
      <div className={styles.innerContent}>
        {(role === Roles.Methodist || role === Roles.Admin) && (
          <GameModal open={isOpenModal} onClose={this.toggleModal} />
        )}
        <div className={styles.gameList}>
          {Games.map(gam => (
            <div key={`game-${gam.name}`} className={styles.gameItem}>
              <div className={styles.gameItem_header}>
                <span className={styles.gameItem_header_title}>{gam.title}</span>
              </div>
              <svg
                onClick={() => this.toggleModal(true)}
                className={styles.gameItem_settings}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.40466 1.05039C8.99186 -0.350129 7.00814 -0.350128 6.59534 1.05039L6.49523 1.39003C6.23147 2.2849 5.20935 2.70827 4.39008 2.26201L4.07913 2.09264C2.79692 1.39422 1.39422 2.79693 2.09264 4.07913L2.26201 4.39008C2.70827 5.20935 2.2849 6.23147 1.39003 6.49523L1.05039 6.59534C-0.350129 7.00814 -0.350128 8.99186 1.05039 9.40466L1.39003 9.50477C2.2849 9.76853 2.70827 10.7906 2.26201 11.6099L2.09264 11.9209C1.39422 13.2031 2.79692 14.6058 4.07913 13.9074L4.39008 13.738C5.20935 13.2917 6.23147 13.7151 6.49523 14.61L6.59534 14.9496C7.00814 16.3501 8.99186 16.3501 9.40466 14.9496L9.50477 14.61C9.76853 13.7151 10.7906 13.2917 11.6099 13.738L11.9209 13.9074C13.2031 14.6058 14.6058 13.2031 13.9074 11.9209L13.738 11.6099C13.2917 10.7906 13.7151 9.76853 14.61 9.50477L14.9496 9.40466C16.3501 8.99186 16.3501 7.00814 14.9496 6.59534L14.61 6.49523C13.7151 6.23147 13.2917 5.20935 13.738 4.39008L13.9074 4.07913C14.6058 2.79692 13.2031 1.39422 11.9209 2.09264L11.6099 2.26201C10.7906 2.70827 9.76853 2.2849 9.50477 1.39003L9.40466 1.05039ZM8 10.9288C6.38246 10.9288 5.07119 9.61754 5.07119 8C5.07119 6.38246 6.38246 5.07119 8 5.07119C9.61754 5.07119 10.9288 6.38246 10.9288 8C10.9288 9.61754 9.61754 10.9288 8 10.9288Z"
                  fill="#2E8DFD"
                />
              </svg>
              <NavLink onClick={this.setGame(gam.name)} to={gam.name}>
                <img className={styles.gameItem_play} src={Play} alt="" />
              </NavLink>
              {gam.prevImg && (
                <Image className={styles.gameItem_prevImg} src={gam.prevImg} alt="Previous Games" />
              )}
            </div>
          ))}
        </div>

        <Routes>
          {Games.map(gam => (
            <Route
              key={gam.name}
              path={gam.name}
              element={
                <div className={styles.wrapGameBlock}>
                  <section>
                    {(role === Roles.Methodist || role === Roles.Admin) && (
                      <div className={styles.wrapGameBlock_header}>
                        <div className={styles.wrapGameBlock_header_select}>
                          <InformationItem
                            variant="select"
                            size="normal"
                            placeholder="Шаблон"
                            option={presetArr}
                            onChangeSelect={data => this.setPreset(data)}
                          />
                        </div>
                        <div className={styles.wrapGameBlock_header_select}>
                          <InformationItem variant="select" size="normal" placeholder="Год" />
                        </div>
                        <div className={styles.wrapGameBlock_header_select}>
                          <InformationItem variant="select" size="normal" placeholder="Месяц" />
                        </div>
                        <div className={styles.wrapGameBlock_header_select}>
                          <InformationItem variant="select" size="normal" placeholder="Группа" />
                        </div>

                        <Button onClick={() => this.toggleModal(true)}>Выбрать настройки</Button>
                      </div>
                    )}
                    <div className={styles.wrapGame}>
                      <div className={styles.wrapGame_overlay}>
                        <GameComponent
                          onRef={this.onRefGame}
                          width={gameViewSize}
                          onEnd={this.onEnd}
                        />
                        {!started && <PlayButton onStart={this.onStart} />}
                      </div>
                    </div>
                  </section>
                  <GameDesc started={started} gameTitle={gam.title} />
                </div>
              }
            />
          ))}
        </Routes>
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
