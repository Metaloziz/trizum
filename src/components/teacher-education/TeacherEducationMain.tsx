import React, { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

import styles from './TeacherEducationMain.module.scss';

import teacherEducationStore from 'app/stores/TeacherEducationStore';
import BlogItem from 'components/molecules/BlogItem';
import appStore, { Roles } from '../../app/stores/appStore';
import { AppRoutes } from '../../app/enums/AppRoutes';

const TeacherEducationMain = () => {
  const navigate = useNavigate();
  const { tests, setCurrentTest } = teacherEducationStore;
  const { role } = appStore;
  const onTheoryClick = (id: string) => {
    const test = tests.find(t => t.id === id);
    // TODO: сделать слаг или айди
    if (test) {
      setCurrentTest(test);
      navigate(`/test/theory/${id}`);
    }
  };

  const onTestClick = (id: string) => {
    const test = tests.find(t => t.id === id);
    if (test) {
      // сделать слаг или айди
      setCurrentTest(test);
      navigate(`/test/${id}`);
    }
  };

  return (
    <div className={styles.container}>
      {tests.map(item => (
        <BlogItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.text}
          imgSrc={item.img}
          testId={item.id}
          // onTestClick={() => onTestClick(item.id)}
          // onTheoryClick={() => onTheoryClick(item.id)}
        />
      ))}
    </div>
  );
};

export default TeacherEducationMain;
