import { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { observer } from 'mobx-react';

import Button from '../button/Button';

import { numberWithoutLeadingZero } from './helpers/numberWithoutLeadingZero';
import { FranchisingFilterViewModel } from './models/FranchisingFilterViewModel';

import { Nullable } from 'app/types/Nullable';

interface FilterProps {
  onChange: (filter: Nullable<FranchisingFilterViewModel>) => void;
}

export const Filter = observer((props: FilterProps) => {
  const _defaultFilter = (): FranchisingFilterViewModel => ({
    email: '',
    // fullName: '',
    shortName: '',
    inn: '',
    city: '',
    phone: null!,
    checkingAccount: '',
  });

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

  const onChangePhone = (value: string) => {
    setFilter(prev => ({
      ...prev,
      phone: !value ? null! : parseInt(value.replace(/\D/g, ''), 10),
    }));
  };

  return (
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
            {/* line 1 */}
            {/*    <Grid item xs={12} sm={4}>
              <TextField
                label="Полное наименование"
                value={filter.fullName}
                onChange={({ target: { value } }) =>
                  setFilter(prev => ({ ...prev, fullName: value }))
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Номер счета"
                value={filter.checkingAccount}
                onChange={({ target: { value } }) =>
                  numberWithoutLeadingZero(value, () =>
                    setFilter(prev => ({ ...prev, checkingAccount: value })),
                  )
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MuiPhoneNumber
                label="Телефон"
                value={filter.phone}
                onChange={value => onChangePhone(value as string)}
                defaultCountry="ru"
                onlyCountries={['ru']}
                variant="outlined"
                fullWidth
                size="small"
                countryCodeEditable={false}
              />
            </Grid>
            {/* line 2 */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Короткое наименование"
                value={filter.shortName}
                onChange={({ target: { value } }) =>
                  setFilter(prev => ({ ...prev, shortName: value }))
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="E-mail"
                value={filter.email}
                onChange={({ target: { value } }) => setFilter(prev => ({ ...prev, email: value }))}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="ИНН"
                value={filter.inn}
                onChange={({ target: { value } }) =>
                  numberWithoutLeadingZero(value, () =>
                    setFilter(prev => ({ ...prev, inn: value })),
                  )
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            {/* line 3 */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Город"
                value={filter.city}
                onChange={({ target: { value } }) => setFilter(prev => ({ ...prev, city: value }))}
                fullWidth
                variant="outlined"
                size="small"
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
            <Button size="small" onClick={applyFilter}>Применить</Button>
            <Button size="small" variant="reset" onClick={clearFilter}>
              Сбросить
            </Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});
