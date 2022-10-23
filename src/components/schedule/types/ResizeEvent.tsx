import { stringOrDate } from 'react-big-calendar';

export type ResizeEvent = {
  event: {
    id?: number;
  };
  start: stringOrDate;
  end: stringOrDate;
  isAllDay: boolean;
};
