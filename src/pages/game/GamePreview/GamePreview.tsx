import React from 'react';
import { NavLink } from 'react-router-dom';
import Play from '../../../assets/images/game/play.svg';
import Image from '../../../components/image/Image';
import styles from '../Game.module.scss';

export const GamePreview = (props: {
  onClick: () => void;
  gam: { name: string; prevImg: any; title: string };
  onClick1: () => void;
  game: () => void;
}) => {
  const onClickHandle = () => {
    props.game();
    props.onClick();
  };
  return (
    <div className={styles.gameItem}>
      <div className={styles.gameItem_header}>
        <span className={styles.gameItem_header_title}>{props.gam.title}</span>
      </div>
      <svg
        onClick={props.onClick1}
        className={styles.gameItem_settings}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.40466 1.05039C8.99186 -0.350129 7.00814 -0.350128 6.59534 1.05039L6.49523 1.39003C6.23147 2.2849 5.20935 2.70827 4.39008 2.26201L4.07913 2.09264C2.79692 1.39422 1.39422 2.79693 2.09264 4.07913L2.26201 4.39008C2.70827 5.20935 2.2849 6.23147 1.39003 6.49523L1.05039 6.59534C-0.350129 7.00814 -0.350128 8.99186 1.05039 9.40466L1.39003 9.50477C2.2849 9.76853 2.70827 10.7906 2.26201 11.6099L2.09264 11.9209C1.39422 13.2031 2.79692 14.6058 4.07913 13.9074L4.39008 13.738C5.20935 13.2917 6.23147 13.7151 6.49523 14.61L6.59534 14.9496C7.00814 16.3501 8.99186 16.3501 9.40466 14.9496L9.50477 14.61C9.76853 13.7151 10.7906 13.2917 11.6099 13.738L11.9209 13.9074C13.2031 14.6058 14.6058 13.2031 13.9074 11.9209L13.738 11.6099C13.2917 10.7906 13.7151 9.76853 14.61 9.50477L14.9496 9.40466C16.3501 8.99186 16.3501 7.00814 14.9496 6.59534L14.61 6.49523C13.7151 6.23147 13.2917 5.20935 13.738 4.39008L13.9074 4.07913C14.6058 2.79692 13.2031 1.39422 11.9209 2.09264L11.6099 2.26201C10.7906 2.70827 9.76853 2.2849 9.50477 1.39003L9.40466 1.05039ZM8 10.9288C6.38246 10.9288 5.07119 9.61754 5.07119 8C5.07119 6.38246 6.38246 5.07119 8 5.07119C9.61754 5.07119 10.9288 6.38246 10.9288 8C10.9288 9.61754 9.61754 10.9288 8 10.9288Z"
          fill="#2E8DFD"
        />
      </svg>
      <NavLink onClick={onClickHandle} to={props.gam.name}>
        <img className={styles.gameItem_play} src={Play} alt="" />
      </NavLink>
      {props.gam.prevImg && (
        <Image className={styles.gameItem_prevImg} src={props.gam?.prevImg} alt="Previous Games" />
      )}
    </div>
  );
};
