import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from 'components/button/Button';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import tariffsStore from '../../app/stores/tariffsStore';

export const newStatus = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активный' },
  { value: 'archive', label: 'Не активен' },
  { value: 'hidden', label: 'Заблокированный' },
];

type RateChoicePropsType = {
  setCurrentPage: (value: number) => void;
};

const RateChoice: FC<RateChoicePropsType> = observer(({ setCurrentPage }) => {
  const { setFilters } = tariffsStore;
  const [lengthFrom, setLengthFrom] = useState('');
  const [lengthTo, setLengthTo] = useState('');
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [status, setStatus] = useState('active');
  const [input, setInput] = useState('');
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const searchHandler = () => {
    if (input.length) {
      if (input.length >= 3 && input.length <= 30) {
        setFilters({
          dateFrom: dateFrom ?? '',
          dateTo: dateTo ?? '',
          status,
          lengthFrom,
          lengthTo,
          input,
        });
        setCurrentPage(1);
      } else {
        // eslint-disable-next-line no-alert
        alert('Наименование тарифа должно быть от 3 до 30 символов');
      }
    } else {
      setFilters({
        dateFrom: dateFrom ?? '',
        dateTo: dateTo ?? '',
        status,
        lengthFrom,
        lengthTo,
        input,
      });
      setCurrentPage(1);
    }
  };

  const resetHandler = () => {
    setLengthTo('');
    setLengthFrom('');
    setDateTo(null);
    setDateFrom(null);
    setStatus('active');
    setInput('');
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: 'active',
      lengthFrom: '',
      lengthTo: '',
      input: '',
    });
    setCurrentPage(1);
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 3 }}>
      <Accordion
        expanded={isOpenFilters}
        onChange={(_, expanded) => setIsOpenFilters(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                value={input}
                label="Наименование тарифа/код тарифа"
                onChange={({ currentTarget: { value } }) => setInput(value)}
              />
            </Grid>

            {/* скрыл из-за бага 329 */}

            {/* <Grid item xs={12} sm={4}> */}
            {/*  <FormControl fullWidth> */}
            {/*    <InputLabel id="select-status">Статус</InputLabel> */}
            {/*    <Select */}
            {/*      onChange={({ target: { value } }) => setStatus(value)} */}
            {/*      label="Статус" */}
            {/*      id="select-status" */}
            {/*      labelId="select-status" */}
            {/*      defaultValue="active" */}
            {/*      // size="small" */}
            {/*      value={status} */}
            {/*    > */}
            {/*      {newStatus.map(m => ( */}
            {/*        <MenuItem key={m.value} value={m.value}> */}
            {/*          {m.label} */}
            {/*        </MenuItem> */}
            {/*      ))} */}
            {/*    </Select> */}
            {/*  </FormControl> */}
            {/* </Grid> */}
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                value={lengthFrom}
                label="Стоимость от"
                onChange={({ currentTarget: { value } }) => setLengthFrom(value)}
                inputProps={{ type: 'number' }}
              />
              <TextField
                fullWidth
                value={lengthTo}
                label="Стоимость до"
                onChange={({ currentTarget: { value } }) => setLengthTo(value)}
                inputProps={{ type: 'number' }}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                value={dateFrom}
                onChange={setDateFrom}
                toolbarPlaceholder="Дата начала"
                renderInput={props => (
                  <TextField
                    sx={{ width: '48%' }}
                    {...props}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: 'Дата начала действия',
                    }}
                  />
                )}
              />
              <DatePicker
                value={dateTo}
                onChange={setDateTo}
                toolbarPlaceholder="Дата окончания"
                renderInput={props => (
                  <TextField
                    sx={{ width: '48%' }}
                    {...props}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: 'Дата окончания действия',
                    }}
                  />
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
            <Button onClick={searchHandler}>Применить</Button>
            <Button onClick={() => tariffsStore.openDialog()}>Добавить</Button>
            <Button onClick={resetHandler}>Сбросить</Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});
export default RateChoice;
