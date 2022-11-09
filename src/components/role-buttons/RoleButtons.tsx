import { Roles } from 'app/enums/Roles';
import React, { FC, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './RoleButtons.module.scss';

import appStore from 'app/stores/appStore';

type Props = {
  name: string;
  onClick: () => void;
  active: string;
  disabled?: boolean;
};

const buttons = Object.values(Roles);

const ButtonItem: FC<Props> = props => {
  const { name, active, disabled, onClick } = props;
  return (
    <button
      type="button"
      className={cn(styles.button, active === name && styles.button_active)}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

const RoleButtons: FC<{ onClick: (role: Roles) => void }> = observer(props => {
  const [isOpen, setIsOpen] = useState(true);
  const onClick = (name: Roles): void => {
    props.onClick(name);
    // appStore.setRole(name);
    // router.push('/');
  };
  return (
    <div className={styles.container}>
      {/* <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Скрыть' : 'Показать'}
      </button> */}
      {isOpen &&
        buttons.map(el => (
          <ButtonItem
            key={el}
            name={el}
            onClick={() => onClick(el as Roles)}
            active={appStore.role}
            disabled={el === Roles.Unauthorized}
          />
        ))}
    </div>
  );
});

export default RoleButtons;
