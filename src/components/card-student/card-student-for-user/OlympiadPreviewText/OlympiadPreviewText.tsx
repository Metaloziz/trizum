import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { MobileStepper, useTheme } from '@mui/material';
import ButtonMui from '@mui/material/Button';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import Button from 'components/button/Button';
import styles from 'components/card-student/card-student-for-user/CardStudentForUser.module.scss';
import Panel from 'components/panel/Panel';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { filterStartDateAndAnnounceDate } from 'utils/olympiadUtils/filterStartDateAndAnnounceDate';

export const OlympiadPreviewText: FC = observer(() => {
  const theme = useTheme();
  const { user } = appStore;
  const { groups, addUserGroup, isLoad } = groupStore;

  const filterGroups = filterStartDateAndAnnounceDate(groups);
  const step = filterGroups.length;

  const [activeStep, setActiveStep] = useState(0);
  const { name, description, schedule, endedAt, id } = groups[activeStep];

  const onNextClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const onBackClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const onParticipateClick = async () => {
    await addUserGroup({ groupId: id, userId: user.id });
  };

  const isStudentInGroups =
    user.groups.filter(group => group.group.id === groups[activeStep].id).length !== 0;

  return (
    <>
      <div className={styles.modalContent}>
        <Panel className={styles.panel}>{name}</Panel>
        <div>
          <p>{description}</p>
        </div>
        <div className={styles.modalFooter}>
          {isStudentInGroups && 'Уже участвуете в этой олимпиаде'}
          <div className={styles.btn}>
            <Button onClick={onParticipateClick} disabled={isLoad || isStudentInGroups}>
              Принять участие в олимпиаде
            </Button>
          </div>
          <div className={styles.date}>
            <p>Дата проведения: </p> {new Date(schedule.homeworks[0].start).toLocaleString()} -{' '}
            {new Date(endedAt.date).toLocaleString()}
          </div>
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
      </div>
    </>
  );
});
