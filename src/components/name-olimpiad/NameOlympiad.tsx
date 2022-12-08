import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GroupLevels } from 'app/enums/GroupLevels';
import Button from 'components/button/Button';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { getOptionMui } from 'utils/getOption';
import groupStore from 'app/stores/groupStore';

import styles from './NameOliypiad.module.scss';

type Props = {
  isEditRole: boolean;
  addOlympiad: () => void;
};

const levelOptionsNames = Object.values(GroupLevels);
const levelOptions = Object.keys(GroupLevels).map((el, idx) =>
  getOptionMui(el.toLowerCase(), levelOptionsNames[idx]),
);

const NameOlympiad: FC<Props> = observer(({ isEditRole, addOlympiad }) => {
  const { queryFieldsOlympiads, clearOlympiadQueryFields, getOlympiadGroups } = groupStore;

  const searchHandler = async () => {
    queryFieldsOlympiads.page = 0;
    await getOlympiadGroups();
  };

  const resetHandler = () => {
    clearOlympiadQueryFields();
  };

  /* temp */
  const [open, setOpen] = useState(false);
  /* temp */

  return (
    <Box sx={{ marginTop: 2 }}>
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
                fullWidth
                value={queryFieldsOlympiads.name}
                label="Название"
                onChange={({ currentTarget: { value } }) => (queryFieldsOlympiads.name = value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="level-search">Уровень</InputLabel>
                <Select
                  labelId="level-search"
                  label="Уровень"
                  value={queryFieldsOlympiads.level}
                  onChange={({ target: { value } }) => (queryFieldsOlympiads.level = value)}
                >
                  {levelOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                label="Дата начала"
                onChange={value => value && (queryFieldsOlympiads.dateSince = new Date(value))}
                value={queryFieldsOlympiads.dateSince ? queryFieldsOlympiads.dateSince : new Date()}
                toolbarPlaceholder="Дата с"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                label="Дата окончания"
                onChange={value => {
                  value && (queryFieldsOlympiads.dateUntil = new Date(value));
                }}
                value={queryFieldsOlympiads.dateUntil ? queryFieldsOlympiads.dateUntil : new Date()}
                toolbarPlaceholder="Дата по"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
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
              marginTop: '10px',
            }}
          >
            <Button onClick={searchHandler}>Применить</Button>
            <Button onClick={resetHandler}>Сбросить</Button>
            {isEditRole && (
              <div className={styles.addOlympiad}>
                <Button onClick={addOlympiad}>Добавить</Button>
              </div>
            )}
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});

export default NameOlympiad;
