import React, { useEffect, useState } from 'react';

import styles from './AddNewsPage.module.scss';
import Button from 'components/button/Button';
import RichTextEditor from 'components/rich-text/RichTextEditor';
import { CustomMultiSelect, StyledOption } from 'components/multiSelect/CustomMultiSelect';
import { convertEnumOptions, EMPTY_ROLE_VALUE } from 'utils/convertEnumOptions';
import { RoleNames } from 'app/enums/RoleNames';
import { TextField } from '@mui/material';
import testsStore from 'app/stores/testsStore';
import { getAllOptionsMUI } from 'utils/getOption';
import { convertTestOptions } from 'utils/convertTestOptions';
import articlesStore from 'app/stores/articlesStore';
import { Roles } from 'app/stores/appStore';
import slateStore from 'app/stores/slateStore';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import { ResultMessage } from 'components/add-news-page/ResultMessage/ResultMessage';
import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';

type ArticleFormT = {
  title: string;
  description: string;
  testId: string;
  roles: number[];
};

const AddNewsPage = observer(() => {
  const { content } = slateStore;
  const { tests, setTests, setSearchParams } = testsStore;
  const { postArticle, isSuccessPost, article, setDefaultIsSuccessPost } = articlesStore;

  const [roles, setRoles] = useState<any>([EMPTY_ROLE_VALUE]);

  const rolesOptions = convertEnumOptions(RoleNames);
  const testOptions = convertTestOptions(tests);

  const removeDefaultRole = (newRoles: any[]) => {
    const EmptyRoleIndex = newRoles.indexOf(EMPTY_ROLE_VALUE);

    if (EmptyRoleIndex >= 0 && newRoles.length > 1) {
      newRoles.splice(EmptyRoleIndex, 1);
    }

    setRoles(newRoles);
  };

  useEffect(() => {
    setSearchParams({ per_page: 1000 });
    setDefaultIsSuccessPost();
    setTests();
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('обязательно поле'),
    description: yup.string().required('обязательно поле'),
    testId: yup.string().notRequired(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ArticleFormT>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onReadTheoryClick = (): void => {
    navigate(`${AppRoutes.Blog}/${article.title}`);
  };

  const onSubmit = handleSubmit(data => {
    const description: ArticleDescriptionType = { type: 'description', text: data.description };

    content.push(description); // добавление описания вне редактора

    const newArticle: ArticlePayloadT = {
      title: data.title,
      content,
      status: 'active',
      forFranchisee: roles.includes(Roles.Franchisee),
      forFranchiseeAdmin: roles.includes(Roles.FranchiseeAdmin),
      forMethodist: roles.includes(Roles.Methodist),
      forStudents: roles.includes(Roles.Student),
      forTeachers: roles.includes(Roles.Teacher),
      forTeachersEducation: roles.includes(Roles.TeacherEducation),
      forTutor: roles.includes(Roles.Tutor),
    };

    // добавление теста необязательно
    if (data.testId) {
      newArticle.testId = data.testId;
    }

    postArticle(newArticle);
  });

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <form>
          <h1>Добавление статьи</h1>
          <div className={styles.nameBlock}>
            <div className={styles.input}>
              <TextField
                {...register('title')}
                label="Заголовок"
                helperText={errors.title?.message}
                error={!!errors.title}
                defaultValue=""
                fullWidth
              />
            </div>
            <div className={styles.input}>
              <TextField
                {...register('description')}
                label="Описание статьи"
                helperText={errors.description?.message}
                error={!!errors.description}
                defaultValue=""
                multiline
                rows={3}
                fullWidth
              />
            </div>
            <div className={styles.test}>
              <TextField
                {...register('testId')}
                label="Тест"
                helperText={errors.testId?.message}
                error={!!errors.testId}
                defaultValue=""
                fullWidth
                select
              >
                {getAllOptionsMUI(testOptions)}
              </TextField>
            </div>

            <div className={styles.selectBlock}>
              <p>Доступно ролям:</p>

              <CustomMultiSelect value={roles} onChange={e => removeDefaultRole(e)}>
                {rolesOptions.map(({ value, label }) => (
                  <StyledOption key={value} value={value}>
                    {label}
                  </StyledOption>
                ))}
              </CustomMultiSelect>
            </div>
          </div>
          <div>
            <p>Текст статьи</p>
            <p>* необходима хотя бы одна картинка в тексте. Она будет использоваться как превью.</p>
            <div className={styles.newsEditor}>
              <RichTextEditor />
            </div>
          </div>

          <ResultMessage successPost={isSuccessPost} onClick={onReadTheoryClick} />

          <div className={styles.error}>{isSuccessPost}</div>
          <div className={styles.newsBtn}>
            <Button onClick={onSubmit} disabled={isSubmitSuccessful}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddNewsPage;
