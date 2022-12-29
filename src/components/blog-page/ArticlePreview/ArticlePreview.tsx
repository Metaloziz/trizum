import { StatusTypes } from 'app/enums/StatusTypes';
import { ArticlesStoreType } from 'app/stores/articlesStore';
import React, { FC } from 'react';
import { findPictureUrl } from 'utils/findPictureUrl';
import BlogItem from 'components/molecules/BlogItem';

type Props = {
  articles: ArticlesStoreType[];
};
export const ArticlePreview: FC<Props> = ({ articles }) => (
  <div>
    {articles.length === 0 ? (
      <div style={{ textAlign: 'center', fontWeight: 500, fontSize: '18px' }}>Статей нет</div>
    ) : (
      articles
        .filter(
          article => article.status === StatusTypes.draft || article.status === StatusTypes.active,
        )
        .map(({ title, content, test, id, status, description }) => {
          const picture = findPictureUrl(content);

          return (
            <BlogItem
              id={id}
              key={id}
              title={title}
              description={description}
              imgSrc={picture}
              testId={test}
              status={status}
            />
          );
        })
    )}
  </div>
);
