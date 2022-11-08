import { Roles } from 'app/enums/Roles';
import { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import AdminMain from 'components/admin-main/AdminMain';
import FranchiseeAdminMain from 'components/franchisee-admin-main';
import FranchiseeMain from 'components/franchisee-main';
import MethodistMain from 'components/methodist-main';
import { StudentMain } from 'components/pupil-main/StudentMain';
import TeacherEducationMain from 'components/teacher-education/TeacherEducationMain';
import TeacherMain from 'components/teacher-main/teacherMain';
import TutorMain from 'components/tutor-main';
import styles from 'pages/home/Home.module.scss';
import { Login } from 'pages/login/Login';

const Home = observer(() => {
  const { role } = appStore;
  const { loginError } = appStore;
  const [part, setPart] = useState(<></>);
  useEffect(() => {
    switch (role) {
      case Roles.Student:
        setPart(<StudentMain />);
        break;
      case Roles.TeacherEducation:
        setPart(<TeacherEducationMain />);
        break;
      case Roles.Teacher:
        setPart(<TeacherMain />);
        break;
      case Roles.FranchiseeAdmin:
        setPart(<FranchiseeAdminMain />);
        break;
      case Roles.Franchisee:
        setPart(<FranchiseeMain />);
        break;
      case Roles.Methodist:
        setPart(<MethodistMain />);
        break;
      case Roles.Tutor:
        setPart(<TutorMain />);
        break;
      case Roles.Admin:
        setPart(<AdminMain />);
        break;
      case Roles.Unauthorized:
      default:
        setPart(<Login />);
    }
  }, [role, loginError]);

  return <div className={styles.container}>{part}</div>;
});
export default Home;
