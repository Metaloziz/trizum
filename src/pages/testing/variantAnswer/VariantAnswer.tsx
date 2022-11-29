import { ChangeEvent, FC } from 'react';

import styles from 'components/test-page/TestPage.module.scss';

type VariantAnswerPropsType = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentRadioValue: string;
  value: string;
};

export const VariantAnswer: FC<VariantAnswerPropsType> = ({
  onChange,
  currentRadioValue,
  value,
}) => (
  <div className={styles.inputChoice}>
    <input
      type="radio"
      value={value}
      id={value}
      name="currentRadioValue"
      onChange={onChange}
      checked={currentRadioValue === value}
    />
    <label htmlFor={value}>{value}</label>
  </div>
);
