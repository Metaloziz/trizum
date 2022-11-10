import { WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import { Work } from 'components/pupil-main/HomeWorksList/WorkItems/Work/Work';
import { FC } from 'react';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleFromLoadme[];
};

export const WorkItems: FC<Props> = ({ works, schedule }) => (
  <div>
    {works.map((work, index) => {
      const lesson = schedule[index];

      return <Work key={work.id} work={work} lesson={lesson} />;
    })}
  </div>
);
