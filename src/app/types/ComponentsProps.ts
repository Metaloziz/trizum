// Containers

import { WorksT } from 'app/types/GroupTypes';
import { Group, WorkFromLoadme } from 'app/types/LoadMeTypes';
import { PersonalRecordT } from 'app/types/ResponseLoadMeBaseT';
import { PersonalRecordsArrT } from 'utils/personalRecordsArr';
import { GameIdWithCode } from 'app/types/GameTypes';

export interface WeeklyGrowthProps {
  className?: string;
  // weeklyGrowth: SkillGrowProps[];
  records?: PersonalRecordsArrT[];
}

export interface HomeworksProps {
  className?: string;
  homeworks: HomeworkProps[];
}

export interface KeepPlayingProps {
  className?: string;
  games: KeepPlayingItemProps[];
  works?: WorkFromLoadme[];
  actualGames?: GameIdWithCode[];
}

// Components

export interface KeepPlayingItemProps {
  title: string;
  minutesLeft: number;
  colorTheme: string;
  id: string;
  onClick?: () => void;
  code?: string | undefined;
}

export interface HomeworkProps {
  className?: string;
  gameTitle: string;
  description: {
    minutesLeft: number;
    needToDo: string;
    tips: {
      text: string;
      id: number;
    }[];
  };
  id: number;
}

export interface SkillGrowProps {
  skillTitle: string;
  code?: string;
  color: string;
  percents: number;
  id: number;
}

export interface PanelProps {
  children: string;
  className?: string;
}
