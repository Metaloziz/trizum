import { FC, useState } from 'react';

import cn from 'classnames';

import styles from './ButtonPaidUnpaid.module.scss';

import usersService from 'app/services/usersService';
import { ResponseUserT, UserStatusT } from 'app/types/UserTypes';
import unpaid from 'assets/svgs/noun-payment-denied.svg';
import paid from 'assets/svgs/noun-payment-approved.svg';
import Image from 'components/image/Image';
import usersStore from 'app/stores/usersStore';

type Props = Pick<ResponseUserT, 'id' | 'active'>;

const SetPaidStatusButton: FC<Props> = ({ id, active }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const setNewStatus = async () => {
    setIsDisable(true);
    try {
      setIsActive(!isActive);
      const res = await usersStore.updateUser({ isPayed: !isActive }, id);
      setIsDisable(false);
    } catch (e) {
      setIsDisable(false);
    }
  };

  const iconButton = isActive ? (
    <Image src={unpaid} alt="lock" width={16} height={20} />
  ) : (
    <Image src={paid} alt="open" width={16} height={20} />
  );
  console.log('icon',iconButton)
  return (
    <button
      type="button"
      className={cn(styles.Button, isActive && styles.closed, isDisable && styles.disable)}
      onClick={setNewStatus}
      disabled={isDisable}
    >
      <span className={styles.icon}>{iconButton}</span>
      {isActive ? 'Аннулировать оплату' : 'Оплатить'}
    </button>
    
  );
};

export default SetPaidStatusButton;
