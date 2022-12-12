import { FranchiseWTF, ScheduleForUI, TeacherIdWTF } from 'app/types/GroupTypes';
import { ScheduleObjectType } from 'app/types/ScheduleT';

export const scheduleMapper = (
  schedule: ScheduleObjectType,
  groupName: string,
  groupId: string,
  teacherId: TeacherIdWTF,
  franchise: FranchiseWTF,
): ScheduleForUI[] =>
  schedule.classworks.length
    ? schedule.classworks.map((el, idx) => {
        const dateAr: number[] = el.date.split('.').map(elem => Number(elem));
        const timeStartAr: number[] = el.from.split(':').map(elem => Number(elem));
        const timeEndAr: number[] = el.to.split(':').map(elem => Number(elem));
        const year = dateAr[2] < 1000 ? 2000 + dateAr[2] : dateAr[2];
        const start = new Date(year, dateAr[1] - 1, dateAr[0], timeStartAr[0], timeStartAr[1]);
        const end = new Date(year, dateAr[1] - 1, dateAr[0], timeEndAr[0], timeEndAr[1]);
        return {
          id: idx,
          groupName,
          teacherId: teacherId.id,
          groupId,
          lesson: el.name,
          start,
          end,
          franchise: franchise.id,
        };
      })
    : [];
