import { ResponseOneGroup } from 'app/types/GroupTypes';
import { NewCourseType } from 'app/types/NewCourseType';
import { OneWorkResponseT } from 'app/types/WorkTypes';
import starGame from 'assets/svgs/star.svg';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';
import { toJS } from 'mobx';
import React, { FC } from 'react';

import style from './HomeWorkDescription.module.scss';

type Props = {
  selectedGroup: ResponseOneGroup;
  currentCourse: NewCourseType;
  currentHomework?: OneWorkResponseT;
};

export const HomeWorkDescription: FC<Props> = ({
  selectedGroup,
  currentCourse,
  currentHomework,
}) => {
  const games = currentHomework?.work?.gamePresets;

  console.log('selectedGroup', toJS(selectedGroup));
  console.log('currentCourse', toJS(currentCourse));
  console.log('currentHomework', toJS(currentHomework));

  return (
    <div className={style.blockGames}>
      <div className={style.componentPanelWrapper}>
        <Panel>
          <p>Название: {currentHomework?.work?.title}</p>
        </Panel>
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
