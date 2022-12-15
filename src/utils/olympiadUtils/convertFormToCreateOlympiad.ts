import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { CreateGroupForServer } from 'app/types/GroupTypes';
import { NewWorkType } from 'app/types/NewWorkType';
import { OlympiadFormType } from 'app/types/OlympiadPayloadType';
import { AddScheduleToOlympiad } from 'utils/olympiadUtils/addScheduleToOlympiad';

export const convertFormToCreateOlympiad = (valuesForm: OlympiadFormType, works: NewWorkType[]) => {
  const {
    status,
    name,
    level,
    description,
    courseId,
    dateStart,
    franchiseId,
    forGroupId,
    dateSince,
  } = valuesForm;

  const newDataSince = dateSince ? new Date(dateSince) : new Date();
  const schedule = AddScheduleToOlympiad(dateSince!, dateStart || null, works || []);
  const newDataUntil =
    schedule.homeworks.length !== 0
      ? new Date(schedule.homeworks[schedule.homeworks.length - 1].end)
      : undefined;

  const newOlympiad: CreateGroupForServer = {
    name,
    dateSince: newDataSince,
    courseId,
    description,
    level: level || GroupsLevelsValue.easy,
    type: 'olympiad',
    franchiseId: franchiseId || undefined,
    forGroupId,
    schedule,
    status: status || StatusTypes.draft,
    dateUntil: newDataUntil,
  };

  return newOlympiad;
};
