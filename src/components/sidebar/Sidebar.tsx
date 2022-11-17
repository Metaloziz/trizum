import { Roles } from "app/enums/Roles";
import appStore from 'app/stores/appStore';

import Navigation from 'components/navigation/Navigation';
import { Links } from 'components/sidebar/Links';
import {
  adminLinks,
  tutorLinks,
  methodistLinks,
  franchiseeLinks,
  franchiseeAdminLinks,
  teacherEducationLinks,
  teacherLinks,
  studentLinks,
} from 'components/sidebar/roleLinks/roleLinks';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';

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
