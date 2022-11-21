import { DialogContent } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import { EditOrCreatePresetParamsT } from 'app/types/GameTypes';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ArgusFormSettings,
  BattlerColorsFormSettings,
  BullsAndCowsSettings,
  FirefliesFormSettings,
  FrazesFormSettings,
  Game2048FormSettings,
  GameDifferenceFormSettings,
  GamesFormSettingsType,
  MemoryRhythmFormSettings,
  ShiftVerticalFormSettings,
  ShulteFormSettings,
  SilhouettesFormSettings,
  SteamEngineFormSettings,
} from 'components/game-page/GameCommon/game-form-settings/';
import { FormSettingsType } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import { Dialog } from 'components/rate/ui/Dialog';
import { GameIdentifiers } from 'games';
import { observer } from 'mobx-react-lite';
import React, { FC, FunctionComponent } from 'react';

const GAMES_MODAL_SETTINGS: { [key: string]: FunctionComponent<FormSettingsType> } = {
  [GameIdentifiers.shulte]: ShulteFormSettings,
  [GameIdentifiers.game2048]: Game2048FormSettings,
  [GameIdentifiers.shiftVertical]: ShiftVerticalFormSettings,
  [GameIdentifiers.battleColors]: BattlerColorsFormSettings,
  [GameIdentifiers.steamEngine]: SteamEngineFormSettings,
  [GameIdentifiers.silhouettes]: SilhouettesFormSettings,
  [GameIdentifiers.memoryRhythm]: MemoryRhythmFormSettings,
  [GameIdentifiers.fireflies]: FirefliesFormSettings,
  [GameIdentifiers.argus]: ArgusFormSettings,
  [GameIdentifiers.difference]: GameDifferenceFormSettings,
  [GameIdentifiers.frazes]: FrazesFormSettings,
  [GameIdentifiers.bullsAndCows]: BullsAndCowsSettings,
};

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
  deletePreset: (id: string) => void;
};

export const NewGameModal: FC<PropsT> = observer(props => {
  const { open, onClose, deletePreset } = props;
  const { createPresets, gamePreset, editPreset, game } = gamesStore;

  const closeModal = () => {
    onClose(false);
  };

  const onSubmit = async (value: GamesFormSettingsType) => {
    const { name, level: valueLevel, status: valueStatus, ...resValue } = value;
    const params = {
      gameCode: game.code,
      name: value.name,
      level: value.level,
      status: value.status,
      settings: [{ ...resValue }],
    } as EditOrCreatePresetParamsT;

    gamePreset?.gamePreset?.id ? await editPreset(params) : await createPresets(params);

    // await gamesStore.getPresets();
    if (gamesStore.gamePreset.gamePreset.name) {
      await gamesStore.getPreset(gamesStore.gamePreset.gamePreset.name);
    }
    closeModal();
  };

  const deletedPreset = () => {
    if (gamePreset.gamePreset.id) {
      deletePreset(gamePreset.gamePreset.id);
      closeModal();
    }
  };

  const GameComponent = GAMES_MODAL_SETTINGS[game.code];

  return (
    <Dialog maxWidth="xl" fullWidth onClose={closeModal} open={open}>
      <DialogTitle onClose={closeModal}>Настройка параметров</DialogTitle>
      <DialogContent dividers>
        <GameComponent
          gamePreset={gamePreset.gamePreset}
          deletedPreset={deletedPreset}
          usedInWorks={gamePreset.usedInWorks}
          onFormSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
});
