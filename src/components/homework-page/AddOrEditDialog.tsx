import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import gamesStore from 'app/stores/gamesStore';
import { GamePresetT } from 'app/types/GameTypes';
import { SetGameHomework } from 'components/homework-page/setGameHomeWork/SetGameHomework';
import { observer } from 'mobx-react';
import { useState } from 'react';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';

import { HomeworkStore } from './stores';

import Button from 'components/button/Button';
import { ShortStatusEnum, StatusEnum } from 'app/enums/StatusTypes';
import { getOptionMui } from 'utils/getOption';

interface AddOrEditDialogProps {
  store: HomeworkStore;
}

const statusTypesKeys = Object.keys(StatusEnum);

export const AddOrEditDialog = observer((props: AddOrEditDialogProps) => {
  const { store } = props;
  const { newPresets } = gamesStore;

  const [chooseGame, setChooseGame] = useState<boolean>(false);

  const statusTypesOptions = Object.values(
    store.oneWork?.work?.id ? StatusEnum : ShortStatusEnum,
  ).map((el, index) => getOptionMui(statusTypesKeys[index], el));

  const getPresetGame = (gamePresetId: string) => {
    store?.presetsThisWork?.push(gamePresetId);
    setChooseGame(false);
  };

  const getNamePreset = (id: string) => {
    const preset = newPresets.items.filter(pr => pr.id === id);
    return preset[0]?.name;
  };
  const getNameGamePreset = (id: string) => {
    const preset = newPresets.items.filter(pr => pr.id === id);
    return preset[0]?.game.name;
  };

  const deleteOnePreset = (id: string) => {
    store.presetsThisWork = store?.presetsThisWork.filter(prId => prId !== id);
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
        },
      }}
      maxWidth="md"
      fullWidth
      onClose={store.closeDialog}
      open={store.isDialogOpen}
    >
      <SetGameHomework
        getPresetGame={getPresetGame}
        open={chooseGame}
        onClose={() => setChooseGame(false)}
      />
      <DialogTitle onClose={store.closeDialog}>
        {store.oneWork?.work?.id
          ? 'Редактирование домашнего задания'
          : 'Добавление нового домашнего задания'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={store.oneWork.work.title}
                onChange={({ currentTarget: { value } }) => (store.oneWork.work.title = value)}
                fullWidth
                variant="outlined"
                size="small"
                error={!store.validateSchema.fields.title.isValidSync(store.oneWork.work.title)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={store.oneWork.work.status}
                  label="Статус"
                  onChange={({ target: { value } }) => (store.oneWork.work.status = value)}
                  error={!store.validateSchema.fields.status.isValidSync(store.oneWork.work.status)}
                >
                  {statusTypesOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Описание"
                value={store.oneWork.work.text}
                onChange={({ currentTarget: { value } }) => (store.oneWork.work.text = value)}
                fullWidth
                variant="outlined"
                size="medium"
                error={!store.validateSchema.fields.text.isValidSync(store.oneWork.work.text)}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    '& > th': {
                      backgroundColor: '#2e8dfd',
                      color: '#fff',
                      verticalAlign: 'top',
                    },
                  }}
                >
                  <TableCell>Игра</TableCell>
                  <TableCell>Шаблон</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => {}}
                      sx={{
                        color: '#fff',
                      }}
                    >
                      <AddIcon onClick={() => setChooseGame(true)} fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.presetsThisWork ? (
                  (store.presetsThisWork || []).map((preset, id) => (
                    <TableRow
                      key={`${preset}${id}`}
                      hover
                      sx={{
                        '& > td': {
                          verticalAlign: 'top',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography>{getNameGamePreset(preset) || ''}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{getNamePreset(preset) || ''}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => deleteOnePreset(preset)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>Данные отсутствуют...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="primary"
          onClick={store.addOrEdit}
          disabled={
            !store.validateSchema.isValidSync(store.oneWork.work) ||
            store.oneWork?.work?.status === 'active'
          }
        >
          {store.oneWork?.work?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
