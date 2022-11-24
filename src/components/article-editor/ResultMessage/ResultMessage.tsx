import { Nullable } from 'app/types/Nullable';
import styles from '../ArticleEditor.module.scss';
import Button from 'components/button/Button';
import React, { FC } from 'react';

type Props = { successPost: Nullable<string>; onClick: () => void; titleButton: string };

export const ResultMessage: FC<Props> = ({ onClick, successPost, titleButton }) => (
  <>
    {!successPost || (
      <>
        <div className={styles.success}>{successPost}</div>
        <Button onClick={onClick} type="button">
          {titleButton}
        </Button>
      </>
    )}
  </>
);
