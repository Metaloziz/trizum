import {
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  TableRow,
  Table,
} from '@mui/material';
import Button from '@mui/material/Button';
import { ChildrenResponse } from 'app/types/ChildrenResponse';
import React, { FC } from 'react';
import style from './ParentChildren.module.scss';

type Props = {
  childrenArr: ChildrenResponse[];
  setIsOpenAddChildModal: (value: boolean) => void;
};

export const ParentChildren: FC<Props> = ({ childrenArr, setIsOpenAddChildModal }) => (
  <div className={style.container}>
    {childrenArr.length ? (
      <>
        <h2>Дети</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#0072e5' }}>
              <TableRow>
                <TableCell sx={{ color: '#ffffff' }} align="center">
                  ФИО
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childrenArr.map(child => (
                <TableRow key={child.id}>
                  <TableCell align="center">
                    {child.firstName} {child.middleName} {child.lastName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    ) : (
      <h2>Нету детей</h2>
    )}

    <Button className={style.button} onClick={() => setIsOpenAddChildModal(true)}>
      Добавить ребёнка
    </Button>
  </div>
);
