import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Grid } from '@mui/material';
import { RoleNames } from 'app/enums/RoleNames';
import { Roles } from 'app/enums/Roles';
import { StatusTypes } from 'app/enums/StatusTypes';
import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { Nullable } from 'app/types/Nullable';
import { OptionT } from 'app/types/OptionT';
import styles from 'components/article-editor/ArticleEditor.module.scss';
import { ResultMessage } from 'components/article-editor/ResultMessage/ResultMessage';
import Button from 'components/button/Button';
import { CustomMultiSelect } from 'components/multiSelect/CustomMultiSelect';
import { PlateEditor } from 'components/PlateEditor/PlateEditor';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { STATUS_MENU } from 'constants/selectMenu';
import React, { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertEnumInOptions } from 'utils/convertEnumInOptions';
import { convertArrayToNull, convertNullStringToNull, convertNullToArray } from 'utils/convertNull';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { filterSelectMenu } from 'utils/filterSelectMenu';
import * as yup from 'yup';

const ROLES_OPTIONS = [
  { value: 'null', label: 'Для ролей:' },
  ...convertEnumInOptions(RoleNames, [RoleNames.admin, RoleNames.parent, RoleNames.methodist]),
];

const SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required('Обязательно поле')
    .max(250, 'Максимум 250 символов')
    .matches(
      /^[a-zA-Zа-яёА-ЯЁ0-9 \-,./()"]+$/,
      'Допускаются символы латинские или кириллицы, числа, пробелы, двойные кавычки и знаки «-», «,», «.» , «/», «(», «)»',
    )
    .nullable(),
  description: yup.string(),
  testId: yup.string().nullable(),
  roles: yup.array(yup.string()).notRequired().nullable(),
  status: yup.string(),
  content: yup.array().required(),
});

export type ArticleFormT = {
  title: string;
  description: string;
  testId: Nullable<string>;
  roles: Nullable<string[]>;
  status: StatusTypes;
  content: any[];
};

type ArticleEditorFormProps = {
  testOptions: OptionT[];
  onReadTheoryClick: () => void;
  successPost: Nullable<string>;
  defaultValues: ArticleFormT;
  titleArticle: string;
  onSubmitForm: (data: ArticlePayloadT) => void;
  statusArticle: StatusTypes;
};

export const ArticleEditorForm = (props: ArticleEditorFormProps): ReactElement => {
  const {
    testOptions,
    successPost,
    onReadTheoryClick,
    defaultValues,
    titleArticle,
    onSubmitForm,
    statusArticle,
  } = props;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ArticleFormT>({ resolver: yupResolver(SCHEMA), defaultValues });

  const menu = filterSelectMenu(statusArticle, STATUS_MENU);

  const onSubmit = handleSubmit(data => {
    const { status, roles, testId, content, title, description } = data;

    const newDescription: ArticleDescriptionType = {
      type: 'description',
      text: description,
    };
    const newContent = [...content];

    newContent.push(newDescription); // добавление описания вне редактора

    const newArticle: ArticlePayloadT = {
      title,
      content: newContent,
      status,
      testId,
      forFranchisee: roles?.includes(Roles.Franchisee),
      forFranchiseeAdmin: roles?.includes(Roles.FranchiseeAdmin),
      forMethodist: true,
      forStudents: roles?.includes(Roles.Student),
      forTeachers: roles?.includes(Roles.Teacher),
      forTeachersEducation: roles?.includes(Roles.TeacherEducation),
      forTutor: roles?.includes(Roles.Tutor),
    };

    onSubmitForm(newArticle);
  });

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <form>
          <h1 className={styles.title}>{titleArticle}</h1>
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
                    disabled={statusArticle !== StatusTypes.draft}
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
                    options={menu}
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
                    disabled={statusArticle !== StatusTypes.draft}
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
                    disabled={statusArticle !== StatusTypes.draft}
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
                    disabled={statusArticle !== StatusTypes.draft}
                  />
                )}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>*первая картинка будет использоваться как превью.</p>
              <p>*менять данные можно только в статьях со статусом черновик.</p>
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
                    readOnly={statusArticle !== StatusTypes.draft}
                    hiddenToolbar={statusArticle !== StatusTypes.draft}
                  />
                )}
                control={control}
              />

              <ResultMessage successPost={successPost} onClick={onReadTheoryClick} />

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
};
