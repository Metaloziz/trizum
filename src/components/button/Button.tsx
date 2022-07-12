import React, { FC, ReactElement, useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

import { DefaultButtonProps } from 'app/types/DefaultButtonProps';
import buttonImage from 'assets/svgs/arrow-btn.svg';
import iconExelHover from 'assets/svgs/btn-excel-hover.svg';
import iconExel from 'assets/svgs/btn-excel.svg';
import iconParents from 'assets/svgs/parents.svg';
import iconPlus from 'assets/svgs/plus.svg';
import iconPlusHover from 'assets/svgs/plusHover.svg';
import smallArrow from 'assets/svgs/small-arrow.svg';
import styles from 'components/button/Button.module.scss';
import Image from 'components/image/Image';

type ButtonVariantType =
  | 'parents'
  | 'bigButton'
  | 'addUser'
  | 'addExel'
  | 'primary'
  | 'none'
  | 'arrow';

type ButtonSize = 'large' | 'small' | 'thin';

type Props = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariantType;
  onClick?: () => void;
} & DefaultButtonProps;

const Button: FC<Props> = ({ children, size, variant, onClick, ...props }) => {
  const [isShowHover, setShowHover] = useState<boolean>(false);
  let iconButton: ReactElement;
  let typeButtonStyle: string;
  switch (variant) {
    case 'parents':
      typeButtonStyle = styles.parents;
      iconButton = <Image src={iconParents} alt="parents" width={20} height={16} />;
      break;
    case 'bigButton':
      typeButtonStyle = styles.bigButton;
      iconButton = <Image src={buttonImage} alt="arrow" width={36} height={19} />;
      break;
    case 'addUser':
      typeButtonStyle = styles.addUser;
      iconButton = isShowHover ? (
        <Image src={iconPlusHover} alt="plus" width={18} height={18} />
      ) : (
        <Image src={iconPlus} alt="plus" width={18} height={18} />
      );
      break;
    case 'addExel':
      typeButtonStyle = styles.addExel;
      iconButton = isShowHover ? (
        <Image src={iconExelHover} alt="exel" width={14} height={19} />
      ) : (
        <Image src={iconExel} alt="exel" width={14} height={19} />
      );
      break;
    case 'primary':
      typeButtonStyle = styles.primary;
      iconButton = <Image src={smallArrow} alt="arrow" width={16} height={10} />;
      break;
    case 'none':
      typeButtonStyle = '';
      iconButton = <></>;
      break;
    default:
      typeButtonStyle = '';
      iconButton = <Image src={buttonImage} alt="arrow" width={26} height={13} />;
  }
  let sizeButton;

  switch (size) {
    case 'small':
      sizeButton = styles.small;
      break;
    case 'large':
      sizeButton = styles.large;
      break;
    case 'thin':
      sizeButton = styles.thin;
      break;
    default:
      sizeButton = '';
  }

  // @ts-ignore
  return (
    <motion.button
      // whileHover={{
      //   background: 'linear-gradient(90deg, #0439AD 0%, #38028F 100%)',
      //   transition: {
      //     delay: 0.2,
      //     ease: [0.17, 0.67, 0.83, 0.67],
      //     duration: 0.5,
      //   },
      // }}
      {...props}
      className={cn(styles.Button, variant === 'none' && styles.none, typeButtonStyle, sizeButton)}
      onClick={onClick}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      {variant !== 'none' && <span className={styles.arrowBtn}>{iconButton}</span>}
      {children}
    </motion.button>
  );
};

Button.defaultProps = {
  children: undefined,
  size: 'small',
  variant: 'arrow',
  onClick: () => {},
};

export default Button;
