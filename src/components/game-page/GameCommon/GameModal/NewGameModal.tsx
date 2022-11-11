import { DialogContent } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import { EditOrCreatePresetParamsT } from 'app/types/GameTypes';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ArgusFormSettings,
  BattlerColorsFormSettings,
  FirefliesFormSettings,
  Game2048FormSettings,
  GamesFormSettingsType,
  MemoryRhythmFormSettings,
  ShiftVerticalFormSettings,
  ShulteFormSettings,
  SilhouettesFormSettings,
  SteamEngineFormSettings,
} from 'components/game-page/GameCommon/game-form-settings/';
import { FormSettingsType } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import { Dialog } from 'components/rate/ui/Dialog';
import { observer } from 'mobx-react-lite';
import React, { FC, FunctionComponent } from 'react';

const GAMES_MODAL_SETTINGS: { [key: string]: FunctionComponent<FormSettingsType> } = {
  shulte: ShulteFormSettings,
  game2048: Game2048FormSettings,
  shiftVertical: ShiftVerticalFormSettings,
  battleColors: BattlerColorsFormSettings,
  steamEngine: SteamEngineFormSettings,
  silhouettes: SilhouettesFormSettings,
  memoryRhythm: MemoryRhythmFormSettings,
  fireflies: FirefliesFormSettings,
  argus: ArgusFormSettings,
};

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
  deletePreset: (id: string) => void;
};

export const NewGameModal: FC<PropsT> = observer(props => {
  const { open, onClose, deletePreset } = props;
  const { createPresets, gamePreset, editPreset, game, getPreset } = gamesStore;
  const { gamePreset: presents, usedInWorks } = gamePreset;

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

    presents.id ? await editPreset(params) : await createPresets(params);

    if (presents.name) {
      await getPreset(presents.name);
    }
    closeModal();
  };

  const deletedPreset = () => {
    if (presents.id) {
      deletePreset(presents.id);
      closeModal();
    }
  };

  const GameComponent = GAMES_MODAL_SETTINGS[game.code];

  return (
    <Dialog maxWidth="xl" fullWidth onClose={closeModal} open={open}>
      <DialogTitle onClose={closeModal}>Настройка параметров</DialogTitle>
      <DialogContent dividers>
        <GameComponent
          gamePreset={presents}
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          onFormSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
});
