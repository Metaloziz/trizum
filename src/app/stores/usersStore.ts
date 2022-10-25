import authService from 'app/services/authService';
import usersService from 'app/services/usersService';
import { RequestRegister } from 'app/types/AuthTypes';
import { SearchUserType } from 'app/types/SearchUserType';
import { UpdateParentingPayloadType } from 'app/types/updateParentingPayloadType';
import { UpdateUserPayloadT } from 'app/types/UpdateUserPayloadT';
import {
  RequestParenting,
  RequestUsersForFilter,
  ResponseOneUser,
  ResponseUserT,
} from 'app/types/UserTypes';
import { makeAutoObservable, runInAction } from 'mobx';
import { checkErrorMessage, ErrorMessageType } from 'utils/checkErrorMessage';
import { dateNow } from '../../utils/dateNow';
import { getNearestLessonObject } from '../../utils/getNearestLessonObject/getNearestLessonObject';
import groupsService from '../services/groupsService';

class UsersStore {
  users: ResponseUserT[] = [];

  usersTotalCount = 1;

  page = 0;

  perPage = 5;

  currentUser?: ResponseOneUser;

  firstName?: SearchUserType;

  middleName: SearchUserType;

  lastName: SearchUserType;

  city: SearchUserType;

  birthdate: SearchUserType;

  // только для студента
  teacherName: string = '';

  theNextLessonDate: string = 'нету занятий';

  private searchDefaultUsersParams: RequestUsersForFilter = {
    perPage: 10,
    page: 0,
    city: '',
    franchiseId: '',
    lastName: '',
    middleName: '',
    firstName: '',
    is_payed: undefined,
    role: '',
    birthdate_since: '',
    birthdate_until: '',
    phone: null,
    email: '',
    tariff_id: '',
    active: true,
  };

  searchUsersParams: RequestUsersForFilter = { ...this.searchDefaultUsersParams };

  constructor() {
    makeAutoObservable(this);
  }

  resetUsersFilter = () => {
    this.searchUsersParams = { ...this.searchDefaultUsersParams };
  };

  getUsers = async (params?: RequestUsersForFilter) => {
    const res = await usersService.getAllUsers(params);
    runInAction(() => {
      this.users = res.items;
      this.usersTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
    });
  };

  getFilteredUsers = async () => {
    const res = await usersService.getUsersForFilters(this.searchUsersParams);
    runInAction(() => {
      this.users = res.items;
      this.usersTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
    });
  };

  createUser = async (
    data: RequestRegister,
  ): Promise<ResponseUserT | undefined | ErrorMessageType> => {
    try {
      const res = await authService.register(data);
      const isError = checkErrorMessage(res);
      if (isError) {
        return isError;
      }
      await this.getUsers();
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  updateUser = async (
    data: UpdateUserPayloadT,
    userId: string,
  ): Promise<ResponseUserT | undefined | ErrorMessageType> => {
    try {
      const res = await usersService.updateUser(data, userId);
      const isError = checkErrorMessage(res);
      if (isError) {
        return isError;
      }
      await this.getUsers();
      await this.getOneUser(userId);
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  createParenting = async (data: RequestParenting) => {
    try {
      return await usersService.createParenting(data);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  };

  getOneUser = async (id: string) => {
    try {
      const res = await usersService.getOneUser(id);
      runInAction(() => {
        this.currentUser = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  setSearchUsersParams = (params: RequestUsersForFilter) => {
    this.searchUsersParams = { ...this.searchUsersParams, ...params };
  };

  cleanSearchUsersParams = () => {
    this.searchUsersParams = this.searchDefaultUsersParams;
    this.getFilteredUsers();
  };

  updateParenting = async (payload: UpdateParentingPayloadType) => {
    const res = await usersService.updateParenting(payload);
  };

  deleteParenting = async (parentingId: string) => {
    const res = await usersService.deleteParenting(parentingId);
  };

  resetCurrentUser = () => {
    runInAction(() => {
      // простите меня грешника
      this.currentUser = undefined;
      this.teacherName = '';
      this.theNextLessonDate = 'нету занятий';
    });
  };

  getStudentGroup = async () => {
    const groupId = this.currentUser?.groups[0].groupId;

    if (groupId) {
      return groupsService.getOneGroup(groupId);
    }
    return null;
  };

  getAllDataForHomeWorkStudentPage = async (studentId: string) => {
    await this.getOneUser(studentId);
    const currentGroup = await this.getStudentGroup();
    if (currentGroup) {
      const { lastName, middleName, firstName } = currentGroup.teacherId;
      const { schedule } = currentGroup;

      this.teacherName = `${lastName} ${firstName} ${middleName}`;

      const lesson = getNearestLessonObject(schedule, dateNow());

      if (lesson) {
        this.theNextLessonDate = `${lesson.date} в ${lesson.from}. ${lesson.name}`;
      }
    }
  };

  get getFullUserName() {
    const result = ``;

    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return `${this.currentUser?.middleName} ${this.currentUser?.firstName} ${this.currentUser?.lastName}`;
    }
    return result;
  }
}

export default new UsersStore();
