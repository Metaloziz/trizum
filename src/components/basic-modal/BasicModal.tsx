import React, { FC } from 'react';

import styles from './BasicModal.module.scss';

import buttonClose from 'assets/svgs/button.svg';
import Image from 'components/image/Image';

interface Props {
  children?: React.ReactNode;
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
}

const BasicModal: FC<Props> = ({ children, visibility, changeVisibility }) => {
  if (!visibility) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={() => changeVisibility(false)}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <div className={styles.btnClose} onClick={() => changeVisibility(false)}>
          <Image src={buttonClose} width="14" height="14" alt="Х" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
