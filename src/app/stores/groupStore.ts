import { DateTime } from 'app/enums/DateTime';
import { Roles } from 'app/enums/Roles';
import { StatusTypes } from 'app/enums/StatusTypes';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import groupsService from 'app/services/groupsService';
import appStore from 'app/stores/appStore';
import { AddUserGroupPayloadType } from 'app/types/addUserGroupPayloadType';
import { ShortCourseType } from 'app/types/CourseTypes';
import { EditUserGroupPayloadType } from 'app/types/EditUserGroupPayloadType';
import { FranchiseT } from 'app/types/FranchiseTypes';
import {
  CreateGroupFroUI,
  GroupParamsForServer,
  GroupParamsForUI,
  GroupT,
  LessonT,
  LevelGroupT,
  ResponseGroups,
  ResponseOneGroup,
  Schedule,
} from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { OlympiadFormType } from 'app/types/OlympiadPayloadType';
import { ScheduleHomeWorksType } from 'app/types/scheduleHomeWorksType';
import { ResponseUserT } from 'app/types/UserTypes';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { findElement } from 'utils/findIndexElement';
import { getIsBetweenDate } from 'utils/getIsBetweenDate';
import { getLocalDateEuropeRegion } from 'utils/getLocalDateEuropeRegion';
import { getNextMonth } from 'utils/getNextMonth';
import { oldScheduleToNewScheduleType } from 'utils/oldScheduleToNewScheduleType';
import { convertFormToCreateOlympiad } from 'utils/olympiadUtils/convertFormToCreateOlympiad';
import { removeEmptyFields } from 'utils/removeEmptyFields';
import {
  scheduleItemToServerMapper,
  scheduleItemToUIMapper,
} from 'utils/scheduleItemToServerMapper';
import { GroupStatusValue } from '../enums/GroupStatus';
import { GroupStatusTypes } from '../types/GroupStatusTypes';

class GroupStore {
  groups: ResponseGroups[] = [];

  groupsForSelect: ResponseGroups[] = [];

  page = 0;

  perPage = 1;

  total = 1;

  selectedGroup = new ResponseOneGroup();

  private defaultValues: Omit<CreateGroupFroUI, 'status'> & { status: GroupStatusTypes } = {
    name: '',
    franchiseId: '',
    dateSince: new Date(),
    dateUntil: getNextMonth(),
    type: 'class',
    teacherId: '',
    level: 'medium',
    courseId: '',
    status: 'active',
  };

  private queryDefaultValues: GroupParamsForUI = {
    perPage: 10,
    page: 0,
    name: '',
    forGroupId: '',
    franchiseId: '',
    teacherId: '',
    dateSince: '',
    dateUntil: '',
    type: 'class',
    level: '',
    status: '',
  };

  private queryDefaultValuesOlympiads: GroupParamsForUI = {
    perPage: 10,
    page: 0,
    name: '',
    forGroupId: '',
    franchiseId: '',
    teacherId: '',
    dateSince: '',
    dateUntil: '',
    type: 'olympiad',
    level: '',
  };

  modalFields = { ...this.defaultValues };

  queryFields = { ...this.queryDefaultValues };

  queryFieldsOlympiads = { ...this.queryDefaultValuesOlympiads };

  schedule: LessonT[] = [];

  scheduleHomeWorks = [new ScheduleHomeWorksType()];

  filteredHomeWork = [new ScheduleHomeWorksType()];

  franchise: FranchiseT[] = [new FranchiseT()];

  teachers: ResponseUserT[] = [];

  courses: ShortCourseType[] = [];

  isLoad = false;

  isModalOpen = false;

  defaultValuesOlympiad: Nullable<OlympiadFormType> = null;

  private newOlympiad: OlympiadFormType = {
    name: '',
    description: '',
    dateSince: null,
    courseId: '',
    type: 'olympiad',
    level: null,
    schedule: { homeworks: [] },
    dateStart: null,
    franchiseId: null,
    status: StatusTypes.active,
  };

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

  loadCurrentGroups = (selectedRole: Roles | undefined, paramsData?: GroupParamsForServer) => {
    // todo зачем здесь нужна роль ?
    this.execute(async () => {
      await this.getGroups({ ...paramsData });
    });
  };

  loadInitialModal = () => {
    this.execute(async () => {
      const resFranchise =
        appStore.role === Roles.Admin ? await franchiseService.getAll() : Promise.resolve();
      const res1 = await coursesService.getAllCourses({
        per_page: 10000,
        type: this.modalFields.type,
        status: 'active',
      });
      runInAction(() => {
        // @ts-ignore
        appStore.role === Roles.Admin && (this.franchise = resFranchise);
        this.courses = res1.items;
      });
    });
  };

