import { FormControl, Grid, InputLabel, Select } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import { Dialog } from 'components/franchising-page/ui/Dialog';
import { GameList, GameIdentifiers } from 'games';
import { toJS } from 'mobx';
import React, { FC, useState } from 'react';
import { getOptionMui } from 'utils/getOption';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import styles from './setGameHomework.module.scss';

type SetGameHomeworkPropsT = {
  open: boolean;
  onClose: () => void;
  getPresetGame: (gamePresetId: string) => void;
  actualPresets: typeof gamesStore.actualPresets;
  getGame: typeof gamesStore.getGame;
  getPreset: typeof gamesStore.getPreset;
  gamePreset: typeof gamesStore.gamePreset;
};

export const SetGameHomework: FC<SetGameHomeworkPropsT> = ({
  open,
  onClose,
  getPresetGame,
  actualPresets,
  getGame,
  getPreset,
  gamePreset,
}) => {
  const [gameName, setGameName] = useState('');
  const [presetName, setPresetName] = useState('');

  const gamesOptions = Object.keys(GameIdentifiers).map(key =>
    getOptionMui(key, GameList[key].name),
  );

  console.log('actualPresets', toJS(actualPresets));

  const presetOptions = actualPresets.map(pr => getOptionMui(pr.name, pr.name));

  const setGame = (value: string) => {
    setGameName(value);
    getGame(value);
    getPreset('default');
  };

  const setPreset = (value: string) => {
    setPresetName(value);
    getPreset(value);
  };

  const closeDialog = () => {
    setGameName('');
    setPresetName('');
    onClose();
  };

  const saveGame = () => {
    getPresetGame(gamePreset.gamePreset.id);
    closeDialog();
  };

  const isDisableSave = !(!!gameName && !!presetName);

  const isDisableSettingSelect = gameName === '';

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <div className={styles.gameSetWrapper}>
        <h3>Выбор игры</h3>
        <Grid item xs={12} sm={6} marginBottom="20px">
          <FormControl fullWidth size="small">
            <InputLabel>Игра</InputLabel>
            <Select
              label="Игра"
              value={gameName}
              onChange={({ target: { value } }) => setGame(value)}
            >
              {gamesOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} marginBottom="20px">
          <FormControl fullWidth size="small">
            <InputLabel>Настройка</InputLabel>
            <Select
              value={presetName}
              label="Настройка"
              onChange={({ target: { value } }) => setPreset(value)}
              disabled={isDisableSettingSelect}
            >
              {presetOptions}
            </Select>
          </FormControl>
          <ErrorMessage gamePreset={gamePreset} />
        </Grid>

        <Button onClick={saveGame} className={styles.btn} disabled={isDisableSave}>
          Сохранить
        </Button>
      </div>
    </Dialog>
  );
};
