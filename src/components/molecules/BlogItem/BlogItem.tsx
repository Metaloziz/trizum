import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogItem.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import Button from 'components/button/Button';
import { Button as DeleteButton } from '@mui/material';
import Image from 'components/image/Image';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import { whoCanUseIt } from 'utils/whoCanUseIt';

interface Props {
  id: string;
  title: string;
  testId: string;
  imgSrc?: string;
  description: string;
}

const BlogItem: FC<Props> = observer(({ title, imgSrc = '', description, id, testId }) => {
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
    navigate(`${AppRoutes.Blog}/${title}`);
  };

  const deleteArticleHandle = () => {
    deleteArticle(id);
  };

  return (
    <div className={styles.containerItem}>
      <div className={styles.wrapperTeacherImg}>
        <Image src={imgSrc} alt="Images" />
      </div>
      <div className={styles.itemText}>
        <h2>{title}</h2>

        <p>{description}</p>
        <div className={styles.containerButton}>
          <Button onClick={onReadTheoryClick}>Прочитать теорию</Button>
          {role !== Roles.Student && testId && <Button onClick={onTestClick}>Пройти тест</Button>}
        </div>
        <div className={styles.delete}>
          {whoCanUseIt([Roles.Admin, Roles.Methodist]) && (
            <DeleteButton onClick={deleteArticleHandle} variant="outlined" color="error">
              Удалить статью
            </DeleteButton>
          )}
        </div>
      </div>
    </div>
  );
});

export default BlogItem;
