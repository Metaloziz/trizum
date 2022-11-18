import Paper from '@mui/material/Paper';
import { AppRoutes } from 'app/enums/AppRoutes';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import { Loader } from 'components/loader/Loader';
import { PlateEditor } from 'components/PlateEditor/PlateEditor';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { observer } from 'mobx-react-lite';
import Custom404 from 'pages/404.page';
import React, { FC, useEffect } from 'react';
import style from './ArticleFromEditor.module.scss';

export const ArticleFromEditor: FC = observer(() => {
  const { isLoading, article } = articlesStore;

  const { setOneTest } = testsStore;

  useEffect(() => {
    if (article?.test?.id) {
      setOneTest(article?.test.id);
    }
  }, [article?.test?.id]);

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
          <RedirectCurrentPageButton
            title="Пройти тест"
            rout={`${AppRoutes.Testing}/${SecondaryRoutes.CurrentElement}`}
          />
        )}
        <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
      </div>
    </div>
  );
});
