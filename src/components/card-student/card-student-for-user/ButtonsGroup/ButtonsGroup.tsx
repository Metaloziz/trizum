import cn from 'classnames';
import styles from 'components/card-student/card-student-for-user/CardStudentForUser.module.scss';
import Image from 'components/image/Image';
import iconTelegram from 'assets/svgs/telegram.svg';
import iconWhatsApp from 'assets/svgs/whats-app.svg';
import Button from 'components/button/Button';
import React, { FC } from 'react';

type Props = {
  openChatLink: () => void;
  openModal: () => void;
};

export const ButtonsGroup: FC<Props> = ({ openModal, openChatLink }) => (
  <div className={cn(styles.row, styles.buttonGroup)}>
    {/* <div className={styles.social}> */}
    {/*  <span>Ссылки на чаты:</span> */}
    {/*  <Image src={iconTelegram} width="25" height="25" alt="icon tablet" onClick={openChatLink} /> */}
    {/*  <Image src={iconWhatsApp} width="25" height="25" alt="icon tablet" onClick={openChatLink} /> */}
    {/* </div> */}
    <Button size="small" onClick={openModal}>
      Принять участие в олимпиаде
    </Button>
  </div>
);
