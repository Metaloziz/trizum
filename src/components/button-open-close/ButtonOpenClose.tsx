import Image from 'next/image';
import { FC, useState } from 'react';
import iconClosed from '@svgs/closed-lock.svg';
import iconOpen from '@svgs/open-lock.svg';
import styles from './ButtonOpenClose.module.scss';

interface Props {
  isOpen: boolean;
}

const ButtonOpenClose: FC<Props> = ({ isOpen }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const iconButton = open ? (
    <Image src={iconOpen} alt={'open'} width={16} height={20} />
  ) : (
    <Image src={iconClosed} alt={'lock'} width={16} height={20} />
  );

  const finalStyle = `${styles.customButton} ${open ? '' : styles.closed}`;
  return (
    <button className={finalStyle} onClick={() => setOpen(!open)}>
      <span className={styles.icon}>{iconButton}</span>
      {open ? 'Разблокировать' : 'Заблокировать'}
    </button>
  );
};

export default ButtonOpenClose;