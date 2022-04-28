import classNames from 'classnames';
import { useState, FC } from 'react';
import Account from '@components/account/Account';
import Burger from '@components/burger/Burger';
import DropDownMenu from '@components/drop-down-menu/DropDownMenu';
import Logo from '@components/logo/Logo';
import styles from './Header.module.scss';

type Props = { className: string };

const Header: FC<Props> = ({ className }) => {
  const [active, setActive] = useState<boolean>(false);
  const [isOpen] = useState(false);
  return (
    <header
      className={classNames(styles.header, className, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.accountBlock}>
        <div className={styles.burgerBlock} onClick={() => setActive(!active)}>
          <Burger />
        </div>
        <Logo />
      </div>
      <Account />
      {active && <DropDownMenu active={active} />}
    </header>
  );
};

export default Header;
