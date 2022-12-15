import { NewWorkType } from 'app/types/NewWorkType';
import { Nullable } from 'app/types/Nullable';
import { ScheduleObjectType } from 'app/types/ScheduleT';

export const AddScheduleToOlympiad = (
  dateSince: Date,
  dateStart: Nullable<Date>,
  works: NewWorkType[],
) => {
  const schedule: ScheduleObjectType = { homeworks: [], classworks: [] };
  const newDataSince = new Date(dateSince.getDate());
  const dataStart = dateSince.setDate(newDataSince.getDate() + 7);

  works?.map((_, index) => {
    const start = new Date(dateStart || dataStart);
    const end = new Date(dateStart || dataStart);

    start.setDate(start.getDate() + index);
    end.setDate(end.getDate() + index + 1);
    start.setSeconds(0);
    end.setSeconds(0);

    return schedule.homeworks?.push({
      index,
      start,
      end,
    });
  });

  return schedule;
};
