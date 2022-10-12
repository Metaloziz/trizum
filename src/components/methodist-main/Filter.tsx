import { useMemo, useState } from 'react';

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
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ru from 'dayjs/locale/ru';
import { observer } from 'mobx-react';

import { MethodistMainFilterViewModel } from './models/MethodistMainFilterViewModel';

import { GroupLevels } from 'app/enums/GroupLevels';
import { Nullable } from 'app/types/Nullable';
import { Moment } from 'moment';
import { RequestCoursesForFilter } from 'app/viewModels/CourseViewModel';
import { MethodistMainStore } from './stores';

interface FilterProps {
  onChange: (filter: Nullable<MethodistMainFilterViewModel>) => void;
}

export const Filter = observer((props: FilterProps) => {
  const _defaultFilter = (): MethodistMainFilterViewModel => ({
    title: '',
    level: '',
    createdAt: null,
  });
  const store = useMemo(() => new MethodistMainStore(), []);
  const {setSearchCoursesParams} =  store
  const [filter, setFilter] = useState(_defaultFilter());
    
  const [open, setOpen] = useState(false);

  const applyFilter = () => {
    props.onChange(filter);
  };

  const clearFilter = () => {
    setOpen(false);
    setFilter(_defaultFilter());
    props.onChange(null);
  };

const [title,setTitle]=useState('');
const [level,setLevel]=useState('');
const [createdData, setCreatedData] = useState<Moment | null>(null);

 const levelHomeWork:{[key:string]:string} = {
  'Младшая группа':'easy',
  'Средняя группа':'medium',
  'Старшая группа':'hard',
}

const handleSetLevel = ({ target: { value } }: SelectChangeEvent) => {
  setLevel(value);
};

const handleSetCreatedData = (newValue: Moment | null) => {
  setCreatedData(newValue);
};

  const onSearchClick = () => {
    
    let createdDataSince;
    if (createdData) {
      createdDataSince = createdData.format('DD.MM.YYYY');
    }
   
    const params:RequestCoursesForFilter={
      createdSince: createdDataSince,
      title,
      level,
      page:0
    }

    if(params.level){params.level=levelHomeWork[params.level]}
    setSearchCoursesParams(params)
  }
 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru}>
      <Box>
        <Accordion
          expanded={open}
          onChange={(_, expanded) => setOpen(expanded)}
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
                  value={title}
                  onChange={e=>setTitle(e.target.value.trim())}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Уровень</InputLabel>
                  <Select
                    value={level}
                    label="Уровень"
                    onChange={handleSetLevel}
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    <MenuItem value={GroupLevels.easy}>{GroupLevels.easy}</MenuItem>
                    <MenuItem value={GroupLevels.medium}>{GroupLevels.medium}</MenuItem>
                    <MenuItem value={GroupLevels.hard}>{GroupLevels.hard}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Дата создания"
                  inputFormat="DD.MM.YYYY"
                  mask="ДД.ММ.ГГГГ"
                  value={createdData}
                  onChange={handleSetCreatedData}
                  renderInput={params => <TextField {...params} variant="outlined" size="small" fullWidth />}
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
                // onClick={applyFilter}
                onClick={onSearchClick}
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
});
