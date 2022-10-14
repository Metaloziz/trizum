import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { GroupLevels, GroupsLevelsValue } from 'app/enums/GroupLevels';
import moment from 'moment';
import { Moment } from 'moment/moment';
import React, { useState, FC, useEffect } from 'react';
import { FilterData } from '../../app/types/FilterData';
import { SearchCoursesParamsType } from '../../app/types/SearchCoursesParamsType';
import { getNextDay } from '../../utils/getNextDay';

type FilterProps = {
  setSearchCoursesParams: (filter: Partial<SearchCoursesParamsType> | null) => void;
  filterData: FilterData;
  isOpenFilter: boolean;
  setIsOpenFilter: (value: boolean) => void;
};

export const Filter: FC<FilterProps> = ({
  filterData,
  setSearchCoursesParams,
  setIsOpenFilter,
  isOpenFilter,
}) => {
  const defaultFilter: FilterData = {
    title: filterData.title,
    level: filterData.level,
    created_since: filterData.created_since,
    created_until: filterData.created_until,
  };

  const [filter, setFilter] = useState<FilterData>(defaultFilter);

  const [createdSince, setCreatedSince] = useState<Moment | null>(null);

  useEffect(() => {
    setCreatedSince(moment(filterData.created_since, 'DD.MM.YYYY'));
  }, [filterData.created_since]);

  const applyFilter = () => {
    const defaultParams = new SearchCoursesParamsType();
    setSearchCoursesParams({ ...defaultParams, ...filter });
  };

  const clearFilter = () => {
    setSearchCoursesParams(null);
  };

  const handleChangeCreatedSince = (newValue: Moment | null) => {
    if (newValue && newValue?.format() !== 'Invalid date') {
      setCreatedSince(newValue);

      const newDate = {
        created_since: newValue.format('DD.MM.YYYY'),
        created_until: getNextDay(newValue),
      };

      setFilter({ ...filter, ...newDate });
    }

    // если удалить дату вручную
    if (newValue?.format() === 'Invalid date') {
      setFilter({ ...filter, created_until: '', created_since: '' });
    }
  };

  return (
    <Box>
      <Accordion
        expanded={isOpenFilter}
        onChange={(_, expanded) => setIsOpenFilter(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Наименование"
                value={filter.title}
                onChange={({ target: { value } }) => setFilter({ ...filter, title: value })}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={filter.level}
                  label="Уровень"
                  onChange={({ target: { value } }) => setFilter({ ...filter, level: value })}
                >
                  <MenuItem value="">Не выбрано</MenuItem>
                  <MenuItem value={GroupsLevelsValue.easy}>{GroupLevels.easy}</MenuItem>
                  <MenuItem value={GroupsLevelsValue.medium}>{GroupLevels.medium}</MenuItem>
                  <MenuItem value={GroupsLevelsValue.hard}>{GroupLevels.hard}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DesktopDatePicker
                label="Дата создания"
                inputFormat="DD.MM.YYYY"
                value={createdSince}
                onChange={handleChangeCreatedSince}
                renderInput={({ error, ...params }) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            sx={{
              width: '100%',
              px: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<SearchIcon fontSize="small" />}
              onClick={applyFilter}
              sx={{
                alignSelf: 'flex-end',
                backgroundColor: '#2e8dfd',
              }}
            >
              Применить
            </Button>
            <Button
              size="small"
              startIcon={<ClearIcon fontSize="small" />}
              onClick={clearFilter}
              sx={{
                alignSelf: 'flex-end',
              }}
              color="error"
            >
              Сбросить
            </Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
