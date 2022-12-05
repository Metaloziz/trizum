import { WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import { ScheduleHomeWorksType } from 'app/types/scheduleHomeWorksType';
import { Work } from 'components/pupil-main/HomeWorksList/WorkItems/Work/Work';
import { FC } from 'react';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleHomeWorksType[];
};

export const WorkItems: FC<Props> = ({ works, schedule }) => (
  <div>
    {works.map((work, index) => {
      const homeWorkTime = schedule[index];
      return <Work key={work.id} work={work} homeWorkTime={homeWorkTime} />;
    })}
  </div>
);
