import React, { FC, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';

import { StatusTypes } from 'app/enums/StatusTypes';
import Button from 'components/button/Button';
import { BaseGameSettingsType } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import styles from 'components/game-page/GameCommon/GameModal/gameModal.module.scss';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';

import { GROUP_LEVEL_MENU, STATUS_MENU } from 'constants/selectMenu';

import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';
import { filterSelectMenu } from 'utils/filterSelectMenu';

type BaseFormGameSettingsType = {
  children: ReactNode;
  usedInWorks: any[];
  status: StatusTypes;
  deletedPreset: () => void;
  createCopy: () => void;
  gameName: string;
};

export const BaseFormGameSettings: FC<BaseFormGameSettingsType> = ({
  usedInWorks,
  children,
  status,
  deletedPreset,
  createCopy,
  gameName,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BaseGameSettingsType>();

  const menu = filterSelectMenu(
    status === StatusTypes.copiyed ? StatusTypes.draft : status,
    STATUS_MENU,
  );

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
                      title="Статус"
                      options={menu}
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
        <div className={styles.btnBlock_submit}>
          {status === 'active' && <span>Нельзя изменять активные настройки</span>}
          {status && status !== 'copiyed' && (
            <div className={styles.btnAddCopyBlock}>
              <Button variant="addExel" size="small" onClick={createCopy}>
                Создать копию
              </Button>
            </div>
          )}

          <Button type="submit" disabled={status === 'active'}>
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
};
