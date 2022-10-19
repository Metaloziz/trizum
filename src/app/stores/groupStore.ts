import { DateTime } from 'app/enums/DateTime';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import groupsService from 'app/services/groupsService';
import appStore, { Roles } from 'app/stores/appStore';
import { ShortCourseType } from 'app/types/CourseTypes';
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
  CreateGroup,
} from 'app/types/GroupTypes';
import { ResponseUserT } from 'app/types/UserTypes';
import { GroupsViewModel } from 'app/viewModels/GroupsViewModel';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { findElement } from 'utils/findIndexElement';
import {
  scheduleItemToServerMapper,
  scheduleItemToUIMapper,
} from 'utils/scheduleItemToServerMapper';
import * as yup from 'yup';
import { getNextMonth } from '../../utils/getNextMonth';
import { StatusTypes } from '../enums/StatusTypes';

class GroupStore {
  groups: ResponseGroups[] = [];

  page = 0;

  perPage = 1;

  total = 1;

  selectedGroup = new ResponseOneGroup();

  private defaultValues: CreateGroupFroUI = {
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

  franchise: FranchiseT[] = [new FranchiseT()];

  teachers: ResponseUserT[] = [];

  courses: ShortCourseType[] = [];

  isLoad = false;

  isModalOpen = false;

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
        this.groups = res.items;
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
        this.groups = res.items;
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

  getOneGroup = async (id: string) =>
    this.execute(async () => {
      const r = await groupsService.getOneGroup(id);
      runInAction(() => {
        this.selectedGroup = r;
        this.schedule =
          r.schedule && r.schedule.length
            ? r.schedule.map(el => scheduleItemToUIMapper(el))
            : this.setEmptyScheduleItems(r.course.worksCount);
      });
      return r;
    });

  addGroup = async (franchiseId?: string) => {
    const schedule: Schedule[] = !this.schedule.length
      ? []
      : this.schedule.map(elem => scheduleItemToServerMapper(elem));
    await groupsService.addGroup({
      ...this.modalFields,
      franchiseId: franchiseId || this.modalFields.franchiseId,
      dateSince: moment(this.modalFields.dateSince).format(DateTime.DdMmYyyy),
      dateUntil: moment(this.modalFields.dateUntil).format(DateTime.DdMmYyyy),
      schedule,
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
            schedule,
          },
          this.selectedGroup.id,
        );
        await this.getGroups();
      }
      this.cleanModalValues();
      this.closeModal();
    });
  };

  deleteGroup = async (status: StatusTypes, groupId: string) => {
    await this.execute(async () => {
      await groupsService.editGroup({ status }, groupId);
    });
  };

  getCurrentGroupFromLocalStorage = (groupId: string) => findElement(this.groups, groupId);

  nullableSelectedGroup = () => {
    this.selectedGroup = new ResponseOneGroup();
  };

  cleanModalValues = () => {
    this.modalFields = { ...this.defaultValues };
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
      const r = await this.getOneGroup(id);
      if (typeof r === 'object') {
        this.modalFields = {
          level: (r.level as LevelGroupT) || '',
          franchiseId: r.franchise.id || '',
          type: (r.type as GroupT) || '',
          courseId: r.course.id || '',
          teacherId: r.teacherId.id,
          name: r.name,
          dateSince: new Date(r.startedAt.date),
          dateUntil: new Date(r.endedAt.date),
          status: r.status || '',
        };
        // this.schedule = r.schedule
      }
    }
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.schedule = [];
    this.selectedGroup = new ResponseOneGroup();
    this.isModalOpen = false;
  };

  get filteredCourses() {
    return this.courses.length
      ? this.courses.filter(el => el.level.includes(this.modalFields.level))
      : [];
  }

  get validateSchema() {
    return yup.object<Record<keyof GroupsViewModel, any>>().shape({
      name: yup.string().required('*'),
      franchiseId: yup.string().required('*'),
      dateSince: yup.string().required('*'),
      dateUntil: yup.string().required('*'),
      type: yup.string().required('*'),
      teacherId: yup.string().required('*'),
      level: yup.string().required('*'),
      courseId: yup.string().required('*'),
    });
  }
}

export default new GroupStore();
