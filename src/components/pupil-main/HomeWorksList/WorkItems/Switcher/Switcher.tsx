import Typography from '@mui/material/Typography';
import { FC } from 'react';
import Switch from '@mui/material/Switch';
import style from './Switcher.module.scss';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type Props = {
  setIsListView: () => void;
};

export const Switcher: FC<Props> = ({ setIsListView }) => (
  <div className={style.container} onClick={setIsListView}>
    <Typography>Список</Typography>
    <Switch {...label} defaultChecked />
    <Typography>Ближайшее</Typography>
  </div>
);
