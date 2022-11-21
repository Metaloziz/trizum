import { DialogContent } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import { EditOrCreatePresetParamsT } from 'app/types/GameTypes';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ArgusFormSettings,
  BattlerColorsFormSettings,
  Game2048FormSettings,
  MemoryRhythmFormSettings,
  ShiftVerticalFormSettings,
  ShulteFormSettings,
  SilhouettesFormSettings,
  SteamEngineFormSettings,
  FirefliesFormSettings,
  FrazesFormSettings,
  GamesFormSettingsType,
  GameDifferenceFormSettings,
  BullsAndCowsSettings,
} from 'components/game-page/GameCommon/game-form-settings/';

import {
  ColorObj,
  GameColorPicker,
} from 'components/game-page/GameCommon/GameModal/GameColorPicker';
import { Dialog } from 'components/rate/ui/Dialog';
import { GameIdentifiers } from 'games';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
  deletePreset: (id: string) => void;
};

const colorsObj = [
  { label: 'Зелёный', value: false, hex: '#076d4d', id: 0 },
  { label: 'Чёрный', value: false, hex: '#000000', id: 1 },
  { label: 'Красный', value: false, hex: '#e30d00', id: 2 },
  { label: 'Синий', value: false, hex: '#699deb', id: 3 },
  { label: 'Фиолетовый', value: false, hex: '#c3b8f9', id: 4 },
  { label: 'Оранжевый', value: false, hex: '#f88e36', id: 5 },
  { label: 'Розовый', value: false, hex: '#e99aff', id: 6 },
  { label: 'Коричневый', value: false, hex: '#441d00', id: 7 },
  { label: 'Жёлтый', value: false, hex: '#fff900', id: 8 },
  { label: 'Голубой', value: false, hex: '#00c1ee', id: 9 },
];

export const NewGameModal: FC<PropsT> = observer(props => {
  const { open, onClose, deletePreset } = props;
  const { createPresets, gamePreset, editPreset, game } = gamesStore;
  const { colorsMap } = gamePreset.gamePreset.settings[0];

  const defaultColorsMap: string[] = colorsMap && colorsMap.length !== 0 ? colorsMap : ['#000000'];

  const [colors, setColors] = useState<ColorObj[]>(colorsObj);
  const [colorsMapState, setColorsMap] = useState<string[]>(defaultColorsMap);
  const [colorModal, setColorModal] = useState<boolean>(false);

  const changeColor = (index: number) => {
    setColors(colors.map(el => (el.id === index ? { ...el, value: !el.value } : el)));
  };

  const setColor = useCallback((data: ColorObj[]) => {
    const colorArr = [''];
    data.filter(el => el.value && colorArr.push(el.hex));
    colorArr.shift();
    setColorsMap(colorArr);
  }, []);

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

  useEffect(() => {
    const newColors = colors.map(color => ({ ...color, value: false }));

    colorsMapState.map(item => {
      const indexColor = colorsObj.findIndex(({ hex }) => hex === item);

      if (indexColor !== -1) {
        newColors[indexColor].value = true;
      }
      return item;
    });
    setColors(newColors);
  }, [colorsMapState]);

  return (
    <Dialog maxWidth="xl" fullWidth onClose={closeModal} open={open}>
      {colorModal && (
        <GameColorPicker
          colors={colors}
          changeColor={changeColor}
          setColor={setColor}
          onClose={() => setColorModal(false)}
        />
      )}
      <DialogTitle onClose={closeModal}>Настройка параметров</DialogTitle>
      <DialogContent dividers>
        {game.code === GameIdentifiers.shiftVertical && (
          <ShiftVerticalFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.shulte && (
          <ShulteFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
            // colorsMapState={colorsMapState}
            // setColorModal={setColorModal}
          />
        )}

        {game.code === GameIdentifiers.game2048 && (
          <Game2048FormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.battleColors && (
          <BattlerColorsFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.steamEngine && (
          <SteamEngineFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.silhouettes && (
          <SilhouettesFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.memoryRhythm && (
          <MemoryRhythmFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.fireflies && (
          <FirefliesFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}

        {game.code === GameIdentifiers.argus && (
          <ArgusFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}
        {game.code === GameIdentifiers.difference && (
          <GameDifferenceFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}
        {game.code === GameIdentifiers.frazes && (
          <FrazesFormSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}
        {game.code === GameIdentifiers.bullsAndCows && (
          <BullsAndCowsSettings
            usedInWorks={gamePreset.usedInWorks}
            gamePreset={gamePreset.gamePreset}
            onFormSubmit={onSubmit}
            deletedPreset={deletedPreset}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});
