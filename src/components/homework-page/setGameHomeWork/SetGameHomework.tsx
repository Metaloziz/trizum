import { FormControl, Grid, InputLabel, Select } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import { Dialog } from 'components/franchising-page/ui/Dialog';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { getOptionMui } from 'utils/getOption';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import styles from './setGameHomework.module.scss';

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'shiftVertical',
  },
  {
    title: 'Ментальный счет',
    name: 'mental',
  },
  {
    title: 'Таблица Шульте',
    name: 'shulte',
  },
  {
    title: '2048',
    name: 'game2048',
  },
];

type SetGameHomeworkPropsT = {
  open: boolean;
  onClose: () => void;
  getPresetGame: (gamePresetId: string) => void;
};

export const SetGameHomework: FC<SetGameHomeworkPropsT> = observer(
  ({ open, onClose, getPresetGame }) => {
    const { actualPresets, getGame, getPreset, gamePreset } = gamesStore;

    const [gameName, setGameName] = useState('');
    const [presetName, setPresetName] = useState('');

    const gamesOptions = Games.map(game => getOptionMui(game.name, game.title));
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

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
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
              >
                {presetOptions}
              </Select>
            </FormControl>
            <ErrorMessage gamePreset={gamePreset} />
          </Grid>

          <Button onClick={() => getPresetGame(gamePreset.gamePreset.id)} className={styles.btn}>
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  },
);
