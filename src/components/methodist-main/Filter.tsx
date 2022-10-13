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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { GroupLevels, GroupsLevelsValue } from 'app/enums/GroupLevels';
import ru from 'dayjs/locale/ru';
import { useState, FC } from 'react';
import { FilterData } from '../../app/types/FilterData';
import { SearchCoursesParamsType } from '../../app/types/SearchCoursesParamsType';

type FilterProps = {
  setSearchCoursesParams: (filter: Partial<SearchCoursesParamsType> | null) => void;
  filterData: FilterData;
};

export const Filter: FC<FilterProps> = ({ filterData, setSearchCoursesParams }) => {
  const defaultFilter: FilterData = {
    title: filterData.title,
    level: filterData.level,
    created_since: '',
  };

  const [filter, setFilter] = useState<FilterData>(defaultFilter);

  const applyFilter = () => {
    setSearchCoursesParams(filter);
  };

  const clearFilter = () => {
    setSearchCoursesParams(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru}>
      <Box>
        <Accordion
          // expanded={open}
          expanded
          // onChange={(_, expanded) => setOpen(expanded)}
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
                {/* <DatePicker */}
                {/*  label="Дата создания" */}
                {/*  inputFormat="DD.MM.YYYY" */}
                {/*  mask="ДД.ММ.ГГГГ" */}
                {/*  value={filter.createdAt} */}
                {/*  onChange={date => setFilter(prev => ({ ...prev, createdAt: date }))} */}
                {/*  renderInput={params => ( */}
                {/*    <TextField {...params} variant="outlined" size="small" fullWidth /> */}
                {/*  )} */}
                {/* /> */}
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
    </LocalizationProvider>
  );
};
