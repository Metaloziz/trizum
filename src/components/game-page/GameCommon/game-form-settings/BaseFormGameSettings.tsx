import { Grid, Stack } from '@mui/material';
import { GroupLevels, GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusEnum, StatusTypes } from 'app/enums/StatusTypes';
import Button from 'components/button/Button';
import { BaseGameSettingsType } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import CustomSelect, { Option } from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import React, { ReactElement, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';

const GROUP_LEVEL_MENU: Option[] = [
  { value: GroupsLevelsValue.easy, label: GroupLevels.easy },
  { value: GroupsLevelsValue.medium, label: GroupLevels.medium },
  { value: GroupsLevelsValue.hard, label: GroupLevels.hard },
];

const STATUS_MENU: Option[] = [
  { value: StatusTypes.draft, label: StatusEnum.draft },
  { value: StatusTypes.active, label: StatusEnum.active },
  { value: StatusTypes.removal, label: StatusEnum.removal },
  { value: StatusTypes.archive, label: StatusEnum.archive },
];

type BaseFormGameSettingsType = {
  children: ReactNode;
  usedInWorks: any[];
  status: StatusTypes;
  deletedPreset: () => void;
  gameName: string;
};

export const BaseFormGameSettings = (props: BaseFormGameSettingsType): ReactElement => {
  const { usedInWorks, children, status, deletedPreset, gameName } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<BaseGameSettingsType>();

  return (
    <>
      <Stack spacing={1}>
        <div className={styles.gameModalWrapper}>
          <div className={styles.gameModalWrapper_settings}>
            <Grid direction="row" container spacing={2} marginBottom={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  render={({ field: { value, onChange, ref } }) => (
                    <TextFieldCustom
                      type="text"
                      label="Наименование шаблона"
                      size="small"
                      fullWidth
                      error={errors.name?.message}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                    />
                  )}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="level"
                  render={({ field: { onChange, value, ref } }) => (
                    <CustomSelect
                      size="small"
                      value={value}
                      onChange={onChange}
                      title="Уровень"
                      options={GROUP_LEVEL_MENU}
                      error={errors.level?.message}
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

              {children}
            </Grid>
          </div>

          <div className={styles.descriptionBlock}>
            <span className={styles.descriptionBlock_header}>{gameName}</span>
            <Grid item xs={12} sm={6}>
              <Controller
                name="description"
                render={({ field: { value, onChange, ref } }) => (
                  <TextFieldCustom
                    type="text"
                    label="Описание"
                    size="medium"
                    fullWidth
                    error={errors.description?.message}
                    onChange={event => onChange(convertEmptyStringToNull(event))}
                    value={convertNullToEmptyString(value!)}
                    ref={ref}
                  />
                )}
                control={control}
              />
            </Grid>
          </div>
        </div>
      </Stack>

      <div className={styles.btnBlock}>
        <div className={styles.btnBlock_btn}>
          {status === 'archive' && <span>Не возможно удалить архивные настройки</span>}
          {!!usedInWorks?.length && <span>Настройки используются в домашнем задании</span>}
          <Button
            onClick={deletedPreset}
            variant="reset"
            disabled={status === 'archive' || !!usedInWorks?.length}
          >
            Удалить настройки
          </Button>
        </div>
        <div className={styles.btnBlock_btn}>
          {status === 'active' && <span>Нельзя изменять активные настройки</span>}
          <Button type="submit" disabled={status === 'active'}>
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
};
