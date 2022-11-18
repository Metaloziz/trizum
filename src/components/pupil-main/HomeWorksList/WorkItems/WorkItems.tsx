import { WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import { Work } from 'components/pupil-main/HomeWorksList/WorkItems/Work/Work';
import { ONE_DIFFERENCE_INDEX } from 'constants/constants';
import { FC } from 'react';

type Props = {
  works: WorkWithIdFromLoadme[];
  schedule: ScheduleFromLoadme[];
};

export const WorkItems: FC<Props> = ({ works, schedule }) => (
  <div>
    {works.map((work, index) => {
      const lesson = schedule[index + ONE_DIFFERENCE_INDEX];
      return <Work key={work.id} work={work} lesson={lesson} />;
    })}
  </div>
);
