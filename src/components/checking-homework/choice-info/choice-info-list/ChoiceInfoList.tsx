import { FC } from 'react';

import cn from 'classnames';

import styles from './ChoiceInfoList.module.scss';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import ChoiceInfoItem from 'components/checking-homework/choice-info/choice-info-item/ChoiceInfoItem';

const ChoiceInfoList: FC<KeepPlayingProps> = ({ className }) => (
  <div className={cn(styles.containerChoice, className)}>
    {/* {games.map(game => ( */}
    {/*  <ChoiceInfoItem key={Math.random()} {...game} /> */}
    {/* ))} */}
  </div>
);

export default ChoiceInfoList;
