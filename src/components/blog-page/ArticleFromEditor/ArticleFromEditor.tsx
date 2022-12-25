import Paper from '@mui/material/Paper';
import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import { Loader } from 'components/loader/Loader';
import { PlateEditor } from 'components/PlateEditor/PlateEditor';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { observer } from 'mobx-react-lite';
import Custom404 from 'pages/404.page';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import style from './ArticleFromEditor.module.scss';

export const ArticleFromEditor: FC = observer(() => {
  const { isLoading, article } = articlesStore;

  const { id } = useParams<'id'>();

  if (isLoading) {
    return <Loader />;
  }

  if (!article) {
    return <Custom404 />;
  }

  const { title, content, test } = article;

  return (
    <div className={style.container}>
      <Paper elevation={1} sx={{ width: '100%', padding: '20px' }}>
        <h2 className={style.title}>{title}</h2>
        <PlateEditor readOnly hiddenToolbar initialValue={content} />
      </Paper>
      <div className={style.buttons}>
        {test && (
          <RedirectCurrentPageButton title="Пройти тест" rout={`${AppRoutes.Testing}/${id}`} />
        )}
        <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
      </div>
    </div>
  );
});
