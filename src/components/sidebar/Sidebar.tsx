import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './Sidebar.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import listGames from 'assets/svgs/list-games.svg';
import homeImage from 'assets/svgs/student-navigation-link-home.svg';
import paymentImage from 'assets/svgs/student-navigation-link-payment.svg';
import resultsImage from 'assets/svgs/student-navigation-link-results.svg';
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
  Schedule: { label: 'Расписание', href: Schedule, imageSrc: resultsImage },
  Payment: { label: 'Оплата', href: Payment, imageSrc: paymentImage },
  Statistic: {
    label: 'Статистика',
    href: Statistic,
    imageSrc: resultsImage,
  },
  Games: { label: 'Список игр', href: Games, imageSrc: listGames },
  Blog: { label: 'Статьи', href: Blog, imageSrc: paymentImage },
  Classes: { label: 'Классы', href: Classes, imageSrc: paymentImage },
  UserInfo: {
    label: 'Персональная информация',
    href: UserInfo,
    imageSrc: paymentImage,
  },
  Olympiads: { label: 'Олимпиады', href: Olympiads, imageSrc: paymentImage },
  Users: { label: 'Пользователи', href: Users, imageSrc: paymentImage },
  Report: { label: 'Отчеты', href: Report, imageSrc: paymentImage },
  Homework: {
    label: 'Домашняя работа',
    href: Homework,
    imageSrc: paymentImage,
  },
  Franchising: {
    label: 'Франчайзинг',
    href: Franchising,
    imageSrc: paymentImage,
  },
  Rate: { label: 'Тарифы', href: Rate, imageSrc: paymentImage },
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
  Links.Homework,
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
