import { FormControl, Grid } from '@mui/material';
import Button from 'components/button/Button';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import styles from 'components/schedule/Schedule.module.scss';
import CustomDatePicker from 'components/tariff-page/customDatePicker';
import React, { FC, useState } from 'react';
import { Navigate, ToolbarProps } from 'react-big-calendar';

export const Toolbar: FC<ToolbarProps> = props => {
  const { onNavigate, date, children } = props;
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(new Date());

  const onNavigateDate = (newDate: Date | undefined) => {
    onNavigate(Navigate.DATE, newDate);
    // @ts-ignore
    setDatePickerValue(newDate);
  };

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarFlexWrapper}>
        {children}
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 3, md: 1, lg: 1 }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md>
            <FormControl fullWidth>
              <CustomDatePicker value={datePickerValue} setValue={onNavigateDate} label="Дата" />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('PREV', date)}>
                Предыдущая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('TODAY', date)}>
                Текущая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('NEXT', date)}>
                Следующая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <Button size="middle">Найти</Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <AddEditGroup />
    </div>
  );
};
