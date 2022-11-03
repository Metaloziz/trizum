import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './Sidebar.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import listGames from 'assets/svgs/list-games.svg';
import homeImage from 'assets/svgs/student-navigation-link-home.svg';
import tariff from 'assets/svgs/student-navigation-sidebar/tariff.svg';
import adminFranchise from 'assets/svgs/student-navigation-sidebar/admin_franchise.svg';
import admin from 'assets/svgs/student-navigation-sidebar/admin.svg';
import users from 'assets/svgs/student-navigation-sidebar/users.svg';
import teacherStatistic from 'assets/svgs/student-navigation-sidebar/teacherStatistic.svg';
import articles from 'assets/svgs/student-navigation-sidebar/articles.svg';
import shedule from 'assets/svgs/student-navigation-sidebar/shedule.svg';
import olimpiad from 'assets/svgs/student-navigation-sidebar/olimpiad.svg';
import report from 'assets/svgs/student-navigation-sidebar/report.svg';
import group from 'assets/svgs/student-navigation-sidebar/group_class.svg';
import payment from 'assets/svgs/student-navigation-sidebar/payment.svg';
import homework from 'assets/svgs/student-navigation-sidebar/homework.svg';

import Navigation from 'components/navigation/Navigation';

export type LinkT = { label: string; href: string; imageSrc: string };

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

const Links = {
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
const studentLinks = [
  Links.Index,
  // Links.Olympiads,
  // Links.Payment,
  // Links.Statistic,
  Links.Blog,
];
const teacherLinks = [
  Links.Index,
  Links.Classes,
  // Links.Statistic,
  // Links.Homework,
  Links.Games,
  Links.Blog,
  Links.UserInfo,
];
const teacherEducationLinks = [Links.Index];
const franchiseeAdminLinks = [
  Links.Index,
  Links.Classes,
  Links.Statistic,
  // Links.Homework,
  Links.Users,
  Links.Games,
  Links.UserInfo,
];
const franchiseeLinks = [
  Links.Index,
  Links.Classes,
  Links.Statistic,
  Links.Homework,
  Links.Users,
  Links.Games,
  Links.Blog,
  Links.Report,
  Links.UserInfo,
];
const methodistLinks = [
  Links.Index,
  Links.Schedule,
  Links.Classes,
  Links.Statistic,
  Links.Homework,
  Links.Games,
  Links.Blog,
  Links.Olympiads,
  Links.UserInfo,
];
const tutorLinks = [Links.Index, Links.Users, Links.Blog, Links.UserInfo];
const adminLinks = [
  Links.Index,
  Links.Users,
  Links.Statistic,
  Links.Classes,
  Links.Games,
  Links.Blog,
  // Links.Report,
  Links.Franchising,
  Links.Rate,
  Links.UserInfo,
  Links.Schedule,
  Links.Olympiads,
];
const Sidebar: FC = observer(() => {
  const { role } = appStore;
  const [links, setLinks] = useState([Links.Index]);

  useEffect(() => {
    switch (role) {
      case Roles.Student:
        setLinks(studentLinks);
        break;
      case Roles.TeacherEducation:
        setLinks(teacherEducationLinks);
        break;
      case Roles.Teacher:
        setLinks(teacherLinks);
        break;
      case Roles.FranchiseeAdmin:
        setLinks(franchiseeAdminLinks);
        break;
      case Roles.Franchisee:
        setLinks(franchiseeLinks);
        break;
      case Roles.Methodist:
        setLinks(methodistLinks);
        break;
      case Roles.Tutor:
        setLinks(tutorLinks);
        break;
      case Roles.Admin:
        setLinks(adminLinks);
        break;
      default:
        setLinks([]);
    }
  }, [role]);
  return !links.length ? (
    <div className={styles.sidebar_hidden} />
  ) : (
    <aside className={styles.sidebar}>
      <Navigation
        links={links}
        linkClassName={styles.link}
        linkWrapperClassName={styles.linkWrapper}
        linkImageClassName={styles.linkImage}
        activeClassName={styles.activeLink}
      />
    </aside>
  );
});

export default Sidebar;