  getOlympiadGroups = async (paramsData?: GroupParamsForServer) => {
    const dateSince = this.queryFieldsOlympiads.dateSince
      ? moment(this.queryFieldsOlympiads.dateSince).format(DateTime.DdMmYyyy)
      : '';
    const dateUntil = this.queryFieldsOlympiads.dateUntil
      ? moment(this.queryFieldsOlympiads.dateUntil).format(DateTime.DdMmYyyy)
      : '';
    await this.execute(async () => {
      const res = await groupsService.getGroups(
        paramsData || {
          ...this.queryFieldsOlympiads,
          dateSince,
          dateUntil,
        },
      );

      if (res.items.length && this.selectedGroup?.id) {
        await this.getOneGroup(this.selectedGroup.id);
      }
      runInAction(() => {
        this.groups = oldScheduleToNewScheduleType(res.items);
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    });
  };

  getGroups = async (paramsData?: GroupParamsForServer) => {
    const dateSince = this.queryFields.dateSince
      ? moment(this.queryFields.dateSince).format(DateTime.DdMmYyyy)
      : '';
    const dateUntil = this.queryFields.dateUntil
      ? moment(this.queryFields.dateUntil).format(DateTime.DdMmYyyy)
      : '';
    await this.execute(async () => {
      const res = await groupsService.getGroups(
        paramsData || {
          ...this.queryFields,
          dateSince,
          dateUntil,
        },
      );
      if (res.items.length && this.selectedGroup?.id) {
        await this.getOneGroup(this.selectedGroup.id);
      }
      runInAction(() => {
        this.groups = oldScheduleToNewScheduleType(res.items);
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    });
  };

  setEmptyScheduleItems = (count: number) =>
    count === 0
      ? []
      : Array(count)
          .fill(1)
          .map((el, index) => new LessonT(index));

  setEmptyScheduleHomeWorksItems = (count: number) =>
    count === 0
      ? []
      : Array(count)
          .fill(new ScheduleHomeWorksType())
          .map((el, index) => ({ ...el, index }));

  getOneGroup = async (id: string) =>
    this.execute(async () => {
      const response = await groupsService.getOneGroup(id);
      runInAction(() => {
        this.selectedGroup = response;
        if (response.schedule.classworks && response.schedule.homeworks) {
          this.schedule = response.schedule.classworks.map(el => scheduleItemToUIMapper(el));
          this.scheduleHomeWorks = response.schedule.homeworks;
          this.filteredHomeWork = response.schedule.homeworks;
        } else {
          // @ts-ignore
          this.schedule = this.setEmptyScheduleItems(response.course.worksCount);
        }
      });
      return response;
    });

  addGroup = async (franchiseId?: string) => {
    const schedule: Schedule[] = !this.schedule.length
      ? []
      : this.schedule.map(elem => scheduleItemToServerMapper(elem));

    const params = removeEmptyFields(this.modalFields);

    await groupsService.addGroup({
      ...params,
      franchiseId: franchiseId || this.modalFields.franchiseId,
      dateSince: moment(this.modalFields.dateSince).format(DateTime.DdMmYyyy),
      dateUntil: moment(this.modalFields.dateUntil).format(DateTime.DdMmYyyy),
      schedule: { classworks: schedule, homeworks: this.scheduleHomeWorks },
    });
    this.cleanModalValues();
    this.closeModal();
    await this.getGroups();
  };

  editGroup = async () => {
    await this.execute(async () => {
      if (this.selectedGroup) {
        const schedule: Schedule[] = !this.schedule.length
          ? []
          : this.schedule.map(elem => scheduleItemToServerMapper(elem));
        await groupsService.editGroup(
          {
            ...this.modalFields,
            dateSince: moment(this.modalFields.dateSince).format(DateTime.DdMmYyyy),
            dateUntil: moment(this.modalFields.dateUntil).format(DateTime.DdMmYyyy),
            schedule: { classworks: schedule, homeworks: this.scheduleHomeWorks },
          },
          this.selectedGroup.id,
        );
        await this.getGroups();
      }
      this.cleanModalValues();
      this.closeModal();
    });
  };

  deleteGroup = async (groupId: string) => {
    await this.execute(async () => {
      await groupsService.editGroup({ status: GroupStatusValue.archive }, groupId);
      await this.getGroups();
    });
  };

  addUserGroup = async (addGroupData: AddUserGroupPayloadType) => {
    await this.execute(() => groupsService.addUserGroup(addGroupData));
  };

  editUserGroup = async (editGroupData: EditUserGroupPayloadType, userGroupId: string) => {
    await this.execute(() => groupsService.editUserGroupStatus(editGroupData, userGroupId));
  };

  getCurrentGroupFromLocalStorage = (groupId: string) => findElement(this.groups, groupId);

  nullableSelectedGroup = () => {
    this.selectedGroup = new ResponseOneGroup();
  };

  cleanModalValues = () => {
    this.modalFields = { ...this.defaultValues };
  };

  setQueryFields = (params: Partial<GroupParamsForUI>) => {
    this.queryFields = { ...this.queryFields, ...params };
  };

  clearQueryFields = () => {
    this.queryFields = { ...this.queryDefaultValues };
    this.getGroups();
  };

  clearOlympiadQueryFields = () => {
    this.cleanOlympiadQueryFieldsWithoutRequest();
    this.getOlympiadGroups();
  };

  cleanOlympiadQueryFieldsWithoutRequest = () => {
    this.queryFieldsOlympiads = { ...this.queryDefaultValuesOlympiads };
  };

  changeLesson = (id: string, fieldName: string, value: Date | string) => {
    this.schedule = this.schedule.map(el =>
      el.id === id
        ? {
            ...el,
            [fieldName]: value,
          }
        : el,
    );
  };

  openModal = async (id?: string) => {
    if (id) {
      // const r = this.groups.filter(el => el.id === id)[0];
      const response = await this.getOneGroup(id);
      if (typeof response === 'object') {
        this.modalFields = {
          level: (response.level as LevelGroupT) || '',
          franchiseId: response.franchise.id || '',
          type: (response.type as GroupT) || '',
          courseId: response.course.id || '',
          teacherId: response.teacherId.id,
          name: response.name,
          dateSince: new Date(response.startedAt.date),
          dateUntil: new Date(response.endedAt.date),
          status: (response.status as GroupStatusTypes) || '',
        };
      }
    }
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.schedule = [];
    this.selectedGroup = new ResponseOneGroup();
    this.isModalOpen = false;
    this.scheduleHomeWorks = [];
  };

  changeScheduleHomeWork = (newHomeWorkData: Partial<ScheduleHomeWorksType>) => {
    this.scheduleHomeWorks = this.scheduleHomeWorks.map(homeWork =>
      homeWork.index === newHomeWorkData.index ? { ...homeWork, ...newHomeWorkData } : homeWork,
    );
  };

  setFilteredWHomeByDates = (start: string, end: string) => {
    this.filteredHomeWork = this.selectedGroup.schedule.homeworks.filter(el => {
      const convertDate = getLocalDateEuropeRegion(el.start).split('.').reverse().join('-');
      return getIsBetweenDate(convertDate, start, end);
    });
  };

  resetFilteredHomeWorkByDates = () => {
    this.filteredHomeWork = this.scheduleHomeWorks;
  };

  setDefaultValuesOlympiad = (defaultValues: Nullable<OlympiadFormType> = this.newOlympiad) => {
    this.defaultValuesOlympiad = defaultValues;
  };

  setCurrentOlympiad = async (groupId: string) => {
    const {
      course,
      onlyGroup,
      startedAt,
      status,
      level,
      name,
      franchise,
      description,
      schedule,
      id,
    } = await groupsService.getOneGroup(groupId);

    // если старый тип расписания
    if (Array.isArray(schedule)) {
      schedule.homeworks = schedule;
    }

    const form: OlympiadFormType = {
      id,
      name,
      level,
      status: status!,
      dateSince: new Date(startedAt.date),
      dateStart: schedule.homeworks[0] ? new Date(schedule.homeworks[0].start) : null,
      forGroupId: onlyGroup?.id,
      franchiseId: franchise?.id,
      description,
      courseId: course.id,
      schedule,
    };

    this.setDefaultValuesOlympiad(form);
  };

  addOlympiadGroup = async (values: OlympiadFormType) => {
    await this.execute(async () => {
      const { course } = await coursesService.getCurrentCourse(values.courseId);
      await groupsService.addGroup(convertFormToCreateOlympiad(values, course.works!));

      await this.getOlympiadGroups();
    });
  };

  editOlympiadGroup = async (values: OlympiadFormType, id: string) => {
    await this.execute(async () => {
      const { course } = await coursesService.getCurrentCourse(values.courseId);

      await groupsService.editGroup(convertFormToCreateOlympiad(values, course.works!), id);

      await this.getOlympiadGroups();
    });
  };

  getGroupsForSelect = async (paramsData?: GroupParamsForServer) => {
    await this.execute(async () => {
      const { items } = await groupsService.getGroups({ ...paramsData, perPage: 1000 });

      runInAction(() => {
        this.groupsForSelect = items;
      });
    });
  };

  get filteredCourses() {
    return this.courses && this.courses.length
      ? this.courses.filter(el => el.level.includes(this.modalFields.level))
      : [];
  }

  get isDisableEditForm() {
    return !!this.selectedGroup.id && this.modalFields.status !== 'active';
  }
}

export default new GroupStore();
