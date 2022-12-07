import { NewWorkType } from 'app/types/NewWorkType';
import { ScheduleHomeWorksType } from 'app/types/scheduleHomeWorksType';
import starGame from 'assets/svgs/star.svg';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';
import { toJS } from 'mobx';
import React, { FC } from 'react';
import { getLocalDateEuropeRegion } from 'utils/getLocalDateEuropeRegion';

import style from './HomeWorkDescription.module.scss';

type Props = {
  homeWorkDate?: ScheduleHomeWorksType;
  currentHomework?: NewWorkType;
};

export const HomeWorkDescription: FC<Props> = ({ currentHomework, homeWorkDate }) => {
  const games = currentHomework?.work?.gamePresets;

  console.log('homeWorkDate', toJS(homeWorkDate));

  if (homeWorkDate === undefined) {
    return (
      <div className={style.blockGames}>
        <Panel>
          <p>Выберите группу</p>
        </Panel>
      </div>
    );
  }

  return (
    <div className={style.blockGames}>
      <div className={style.componentPanelWrapper}>
        <Panel>
          <p>Название: {currentHomework?.work?.title}</p>
        </Panel>

        <div>Дата начала: {getLocalDateEuropeRegion(homeWorkDate?.start)} </div>
        <div>Дата окончания: {getLocalDateEuropeRegion(homeWorkDate?.end)} </div>
      </div>
      <div className={style.games}>
        {games &&
          games.map(game => (
            <ul key={game?.gamePreset?.id}>
              <li>
                <Image src={starGame} width="32" height="32" alt="fossil" />
              </li>
              <li>{game?.gamePreset?.game?.name}</li>
            </ul>
          ))}
      </div>

      <div className={style.content}>
        <p>Описание:</p>
        <p>{currentHomework?.work?.text}</p>
      </div>
    </div>
  );
};
