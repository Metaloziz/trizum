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

  const [chooseGame, setChooseGame] = useState<boolean>(false);
  const statusTypesOptions = Object.values(
    store.editingEntity?.id ? StatusEnum : ShortStatusEnum,
  ).map((el, index) => getOptionMui(statusTypesKeys[index], el));
  const getPresetGame = (gamePreset: GamePresetT) => {
    setChooseGame(false);
    store.editingEntity?.gamePresets.push(gamePreset);
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
        {store.editingEntity?.id
          ? 'Редактирование домашнего задания'
          : 'Добавление нового домашнего задания'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Наименование"
                value={store.editingEntity.title}
                onChange={({ currentTarget: { value } }) => (store.editingEntity.title = value)}
                fullWidth
                variant="outlined"
                size="small"
                error={!store.validateSchema.fields.title.isValidSync(store.editingEntity.title)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Описание"
                value={store.editingEntity.text}
                onChange={({ currentTarget: { value } }) => (store.editingEntity.text = value)}
                fullWidth
                variant="outlined"
                size="small"
                error={!store.validateSchema.fields.text.isValidSync(store.editingEntity.text)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={store.editingEntity.status}
                  label="Статус"
                  onChange={({ target: { value } }) => (store.editingEntity.status = value)}
                  error={
                    !store.validateSchema.fields.status.isValidSync(store.editingEntity.status)
                  }
                >
                  {statusTypesOptions}
                </Select>
              </FormControl>
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
                {/* TODO: доделать */}
                {(store.editingEntity.gamePresets || []).length > 0 ? (
                  (store.editingEntity.gamePresets || []).map(preset => (
                    <TableRow
                      key={preset.id}
                      hover
                      sx={{
                        '& > td': {
                          verticalAlign: 'top',
                        },
                      }}
                    >
                      <TableCell />
                      <TableCell />
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => {}} color="error">
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
          disabled={!store.validateSchema.isValidSync(store.editingEntity)}
        >
          {store.editingEntity?.id ? 'Изменить' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
