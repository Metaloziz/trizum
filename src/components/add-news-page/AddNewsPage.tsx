import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { AppRoutes } from 'app/enums/AppRoutes';
import { RoleNames } from 'app/enums/RoleNames';
import { StatusTypes } from 'app/enums/StatusTypes';
import { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { Nullable } from 'app/types/Nullable';
import { ResultMessage } from 'components/add-news-page/ResultMessage/ResultMessage';
import Button from 'components/button/Button';
import { CustomMultiSelect } from 'components/multiSelect/CustomMultiSelect';
import { PlateEditor } from 'components/PlateEditor/PlateEditor';
import { MyParagraphElement } from 'components/PlateEditor/types';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { STATUS_MENU } from 'constants/selectMenu';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { convertEnumInOptions } from 'utils/convertEnumInOptions';
import { convertArrayToNull, convertNullStringToNull, convertNullToArray } from 'utils/convertNull';
import { convertTestOptions } from 'utils/convertTestOptions';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import * as yup from 'yup';
import styles from './AddNewsPage.module.scss';

const ROLES_OPTIONS = [
  { value: 'null', label: 'Для ролей:' },
  ...convertEnumInOptions(RoleNames, [RoleNames.admin, RoleNames.parent]),
];

const SCHEMA = yup.object().shape({
  title: yup.string().required('Обязательно поле'),
  description: yup.string(),
  testId: yup.string().nullable(),
  roles: yup.array(yup.string()).notRequired().nullable(),
  status: yup.string(),
  content: yup.array().required(),
});

type ArticleFormT = {
  title: string;
  description: string;
  testId: Nullable<string>;
  roles: string[];
  status: StatusTypes;
  content: any[];
};

const AddNewsPage = observer(() => {
  const { tests, setTests, setSearchParams } = testsStore;
  const { successPost, article, setDefaultIsSuccessPost } = articlesStore;

  const testOptions = convertTestOptions(tests);

  useEffect(() => {
    setSearchParams({ per_page: 1000 });
    setDefaultIsSuccessPost();
    setTests();
  }, []);

  const defaultValues: ArticleFormT = {
    roles: ['null'],
    description: '',
    title: '',
    testId: null,
    status: StatusTypes.draft,
    content: [{ type: 'p', children: [{ text: '' }] } as MyParagraphElement],
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ArticleFormT>({ resolver: yupResolver(SCHEMA), defaultValues });

  const navigate = useNavigate();

  const onReadTheoryClick = (): void => {
    navigate(`${AppRoutes.Blog}/${article?.title}`);
  };

  const onSubmit = handleSubmit(data => {
    const { status, roles, testId, content, title, description } = data;
    const newDescription: ArticleDescriptionType = {
      type: 'description',
      text: description,
    };

    content.push(newDescription); // добавление описания вне редактора

    const newArticle: ArticlePayloadT = {
      title,
      content,
      status,
      testId,
      forFranchisee: roles.includes(Roles.Franchisee),
      forFranchiseeAdmin: roles.includes(Roles.FranchiseeAdmin),
      forMethodist: roles.includes(Roles.Methodist),
      forStudents: roles.includes(Roles.Student),
      forTeachers: roles.includes(Roles.Teacher),
      forTeachersEducation: roles.includes(Roles.TeacherEducation),
      forTutor: roles.includes(Roles.Tutor),
    };

    // postArticle(newArticle);
  });

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <form>
          <h1 className={styles.title}>Добавление статьи</h1>
          <Grid direction="row" container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    className={styles.input}
                    sx={{ backgroundColor: 'white' }}
                    type="text"
                    label="Заголовок"
                    size="small"
                    fullWidth
                    error={errors.title?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value}
                    sx={{ backgroundColor: 'white' }}
                    onChange={onChange}
                    title="Уровень"
                    options={STATUS_MENU}
                    error={errors.status?.message}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="testId"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    size="small"
                    value={value || ''}
                    sx={{ backgroundColor: 'white' }}
                    onChange={event => onChange(convertNullStringToNull(event))}
                    title="Тест"
                    options={testOptions}
                    error={errors.testId?.message}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="roles"
                render={({ field: { onChange, value: valueField } }) => (
                  <CustomMultiSelect
                    onChange={event => {
                      onChange(convertArrayToNull(event));
                    }}
                    value={convertNullToArray(valueField)}
                    classNameContainer={styles.statusField}
                    placeholder="Доступно ролям"
                    options={ROLES_OPTIONS}
                    error={errors.roles?.message}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="description"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    type="text"
                    sx={{ backgroundColor: 'white' }}
                    label="Описание статьи"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                    error={errors.description?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>*первая картинка будет использоваться как превью.</p>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="content"
                render={({ field: { onChange, value } }) => (
                  <PlateEditor
                    value={value}
                    onChange={onChange}
                    className={styles.editor}
                    placeholder="Текст статьи..."
                  />
                )}
                control={control}
              />

              <ResultMessage successPost={!!successPost} onClick={onReadTheoryClick} />

              <div className={styles.error}>{successPost}</div>
              <div className={styles.newsBtn}>
                <Button onClick={onSubmit} disabled={isSubmitSuccessful}>
                  Сохранить
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
});

export default AddNewsPage;
