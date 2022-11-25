import { Roles } from 'app/enums/Roles';
import authService from 'app/services/authService';
import tokenService from 'app/services/tokenService';
import { EmptyUser } from 'app/stores/emptyUser';
import usersStore from 'app/stores/usersStore';
import { GameIdWithCode } from 'app/types/GameTypes';
import { WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import { ONE_DIFFERENCE_INDEX } from 'constants/constants';
import { makeAutoObservable, runInAction } from 'mobx';
import { LoginInfo } from 'pages/login/Login';
import { dateNow } from 'utils/dateNow';
import { execute } from 'utils/execute';
import { getActiveClassGroup } from 'utils/getActiveClassGroup';
import { getGameForStudent } from 'utils/getGameForStudent';
import { getNearestLessonObject } from 'utils/getNearestLessonObject/getNearestLessonObject';
import { throwErrorMessage } from 'utils/throwErrorMessage';

import { RequestLogin, RequestSwitchUser } from '../types/AuthTypes';

class AppStore {
  role: Roles = Roles.Unauthorized;

  user = new EmptyUser();

  isInitialized = false;

  isLoggedIn = false;

  error = '';

  loginError = '';

  /* fields student only */
  allGameIdsWithCodes: GameIdWithCode[][] = [];

  currentGameIds: GameIdWithCode[] = [];

  currentWork?: WorkWithIdFromLoadme;

  currentWorkArr?: WorkWithIdFromLoadme[];

  hwDate?: string;
  /* fields student only */

  constructor() {
    makeAutoObservable(this);
  }

  loginWithSMS = async (data: RequestLogin) => {
    await execute(async () => {
      await authService.loginWithSMS(data);
    });
  };

  loginWithPassword = async (data: LoginInfo) => {
    await execute(async () => {
      const res = await authService.loginWithPassword(data);
      await tokenService.setUser(res.data.token);
      await this.loadme();
    });
  };

  loadme = async () => {
    await execute(async () => {
      const res = await authService.loadme();
      if (res.status >= 400 || res.data === undefined) {
        runInAction(() => {
          this.isLoggedIn = false;
          this.isInitialized = true;
        });
      }
      if (res.status === 200) {
        runInAction(() => {
          this.isLoggedIn = true;
          this.role = res.data.role as Roles;
          this.user = res.data;
          if (res.data.role === Roles.Student && !!res.data.groups && res.data.groups.length) {
            this.setGameIdsWithCodes(res.data);
          }
          this.isInitialized = true;
          this.loginError = '';
        });
      }
    });
  };

  logout = () => usersStore.resetUsersFilter();

  logoutWithToken = async () => {
    await execute(async () => {
      await authService.logout();
      await tokenService.removeUser();
      this.reset();
    });
  };

  setRole = (role: Roles): void => {
    this.role = role;
    if (role === Roles.Unauthorized) {
      this.user = new EmptyUser();
    }
  };

  setUser = async () => {
    try {
      const res = await authService.loadme();
      runInAction(() => {
        this.role = res.data.role as Roles;
        this.user = res.data;

        if (res.data.role === Roles.Student && !!res.data.groups && res.data.groups.length) {
          const { teacherId } = res.data.groups[0].group;
          usersStore.getOneUser(teacherId);
        }
      });
    } catch (e) {
      throwErrorMessage(e);
    }
  };

  switchUser = async (params: RequestSwitchUser) => {
    try {
      await execute(async () => {
        await authService.switchUser(params);
        await this.loadme();
      });
    } catch (e) {
      throwErrorMessage(e);
    }
  };

  setError = (error: string) => {
    this.error = error;
    setTimeout(() => {
      this.error = '';
    }, 5000);
  };

  setLoginError = (error: string) => {
    this.loginError = error;
  };

  /* actions student only */
  setGameIdsWithCodes = (user: EmptyUser) => {
    this.allGameIdsWithCodes = getGameForStudent(user.groups);

    const classTypeObject = user.groups.find(
      el => el.group.type === 'class' && el.status === 'active',
    );

    this.currentWorkArr = classTypeObject?.group.course.works;

    const schedule = this.getSchedule;

    if (classTypeObject && schedule && schedule.length) {
      // TODO: добавить нахождение нужного урока по дате

      [this.currentGameIds] = this.allGameIdsWithCodes;

      const lesson = getNearestLessonObject(schedule, dateNow());

      if (lesson) {
        this.hwDate = lesson.date;
        const index = schedule.findIndex(el => el.date === lesson.date && lesson.from === el.from);

        if (index !== -1) {
          const currentWork = classTypeObject.group.course.works.find(
            el => el.index === index - ONE_DIFFERENCE_INDEX,
          );

          if (currentWork) {
            this.currentWork = currentWork;
          }
        }
      }
    }
  };

  /* actions student only */
  reset = () => {
    this.role = Roles.Unauthorized;
    this.user = new EmptyUser();
    this.isLoggedIn = false;
    this.error = '';
    this.loginError = '';
  };

  get teacherName() {
    const group = getActiveClassGroup(this.user);

    if (!group) return '';

    const {
      firstName: teacherFirstName,
      middleName: teacherMiddleName,
      lastName: teacherLastName,
    } = group.group.teacher;

    return `${teacherLastName} ${teacherFirstName} ${teacherMiddleName}`;
  }

  get fullUserName() {
    const { firstName, middleName, lastName } = this.user;

    return `${lastName} ${firstName} ${middleName}`;
  }

  get getSchedule() {
    const result = getActiveClassGroup(this.user);

    if (!result) return [];

    return result.group.schedule;
  }
}

export default new AppStore();
