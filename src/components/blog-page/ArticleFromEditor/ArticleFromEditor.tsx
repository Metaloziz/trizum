import React, { FC, useEffect, useMemo, useState } from 'react';
import articlesStore from 'app/stores/articlesStore';
import { observer } from 'mobx-react-lite';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Elem, Leaf } from 'components/rich-text/RichTextElements';
import Paper from '@mui/material/Paper';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { AppRoutes } from 'app/enums/AppRoutes';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import style from './ArticleFromEditor.module.scss';
import testsStore from 'app/stores/testsStore';

export const ArticleFromEditor: FC = observer(() => {
  const {
    article: { title, content, test },
    // getArticle: { title, content, test },
  } = articlesStore;
  const { setOneTest } = testsStore;

  const [value, setValue] = useState(content);

  console.log('content', [...value]);

  useEffect(() => {
    if (!!test) {
      setOneTest(test.id);
    }
  }, []);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = (props: any) => <Elem {...props} />;
  const renderLeaf = (props: any) => <Leaf {...props} />;

  return (
    <div className={style.container}>
      <Paper elevation={1} sx={{ width: '100%', padding: '20px' }}>
        <h2>{title}</h2>
        <Slate editor={editor} value={content}>
          <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
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
