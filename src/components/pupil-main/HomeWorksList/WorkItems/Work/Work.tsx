import { ScheduleHomeWorksType } from 'app/stores/groupStore';
import { WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import style from 'components/pupil-main/HomeWorksList/HomeWorksList.module.scss';
import { GamePresetData } from 'components/pupil-main/HomeWorksList/WorkItems/GamePresetData/GamePresetData';
import { FC } from 'react';

type Props = {
  work: WorkWithIdFromLoadme | undefined;
  homeWorkTime: ScheduleHomeWorksType | undefined;
};

export const Work: FC<Props> = ({ work, homeWorkTime }) => {
  const start = new Date(homeWorkTime?.start || '').toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Moscow',
  });

  const end = new Date(homeWorkTime?.end || '').toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Moscow',
  });
  if (work) {
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
          <div>Время на выполнение:</div>
          <div>{start}</div>
          <div>{end}</div>
        </div>
      </div>
    );
  }
  return <h2>Нет домашних работ</h2>;
};
