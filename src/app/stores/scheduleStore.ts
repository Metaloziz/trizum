import { Roles } from 'app/enums/Roles';
import franchiseService from 'app/services/franchiseService';
import groupsService from 'app/services/groupsService';
import usersService from 'app/services/usersService';
import { ScheduleForUI } from 'app/types/GroupTypes';
import { scheduleMapper } from 'app/types/mappers/ScheduleMapper';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { EditLessonPayload } from '../types/EditLessonPayload';

class GroupStore {
  defaultFilters = {
    groupId: '',
    teacherId: '',
    franchise: '',
  };

  schedule: ScheduleForUI[] = [];

  groups: { groupName: string; groupId: string }[] = [];

  filters = { ...this.defaultFilters };

  teachers: { teacherId: string; teacherName: string }[] = [];

  franchisees: { franchise: string; franchiseName: string }[] = [];

  isLoad = false;

  constructor() {
    makeAutoObservable(this);
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoad = true;
      return await action();
    } catch (e) {
      // TODO: handle error
      return (e as AxiosError).message;
    } finally {
      this.isLoad = false;
    }
  };

  getGroups = async () => {
    const res = await groupsService.getGroups({ perPage: 1000, type: 'class' });
    runInAction(() => {
      if (!!res.items.length) {
        this.groups = res.items.map(el => ({ groupName: el.name, groupId: el.id }));
        this.schedule = res.items
          .map(group =>
            scheduleMapper(group.schedule, group.name, group.id, group.teacherId, group.franchise),
          )
          .reduce((acc, elem) => [...acc, ...elem], [] as ScheduleForUI[]);
      }
    });
  };

  getTeachers = async () => {
    const res = await usersService.getAllUsers({ role: Roles.Teacher, perPage: 1000 });
    runInAction(() => {
      this.teachers = res.items.map(el => ({
        teacherId: el.id,
        teacherName: `${el.lastName} ${el.firstName} ${el.middleName}`,
      }));
    });
  };

  getFranchise = async () => {
    const res = await franchiseService.getAll();
    runInAction(() => {
      // @ts-ignore
      this.franchisees = res.map(el => ({
        franchise: el.id,
        franchiseName: el.shortName,
      }));
    });
  };

  setFilters = (filterValue: string, newValue: string) => {
    this.filters = { ...this.filters, [filterValue]: newValue === '*' ? '' : newValue };
  };

  editLesson = ({ lessonIndex, groupId, schedule }: EditLessonPayload) => {
    // if (currentGroup) {
    //   console.log('currentGroup', currentGroup);
    //
    //   currentGroup.schedule[lessonIndex] = schedule;

    this.execute(async () => {
      const currentGroup = await groupsService.getOneGroup(groupId);

      currentGroup.schedule.classworks[lessonIndex] = schedule;

      await groupsService.editGroup(
        { schedule: [...currentGroup.schedule.classworks] },
        currentGroup.id,
      );
      await this.getGroups();
    });
    // }
  };

  get actualSchedule() {
    const withFilter = this.schedule.filter(
      el =>
        el.teacherId.includes(this.filters.teacherId) &&
        el.franchise.includes(this.filters.franchise),
    );
    return withFilter.filter(el => el.groupId.includes(this.filters.groupId));
  }
}
export default new GroupStore();
