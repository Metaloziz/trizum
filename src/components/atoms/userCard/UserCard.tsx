import React, { FC } from 'react';

import styles from './UserCard.module.scss';

import avatar from 'public/img/avatarDefault.png';
import Image from 'components/image/Image';

type Props = {
  fullName: string;
  status: string;
  city: string;
};

const UserCard: FC<Props> = props => {
  const { fullName, status, city } = props;
  return (
    <div className={styles.card}>
      <span className={styles.avatar}>
        <Image src={avatar} width={50} height={50} alt="avatar" />
      </span>
      <div className={styles.info}>
        <div className={styles.name}>{fullName}</div>
        <div>
          Статус: <span>{status}</span>
        </div>
        <div>
          Город: <span>{city}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
