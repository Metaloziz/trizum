export type ScheduleEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  class: string;
  lesson: string;
  allDay?: boolean;
  groupId?: string;
};
