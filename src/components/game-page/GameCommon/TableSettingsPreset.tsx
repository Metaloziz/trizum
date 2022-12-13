import {
  Box,
  FormControlLabel,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { GroupLevels } from 'app/enums/GroupLevels';
import { StatusEnum } from 'app/enums/StatusTypes';
import { GamePresetT } from 'app/types/GameTypes';
import { Nullable } from 'app/types/Nullable';
import Button from 'components/button/Button';

import React, { ReactElement, useState } from 'react';

type Props = {
  gamePresets: Omit<GamePresetT, 'settings'>[];
  page: number;
  total: number;
  perPage: number;
  stopGame?: () => void;
  setPreset: (value: string) => void;
  changePage: (page: number) => void;
  openModal: () => void;
};

export const TableSettingsPreset = ({
  gamePresets,
  page,
  total,
  perPage,
  setPreset,
  stopGame,
  changePage,
  openModal,
}: Props): ReactElement => {
  const [value, setValue] = useState<Nullable<string>>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    stopGame && stopGame();
    setPreset((event.target as HTMLInputElement).value);
  };

  const onAddSample = () => {
    stopGame && stopGame();
    setPreset('newSample');
    openModal();
    setValue(null);
  };

  const onChangePageClick = (event: React.ChangeEvent<unknown>, pageNum: number) => {
    changePage(pageNum - 1);
  };

  return (
    <div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <TableContainer
          component={Paper}
          sx={{ mt: 12, ml: 2, mr: 2, width: '95%', display: 'flex', alignItems: 'center' }}
        >
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
                <TableCell width={1} />
                <TableCell>Название шаблона</TableCell>
                <TableCell align="center">Уровень</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="center">Дата создания</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gamePresets.map(({ status, level, name, createdAt, id }) => (
                <>
                  <TableRow
                    key={id}
                    hover
                    sx={{
                      '& > td': {
                        verticalAlign: 'top',
                      },
                    }}
                  >
                    <TableCell width={1}>
                      <FormControlLabel key={id} value={id} control={<Radio />} label="" />
                    </TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="center">{GroupLevels[level]}</TableCell>
                    <TableCell align="center">{StatusEnum[status]}</TableCell>
                    <TableCell align="center">
                      {new Date(createdAt!.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        <Pagination
          count={Math.ceil(total / perPage)}
          color="primary"
          page={page + 1}
          onChange={onChangePageClick}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '16px',
        }}
      >
        <Button disabled={value === null} onClick={openModal}>
          Изменить настройки
        </Button>
        <Button onClick={onAddSample}>Добавить настройки</Button>
      </Box>
    </div>
  );
};
