import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import { ScheduleHomeWorksType } from 'app/stores/groupStore';
import { WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import classNames from 'classnames';
import Panel from 'components/panel/Panel';
import { Switcher } from 'components/pupil-main/HomeWorksList/WorkItems/Switcher/Switcher';
import { Work } from 'components/pupil-main/HomeWorksList/WorkItems/Work/Work';
import { WorkItems } from 'components/pupil-main/HomeWorksList/WorkItems/WorkItems';
import { toJS } from 'mobx';
import { FC, useState, useEffect } from 'react';
import { getNewNearestHomeWork } from 'utils/getNewNearestHomeWork';
import { whoCanUseIt } from 'utils/whoCanUseIt';
import style from './HomeWorksList.module.scss';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleHomeWorksType[];
  setGameIdsWithCodes2: typeof appStore.setGameIdsWithCodesByHomeWorkIndex;
};

export const HomeWorksList: FC<Props> = ({ works, schedule, setGameIdsWithCodes2 }) => {
  const [isListView, setIsListView] = useState(false);
  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    const index = getNewNearestHomeWork(schedule);
    setLessonIndex(index);
    setGameIdsWithCodes2(index);
  }, [schedule]);

  console.log('schedule', toJS(schedule));

  return (
    <div className={classNames(style.container)}>
      {!!works.length ? (
        <>
          <Panel className={style.panel}>Домашнее задание</Panel>
          {whoCanUseIt([Roles.TeacherEducation]) && (
            <Panel className={style.panel}>Наименование олимпиады</Panel>
          )}
          {whoCanUseIt([Roles.Tutor]) && (
            <Panel className={style.panel}>Наименование олимпиады</Panel>
          )}
          <Switcher setIsListView={() => setIsListView(!isListView)} />
          {isListView ? (
            <WorkItems works={works} schedule={schedule} />
          ) : (
            <Work work={works[lessonIndex]} homeWorkTime={schedule[lessonIndex]} />
          )}
        </>
      ) : (
        <h2>На сегодня нет домашних работ</h2>
      )}
    </div>
  );
};
