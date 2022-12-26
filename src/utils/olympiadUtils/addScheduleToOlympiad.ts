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

    start.setUTCDate(start.getDate() + index);
    start.setUTCHours(0);
    end.setUTCDate(end.getDate() + index + 1);
    end.setUTCHours(0);

    end.setMinutes(end.getMinutes() - 1);

    return schedule.homeworks?.push({
      index,
      start,
      end,
    });
  });

  return schedule;
};
