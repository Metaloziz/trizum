import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';

type PropsT = {
  onStart?: () => void;
  isDisable?: boolean;
};
export const PlayButton: FC<PropsT> = ({ onStart, isDisable }) => (
  <div>
    <div className={styles.playButtonBackground}>
      <div className={styles.playButton} onClick={!isDisable ? onStart : undefined}>
        <svg
          width="73"
          height="75"
          viewBox="0 0 73 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69.1339 45.1447C74.1346 41.2753 74.1346 33.7256 69.1339 29.8562C54.0212 18.1626 37.1458 8.94567 19.1393 2.55042L15.8497 1.38209C9.55633 -0.853088 2.90883 3.40491 2.05684 9.90133C-0.323633 28.0524 -0.323633 46.9485 2.05684 65.0996C2.90882 71.596 9.55632 75.854 15.8497 73.6188L19.1392 72.4505C37.1458 66.0553 54.0212 56.8383 69.1339 45.1447Z"
            fill={isDisable ? 'grey' : 'url(#paint0_linear_13605_11225)'}
          />
          <defs>
            <linearGradient
              id="paint0_linear_13605_11225"
              x1="0.271484"
              y1="37.5006"
              x2="72.8844"
              y2="37.5006"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7F28D9" />
              <stop offset="1" stopColor="#7427CC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);
