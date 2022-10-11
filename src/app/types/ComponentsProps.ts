// Containers

import { WorksT } from 'app/types/GroupTypes';

export interface WeeklyGrowthProps {
  className?: string;
  weeklyGrowth: SkillGrowProps[];
}

export interface HomeworksProps {
  className?: string;
  homeworks: HomeworkProps[];
}

export interface KeepPlayingProps {
  className?: string;
  games: KeepPlayingItemProps[];
  works?: WorksT[];
}

// Components

export interface KeepPlayingItemProps {
  title: string;
  minutesLeft: number;
  colorTheme: string;
  id: number;
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
  color: string;
  percents: number;
  id: number;
}

export interface PanelProps {
  children: string;
  className?: string;
}
