import usersStore from 'app/stores/usersStore';
import { ResponseUserT } from 'app/types/UserTypes';

import cn from 'classnames';
import { IsPaidIcon } from 'components/button-paid-unpaid/IsPaidIcon/IsPaidIcon';
import { FC, useState } from 'react';

import styles from './ButtonPaidUnpaid.module.scss';

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

  return (
    <button
      type="button"
      className={cn(styles.Button, isActive && styles.closed, isDisable && styles.disable)}
      onClick={setNewStatus}
      disabled={isDisable}
    >
      <span className={styles.icon}>
        <IsPaidIcon isPaid={active} />
      </span>
      {isActive ? 'Аннулировать оплату' : 'Оплатить'}
    </button>
  );
};

export default SetPaidStatusButton;
