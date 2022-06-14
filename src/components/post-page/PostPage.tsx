import { FC } from 'react';

import BackButton from '@components/backButton/BackButton';
import resultIcon from '@svgs/result-icon.svg';
import Image from 'next/image';

import styles from './PostPage.module.scss';

const PostPage: FC = () => (
  <div>
    <BackButton />
    <div className={styles.wrapperResult}>
      <div className={styles.imageTeacher}>
        <Image src={resultIcon} width="406" height="426" alt="resultIcon" />
      </div>
      <div className={styles.textResult}>
        <div>
          <h2>Второй блок</h2>
        </div>
        <div className={styles.wrapperText}>
          <p>
            А также явные признаки победы институционализации призывают нас к новым свершениям,
            которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения
            подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в
            свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники
            тоталитаризма в науке являются только методом политического участия и в равной степени
            предоставлены сами себе.
          </p>
          <p>
            А также явные признаки победы институционализации призывают нас к новым свершениям,
            которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения
            подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в
            свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники
            тоталитаризма в науке являются только методом политического участия и в равной степени
            предоставлены сами себе.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PostPage;
