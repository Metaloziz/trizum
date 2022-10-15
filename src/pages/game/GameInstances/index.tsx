import { Roles } from 'app/stores/appStore';
import { GamePresetT, GameT, PresetsGameSettings, ResultsT } from 'app/types/GameTypes';
import { OptionT } from 'app/types/OptionT';
import Button from 'components/button/Button';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { SelectBlock } from 'components/game-page/GameCommon/SelectBlock';
import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';
import { NavigateFunction } from 'react-router-dom';

type GameReturnPropsT = {
  role: Roles;
  isModalOpen: boolean;
  toggleModal: (value: boolean) => void;
  deletePreset: (id: string) => void;
  resultModal: boolean;
  gameResult: ResultsT;
  gameTitle: string;
  gameViewSize: number;
  presetArrs: OptionT[];
  gamePreset: GamePresetT;
  setPreset: (data: OptionT) => void;
  groupOptions: OptionT[];
  started: boolean;
  startGame: () => void;
  settings?: PresetsGameSettings;
  closeResultModal: () => void;
  onRepeat: () => void;
  navigate: NavigateFunction;
  children: React.ReactNode;
  game?: GameT;
};

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
    presetArrs,
    gamePreset,
    setPreset,
    groupOptions,
    started,
    startGame,
    settings,
    closeResultModal,
    onRepeat,
    navigate,
    children,
    game,
  } = props;
  return (
    <>
      {(role === Roles.Methodist || role === Roles.Admin) && (
        <GameModal open={isModalOpen} onClose={toggleModal} deletePreset={deletePreset} />
      )}
      <GameResultModal
        gameResult={gameResult}
        game={game}
        open={resultModal}
        onClose={closeResultModal}
        onStart={onRepeat}
      />
      <div className={styles.wrapGameBlock} key={gameTitle}>
        <Button className={styles.goBack} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <section>
          <div style={{ minWidth: `${gameViewSize + 100}px` }}>
            {(role === Roles.Methodist || role === Roles.Admin) && (
              <SelectBlock
                width={gameViewSize + 100}
                openModal={() => toggleModal(true)}
                presetArrs={presetArrs}
                presetId={gamePreset.id}
                setPreset={setPreset}
                groupOptions={groupOptions}
              />
            )}
          </div>
          <div className={`${styles.wrap} ${role === Roles.Student && styles.isStudent}`}>
            <div className={styles.wrapInner}>
              <div className={styles.wrapGame}>
                <div className={styles.wrapGame_overlay}>
                  {children}
                  {!started && <PlayButton onStart={startGame} />}
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
