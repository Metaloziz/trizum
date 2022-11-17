import { ArticlesStoreType } from 'app/stores/articlesStore';
import React, { FC } from 'react';
import { findPictureUrl } from 'utils/findPictureUrl';
import BlogItem from 'components/molecules/BlogItem';

type Props = {
  articles: ArticlesStoreType[];
};
export const ArticlePreview: FC<Props> = ({ articles }) => (
  <div>
    {articles.map(({ title, content, test, id, status, description }) => {
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
    })}
  </div>
);
