import { FC, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './DropDownMenu.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import homeImage from 'assets/svgs/student-navigation-link-home.svg';
import resultsImage from 'assets/svgs/student-navigation-sidebar/result.svg';
import homeworkImg from 'assets/svgs/student-navigation-sidebar/homework.svg';
import adminFranchiseImg from 'assets/svgs/student-navigation-sidebar/admin_franchise.svg';
import reportImg from 'assets/svgs/student-navigation-sidebar/report.svg';
import usersImg from 'assets/svgs/student-navigation-sidebar/users.svg';
import scheduleImg from 'assets/svgs/student-navigation-sidebar/shedule.svg';
import paymentImg from 'assets/svgs/student-navigation-sidebar/payment.svg';
import tariffImg from 'assets/svgs/student-navigation-sidebar/tariff.svg';
import gameListImg from 'assets/svgs/student-navigation-sidebar/gameList.svg';
import articlesImg from 'assets/svgs/student-navigation-sidebar/articles.svg';
import groupImg from 'assets/svgs/student-navigation-sidebar/group_class.svg';
import adminImg from 'assets/svgs/student-navigation-sidebar/admin.svg';
import olimpiad from 'assets/svgs/student-navigation-sidebar/olimpiad.svg';

import Navigation from 'components/navigation/Navigation';
import useComponentVisible from 'HOC/drop-down-hook/DropDownHook';
import { observer } from 'mobx-react-lite';
import appStore, { Roles } from 'app/stores/appStore';

interface Props {
  active: boolean;
  onClose: () => void;
}

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
  Schedule: { label: 'Расписание', href: Schedule, imageSrc: scheduleImg },
  Payment: { label: 'Оплата', href: Payment, imageSrc: paymentImg },
  Statistic: {
    label: 'Статистика',
    href: Statistic,
    imageSrc: resultsImage,
  },
  // Games: { label: 'Список игр', href: Games, imageSrc: listGames },
  Games: { label: 'Список игр', href: Games, imageSrc: gameListImg },
  Blog: { label: 'Статьи', href: Blog, imageSrc: articlesImg },
  Classes: { label: 'Классы', href: Classes, imageSrc: groupImg },
  UserInfo: {
    label: 'Персональная информация',
    href: UserInfo,
    imageSrc: adminImg,
  },
  Olympiads: { label: 'Олимпиады', href: Olympiads, imageSrc: olimpiad },
  Users: { label: 'Пользователи', href: Users, imageSrc: usersImg },
  Report: { label: 'Отчёт', href: Report, imageSrc: reportImg },
  Homework: {
    label: 'Домашняя работа',
    href: Homework,
    imageSrc: homeworkImg,
  },
  Franchising: {
    label: 'Franchising',
    href: Franchising,
    imageSrc: adminFranchiseImg,
  },
  Rate: { label: 'Тарифы', href: Rate, imageSrc: tariffImg },
};
const studentLinks = [
  Links.Index,
  // Links.Olympiads,
  Links.Payment,
  Links.Statistic,
  // Links.Games,
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
  Links.Report,
  Links.Franchising,
  Links.Rate,
  Links.UserInfo,
  Links.Schedule,
];

const DropDownMenu: FC<Props> = observer(({ active, onClose }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(
    true,
    'burger',
    onClose,
    true,
  );
  // const { Index, Payment } = AppRoutes;
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
  return active && !links.length ? (
    <div />
  ) : (
    <div className={cn(styles.dropDownMenu, active && styles.showDropDown)} ref={ref}>
      {isComponentVisible && (
        <Navigation
          onClick={onClose}
          links={links}
          linkClassName={styles.link}
          linkWrapperClassName={styles.linkWrapper}
          linkImageClassName={styles.linkImage}
        />
      )}
    </div>
  );
});

export default DropDownMenu;
