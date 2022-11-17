import { WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import style from 'components/pupil-main/HomeWorksList/HomeWorksList.module.scss';
import { GamePresetData } from 'components/pupil-main/HomeWorksList/WorkItems/GamePresetData/GamePresetData';
import { FC } from 'react';

type Props = {
  work: WorkWithIdFromLoadme | undefined;
  lesson: ScheduleFromLoadme | undefined;
};

export const Work: FC<Props> = ({ work, lesson }) => {
  if (work && lesson) {
    return (
      <div key={work.id} className={style.item}>
        <div className={style.body}>
          <div className={style.workTitle}>
            Заголовок работы: <p>{work.work.title}</p>
          </div>
          <p>Список игр:</p>
          {work.work.gamePresets.map(preset => (
            <GamePresetData key={preset.id} preset={preset} />
          ))}
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
  }
  return <h2>Нет домашних работ</h2>;
};
