import { GameTypeTitle } from 'app/enums/gameTypeTitle';
import { Roles } from 'app/enums/Roles';
import { WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import classNames from 'classnames';
import Panel from 'components/panel/Panel';
import { FC } from 'react';
import { whoCanUseIt } from 'utils/whoCanUseIt';
import style from './HomeWorksList.module.scss';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleFromLoadme[];
};

export const HomeWorksList: FC<Props> = ({ works, schedule }) => (
  <div className={classNames(style.container)}>
    {works ? (
      <>
        <Panel className={style.panel}>Домашнее задание</Panel>
        {whoCanUseIt([Roles.TeacherEducation]) && (
          <Panel className={style.panel}>Наименование олимпиады</Panel>
        )}
        {whoCanUseIt([Roles.Tutor]) && (
          <Panel className={style.panel}>Наименование олимпиады</Panel>
        )}
        {works.map((work, index) => {
          const lesson = schedule[index];

          return (
            <div key={work.id} className={style.item}>
              <div>
                <h2>
                  {
                    GameTypeTitle[
                      work.work.gamePresets[0].gamePreset.game.type as keyof typeof GameTypeTitle
                    ]
                  }
                </h2>

                <div className={style.workTitle}>
                  Заголовок работы: <p>{work.work.title}</p>
                </div>
                <div className={style.text}>
                  <p>Описание: {work.work.text}</p>
                </div>
              </div>
              <div className={style.lesson}>
                <div>
                  Урок: <p>{lesson.name}</p>
                </div>
                <div>
                  <div>Дата:</div>
                  <div>
                    {lesson.date} в {lesson.from}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    ) : (
      <h2>Нет домашних работ</h2>
    )}
  </div>
);
