import { FormControl, Grid, InputLabel, Select } from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import { GamePresetT } from 'app/types/GameTypes';
import Button from 'components/button/Button';
import { Dialog } from 'components/franchising-page/ui/Dialog';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styles from './setGameHomework.module.scss';
import { getOptionMui } from 'utils/getOption';

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'verticalShift',
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
    name: '2048',
  },
];

type SetGameHomeworkPropsT = {
  open: boolean;
  onClose: () => void;
  getPresetGame: (gamePreset: GamePresetT) => void;
};
export const SetGameHomework: FC<SetGameHomeworkPropsT> = observer(props => {
  const { open, onClose, getPresetGame } = props;
  const { games, actualPresets, getGame, getPreset, gamePreset } = gamesStore;
  const gamesOptions = Games.map(game => getOptionMui(game.name, game.title));
  const presetOptions = actualPresets.map(pr => getOptionMui(pr.name, pr.name));
  console.log(gamePreset);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <div className={styles.gameSetWrapper}>
        <h3>Выбор игры</h3>
        <Grid item xs={12} sm={6} marginBottom="20px">
          <FormControl fullWidth size="small">
            <InputLabel>Игра</InputLabel>
            <Select
              label="Игра"
              value={Games[0].title}
              onChange={({ target: { value } }) => getGame(value)}
              // error={
              //   !store.validateSchema.fields.status.isValidSync(store.editingEntity.status)
              // }
            >
              {gamesOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} marginBottom="20px">
          <FormControl fullWidth size="small">
            <InputLabel>Настройка</InputLabel>
            <Select
              value={actualPresets[0]?.name}
              label="Настройка"
              onChange={({ target: { value } }) => getPreset(value)}
              // error={
              //   !store.validateSchema.fields.status.isValidSync(store.editingEntity.status)
              // }
            >
              {presetOptions}
            </Select>
          </FormControl>
        </Grid>

        <Button onClick={() => getPresetGame(gamePreset.gamePreset)} className={styles.btn}>
          Сохранить
        </Button>
      </div>
    </Dialog>
  );
});
