import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { AppRoutes } from 'app/enums/AppRoutes';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import { StatusTypes } from 'app/enums/StatusTypes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import Button from 'components/button/Button';
import Image from 'components/image/Image';

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { whoCanUseIt } from 'utils/whoCanUseIt';

import styles from './BlogItem.module.scss';

interface Props {
  id: string;
  title: string;
  testId: string;
  imgSrc?: string;
  description: string;
  status?: StatusTypes;
}

const BlogItem: FC<Props> = observer(({ title, imgSrc = '', description, id, testId, status }) => {
  const { role } = appStore;
  const { getCurrentArticle, deleteArticle } = articlesStore;
  const { setOneTest } = testsStore;

  const navigate = useNavigate();

  const onTestClick = () => {
    setOneTest(testId);
    navigate(`${AppRoutes.Testing}/${SecondaryRoutes.CurrentElement}`);
  };

  const onReadTheoryClick = (): void => {
    getCurrentArticle(id);
    navigate(`${AppRoutes.Blog}/${id}`);
  };

  const onDeleteArticleClick = () => {
    deleteArticle(id);
  };

  const onEditArticleClick = () => {
    navigate(`${AppRoutes.BlogEditor}/${id}`);
  };

  return (
    <div className={styles.containerItem}>
      <div className={styles.wrapperTeacherImg}>
        <Image src={imgSrc} alt="Images" />
      </div>
      <div className={styles.itemText}>
        <h2 className={styles.title}>{title}</h2>

        <p>{description}</p>
        <div className={styles.containerButton}>
          <Button onClick={onReadTheoryClick}>Прочитать теорию</Button>
          {role !== Roles.Student && testId && <Button onClick={onTestClick}>Пройти тест</Button>}
        </div>
        <div className={styles.delete}>
          {whoCanUseIt([Roles.Admin, Roles.Methodist]) && (
            <>
              <IconButton size="large" onClick={onEditArticleClick} color="primary">
                <EditIcon fontSize="large" />
              </IconButton>
              <IconButton
                size="large"
                onClick={onDeleteArticleClick}
                color="error"
                disabled={status === StatusTypes.archive || status === StatusTypes.removal}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default BlogItem;
