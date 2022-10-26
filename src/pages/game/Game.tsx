import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import Image from 'components/image/Image';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { Navigate, NavLink } from 'react-router-dom';
import Two048 from '../../assets/images/game/2048.png';
import Play from '../../assets/images/game/play.svg';
import Schulte from '../../assets/images/game/shulte.png';
import VerticalShift from '../../assets/images/game/vertical-shift.jpg';
import BattleColors from '../../assets/images/game/battle-colors.png';
import Paint from '../../assets/images/game/paint.png';
import Blink from '../../assets/images/game/blink.png';
import Steam from '../../assets/images/game/steam.png';
import Argus from '../../assets/images/game/argus.png';
import Fireflies from '../../assets/images/game/firelines.png';

import { Factory } from '../../games';

import styles from './Game.module.scss';

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'shiftVertical',
    prevImg: VerticalShift,
  },
  // {
  //   title: 'Ментальный счет',
  //   name: 'mental',
  //   // prevImg: Schulte,
  // },
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
  {
    title: 'Память и ритм',
    name: 'memoryRhythm',
    prevImg: Blink,
  },
  {
    title: 'Бирюльки',
    name: 'silhouettes',
    prevImg: Paint,
  },
  {
    title: 'Паро-вик',
    name: 'steamEngine',
    prevImg: Steam,
  },
  {
    title: 'Светлячки',
    name: 'fireflies',
    prevImg: Fireflies,
  },
  {
    title: 'Аргус',
    name: 'argus',
    prevImg: Argus,
  },
];

class Game extends Component<any, any> {
  gameComponent: any;

  // game: any;

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
  }

  componentWillUnmount() {
    gamesStore.getPreset('');
  }

  toggleModal = (value: boolean) => {
    this.setState({
      isOpenModal: value,
    });
  };

  // closeResultModal = () => {
  //   this.setState({
  //     resultModal: false,
  //     gameResult: [],
  //   });
  // };

  // eslint-disable-next-line react/no-unused-class-component-methods
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

  // onStart = () => {
  //   this.setState(
  //     {
  //       started: true,
  //     },
  //     () => {
  //       this.game?.start();
  //     },
  //   );
  // };

  // onRepeat = () => {
  //   this.setState({
  //     resultModal: false,
  //   });
  //   this.onStart();
  // };

  // eslint-disable-next-line react/no-unused-class-component-methods
  // onRefGame = (ref: any) => {
  //   this.game = ref;
  // };

  setGame = (game: string) => () => {
    this.gameComponent = Factory(game);
    this.setState({
      started: false,
    });
    gamesStore.getGame(game);
  };

  openModalSettings = (game: string) => () => {
    this.toggleModal(true);
    gamesStore.getGame(game);
  };

  render() {
    const { started = false, isOpenModal, resultModal, gameResult } = this.state;
    const GameComponent = this.gameComponent;
    const { actualPresets, gamePreset, deletePreset } = gamesStore;
    const { role } = appStore;

    return (
      <div className={styles.innerContent}>
        {/*     {(role === Roles.Methodist || role === Roles.Admin) && ( 
          <GameModal open={isOpenModal} onClose={this.toggleModal} deletePreset={deletePreset} /> 
         )} 
         <GameResultModal 
          open={resultModal} 
          time={gameResult.time} 
          error={gameResult.failed} 
          success={gameResult.success} 
          onClose={this.closeResultModal} 
          onStart={this.onRepeat} 
         /> */}
        <div className={styles.gameList}>
          {Games.map(gam => (
            <div key={`game-${gam.name}`} className={styles.gameItem}>
              <div className={styles.gameItem_header}>
                <span className={styles.gameItem_header_title}>{gam.title}</span>
              </div>
              <svg
                onClick={this.openModalSettings(gam.name)}
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
                <Image
                  className={styles.gameItem_prevImg}
                  src={gam?.prevImg}
                  alt="Previous Games"
                />
              )}
            </div>
          ))}
        </div>
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
