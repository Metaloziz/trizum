import React, { FC } from 'react';

import styles from './ResultTable.module.scss';

import { resultTableData } from 'components/moks-data/mock-data-resultTable';
import TableHeader from 'components/molecules/ResultTable/TableHeader';
import TableRow from 'components/molecules/ResultTable/TableRow/TableRow';

type Props = {};

const dates: string[] = [];

for (let i = 1; i <= 30; i++) {
  dates.push(i.toString());
}

const mock = resultTableData;

const ResultTable: FC<Props> = () => (
  <div className={styles.tableWrapper}>
    <div className={styles.table}>
      <TableHeader values={dates} />
      {mock.map(el => (
        <TableRow title={el.title} isHeader={el.isHeader} values={el.data} key={Math.random()} />
      ))}
    </div>
  </div>
);

export default ResultTable;
