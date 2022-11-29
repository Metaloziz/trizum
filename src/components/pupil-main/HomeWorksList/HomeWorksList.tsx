import { Roles } from 'app/enums/Roles';
import { ScheduleHomeWorksType } from 'app/stores/groupStore';
import { WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import classNames from 'classnames';
import Panel from 'components/panel/Panel';
import { getLessonIndex } from 'components/pupil-main/helper/getLessonIndex';
import { Switcher } from 'components/pupil-main/HomeWorksList/WorkItems/Switcher/Switcher';
import { Work } from 'components/pupil-main/HomeWorksList/WorkItems/Work/Work';
import { WorkItems } from 'components/pupil-main/HomeWorksList/WorkItems/WorkItems';
import { ONE_DIFFERENCE_INDEX } from 'constants/constants';
import { toJS } from 'mobx';
import { FC, useState, useEffect } from 'react';
import { whoCanUseIt } from 'utils/whoCanUseIt';
import style from './HomeWorksList.module.scss';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleHomeWorksType[];
};

export const HomeWorksList: FC<Props> = ({ works, schedule }) => {
  const [isListView, setIsListView] = useState(false);
  // const [lessonIndex, setLessonIndex] = useState(0);

  // useEffect(() => {
  //   const index = getLessonIndex(schedule);
  //   setLessonIndex(index);
  // }, [schedule]);

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
            <div />
            // <Work work={works[lessonIndex]} lesson={schedule[lessonIndex]} />
          )}
        </>
      ) : (
        <h2>На сегодня нет домашних работ</h2>
      )}
    </div>
  );
};
