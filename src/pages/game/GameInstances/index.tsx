import { Roles } from 'app/enums/Roles';
import {
  GamePresetsResponseT,
  GamePresetT,
  GameT,
  PresetsGameSettings,
  ResultsNewT,
} from 'app/types/GameTypes';
import { OptionT } from 'app/types/OptionT';
import Button from 'components/button/Button';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { NewGameModal } from 'components/game-page/GameCommon/GameModal/NewGameModal';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { TableSettingsPreset } from 'components/game-page/GameCommon/TableSettingsPreset';
import styles from 'pages/game/Game.module.scss';
import React, { FC, KeyboardEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

type GameReturnPropsT = {
  role: Roles;
  isModalOpen: boolean;
  toggleModal: (value: boolean) => void;
  deletePreset: (id: string) => void;
  resultModal: boolean;
  gameResult: ResultsNewT;
  gameTitle: string;
  gameViewSize: number;
  presetArr: OptionT[];
  gamePreset: GamePresetT;
  setPreset: (data: string) => void;
  groupOptions: OptionT[];
  started: boolean;
  startGame: () => void;
  settings?: Partial<PresetsGameSettings>;
  closeResultModal: () => void;
  onRepeat: () => void;
  stopGame?: () => void;
  navigate: NavigateFunction;
  children: React.ReactNode;
  game?: GameT;
  isLoading: boolean;
  presets: GamePresetsResponseT;
  changePage: (page: number) => void;
};

const KEY_GAME = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

export const GameReturn: FC<GameReturnPropsT> = props => {
  const {
    role,
    gameResult,
    isModalOpen,
    toggleModal,
    deletePreset,
    resultModal,
    gameTitle,
    gameViewSize,
    setPreset,
    started,
    startGame,
    settings,
    closeResultModal,
    onRepeat,
    navigate,
    children,
    stopGame,
    game,
    isLoading,
    presets,
    changePage,
  } = props;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (KEY_GAME.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      {(role === Roles.Methodist || role === Roles.Admin) && isModalOpen && (
        <NewGameModal open={isModalOpen} onClose={toggleModal} deletePreset={deletePreset} />
      )}

      <GameResultModal
        gameResult={gameResult}
        game={game}
        open={resultModal}
        onClose={closeResultModal}
        onStart={onRepeat}
      />

      <div tabIndex={-1} onKeyDown={onKeyDown} className={styles.wrapGameBlock} key={gameTitle}>
        <Button className={styles.goBack} onClick={() => navigate(-1)}>
          Назад
        </Button>

        <section>
          <div style={{ maxWidth: `${gameViewSize + 200}px` }}>
            {(role === Roles.Methodist || role === Roles.Admin) && (
              <TableSettingsPreset
                gamePresets={presets.items}
                total={presets.total}
                page={presets.page}
                perPage={presets.perPage}
                setPreset={setPreset}
                stopGame={stopGame}
                changePage={changePage}
                openModal={() => toggleModal(true)}
              />
              // <SelectBlock
              //   stopGame={stopGame}
              //   width={gameViewSize + 100}
              //   openModal={() => toggleModal(true)}
              //   presetArrs={presetArr}
              //   presetId={gamePreset.id}
              //   setPreset={setPreset}
              //   groupOptions={groupOptions}
              //   isLoading={isLoading}
              // />
            )}
          </div>

          <div
            className={`${styles.wrap} ${
              !(role === Roles.Methodist || role === Roles.Admin) && styles.isStudent
            }`}
          >
            <div className={styles.wrapInner}>
              <div className={styles.wrapGame}>
                <div className={styles.wrapGame_overlay}>
                  {children}
                  {!started && <PlayButton isDisable={isLoading} onStart={startGame} />}
                </div>
              </div>
            </div>
          </div>
        </section>
        <GameDesc presetDesc={settings?.description} started={started} gameTitle={gameTitle} />
      </div>
    </>
  );
};
