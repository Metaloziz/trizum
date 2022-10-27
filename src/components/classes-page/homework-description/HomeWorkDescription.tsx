import { ResponseOneGroup } from 'app/types/GroupTypes';
import { NewCourseType } from 'app/types/NewCourseType';
import cardsGame from 'assets/svgs/cards.svg';
import fossilGame from 'assets/svgs/fossil.svg';
import starGame from 'assets/svgs/star.svg';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';
import { toJS } from 'mobx';
import React, { FC } from 'react';

import style from './HomeWorkDescription.module.scss';

type Props = {
  selectedGroup: ResponseOneGroup;
  currentCourse: NewCourseType;
};

export const HomeWorkDescription: FC<Props> = ({ selectedGroup, currentCourse }) => {
  const works = selectedGroup?.course.works;

  console.log('selectedGroup', toJS(selectedGroup));
  console.log('currentCourse', toJS(currentCourse));

  let result: string;

  const setImg = (id: number) => {
    if (id === 0 || id > 2) {
      result = fossilGame;
    } else if (id === 1) {
      result = starGame;
    } else if (id === 2) {
      result = cardsGame;
    }
    return result;
  };

  return (
    <div className={style.blockGames}>
      <div className={style.componentPanelWrapper}>
        <Panel>Домашнее задание на 7 октября 2021</Panel>
      </div>
      <div className={style.games}>
        {works?.map((item: any, id: any) => (
          <ul key={item.id}>
            <li>
              <Image src={setImg(id)} width="32" height="32" alt="fossil" />
            </li>
            <li>{item.work.title}</li>
          </ul>
        ))}
      </div>
      {/* <Button onClick={() => openModal(selectedGroup?.id)}>Edit group</Button> */}
      <p className={style.content}>
        Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
        простого факта: реализация намеченных плановых заданий создаёт необходимость включения в
        производственный план целого ряда внеочередных мероприятий с учётом комплекса
        глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке,
        превозмогая сложившуюся непростую экономическую ситуацию, своевременно верифицированы.
      </p>
    </div>
  );
};
