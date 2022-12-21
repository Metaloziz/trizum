import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { MobileStepper, useTheme } from '@mui/material';
import ButtonMui from '@mui/material/Button';
import { AppRoutes } from 'app/enums/AppRoutes';
import { StatusTypes } from 'app/enums/StatusTypes';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import CardStudent from 'components/card-student/CardStudent';
import { getWorksAndScheduleOnId } from 'components/pupil-main/getWorksAndSchedule/getWorksAndSchedule';
import { HomeWorksList } from 'components/pupil-main/HomeWorksList/HomeWorksList';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import { observer } from 'mobx-react-lite';
import styles from 'pages/home/Home.module.scss';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveClassAndOlympiadGroup } from 'utils/getActiveClassGroup';
import { personalRecordsArr } from 'utils/personalRecordsArr';

export const StudentMain: FC = observer(() => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user, setGameIdsWithCodesByHomeWorkIndex } = appStore;
  const { getOlympiadGroups } = groupStore;

  const [activeStep, setActiveStep] = useState(0);

  const classTypeObject = getActiveClassAndOlympiadGroup(user.groups);

  const { works, schedule } = getWorksAndScheduleOnId(
    user.groups,
    classTypeObject[activeStep]?.id || '',
  );

  const recordsArr = personalRecordsArr(user.personalRecord);

  const onNextClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const onBackClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const redirectListStudents = () => {
    navigate(`${AppRoutes.Olympiads}/${classTypeObject[activeStep].group.id}`);
  };

  const step = classTypeObject.length;

  useEffect(() => {
    getOlympiadGroups({ perPage: 100, type: 'olympiad', status: StatusTypes.active });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.rowInfo}>
        <CardStudent user={user} />
        <WeeklyGrowth records={recordsArr} className={styles.weeklyGrowth} />
      </div>

      {step > 1 && (
        <div className={styles.wrapNameClass}>
          <h2>
            {classTypeObject[activeStep].group.type === 'class' ? 'Класс:' : 'Олимпиада:'}{' '}
            {classTypeObject[activeStep].group.name}
          </h2>

          {classTypeObject[activeStep].group.type === 'olympiad' && (
            <p className={styles.statistic} onClick={redirectListStudents}>
              Статистика
            </p>
          )}

          <MobileStepper
            variant="dots"
            steps={step}
            position="static"
            activeStep={activeStep}
            className={styles.stepper}
            nextButton={
              <ButtonMui size="small" onClick={onNextClick} disabled={activeStep === step - 1}>
                Следующая
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </ButtonMui>
            }
            backButton={
              <ButtonMui size="small" onClick={onBackClick} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Предыдущая
              </ButtonMui>
            }
          />
        </div>
      )}

      <div className={styles.rowHw}>
        <HomeWorksList
          works={works}
          schedule={schedule}
          setGameIdsWithCodes2={setGameIdsWithCodesByHomeWorkIndex}
          groupId={classTypeObject[activeStep]?.id}
        />

        <KeepPlaying className={styles.keepPlaying} userGroupId={classTypeObject[activeStep]?.id} />
      </div>
    </main>
  );
});
