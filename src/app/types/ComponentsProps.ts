// Containers

import { WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import { ReactNode } from 'react';
import { PersonalRecordsArrT } from 'utils/personalRecordsArr';

export interface WeeklyGrowthProps {
  className?: string;
  // weeklyGrowth: SkillGrowProps[];
  records?: PersonalRecordsArrT[];
}

export interface HomeworksProps {
  className?: string;
  homeworks: HomeworkProps[];
  works?: WorkWithIdFromLoadme[];
}

export interface KeepPlayingProps {
  className?: string;
  // games: KeepPlayingItemProps[];
  // works?: WorkWithIdFromLoadme[];
  // actualGames?: GameIdWithCode[];
  userGroupId: string;
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
  children?: ReactNode;
  className?: string;
}
