import { AppRoutes } from 'app/enums/AppRoutes';
import listGames from 'assets/svgs/list-games.svg';
import homeImage from 'assets/svgs/student-navigation-link-home.svg';
import admin from 'assets/svgs/student-navigation-sidebar/admin.svg';
import adminFranchise from 'assets/svgs/student-navigation-sidebar/admin_franchise.svg';
import articles from 'assets/svgs/student-navigation-sidebar/articles.svg';
import group from 'assets/svgs/student-navigation-sidebar/group_class.svg';
import homework from 'assets/svgs/student-navigation-sidebar/homework.svg';
import olimpiad from 'assets/svgs/student-navigation-sidebar/olimpiad.svg';
import payment from 'assets/svgs/student-navigation-sidebar/payment.svg';
import report from 'assets/svgs/student-navigation-sidebar/report.svg';
import shedule from 'assets/svgs/student-navigation-sidebar/shedule.svg';
import tariff from 'assets/svgs/student-navigation-sidebar/tariff.svg';
import teacherStatistic from 'assets/svgs/student-navigation-sidebar/teacherStatistic.svg';
import users from 'assets/svgs/student-navigation-sidebar/users.svg';

const {
  Index,
  Payment,
  Statistic,
  Schedule,
  Classes,
  Games,
  Blog,
  UserInfo,
  Olympiads,
  Users,
  Report,
  Homework,
  Franchising,
  Rate,
} = AppRoutes;

export const Links = {
  Index: { label: 'Главная', href: Index, imageSrc: homeImage },
  Schedule: { label: 'Расписание', href: Schedule, imageSrc: shedule },
  Payment: { label: 'Оплата', href: Payment, imageSrc: payment },
  Statistic: {
    label: 'Статистика',
    href: Statistic,
    imageSrc: teacherStatistic,
  },
  Games: { label: 'Список игр', href: Games, imageSrc: listGames },
  Blog: { label: 'Статьи', href: Blog, imageSrc: articles },
  Classes: { label: 'Группы', href: Classes, imageSrc: group },
  UserInfo: {
    label: 'Персональная информация',
    href: UserInfo,
    imageSrc: admin,
  },
  Olympiads: { label: 'Олимпиады', href: Olympiads, imageSrc: olimpiad },
  Users: { label: 'Пользователи', href: Users, imageSrc: users },
  Report: { label: 'Отчеты', href: Report, imageSrc: report },
  Homework: {
    label: 'Домашняя работа',
    href: Homework,
    imageSrc: homework,
  },
  Franchising: {
    label: 'Франчайзинг',
    href: Franchising,
    imageSrc: adminFranchise,
  },
  Rate: { label: 'Тарифы', href: Rate, imageSrc: tariff },
};
