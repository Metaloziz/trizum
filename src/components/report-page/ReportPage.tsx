import Pagination from '@mui/material/Pagination';
import { Roles } from 'app/enums/Roles';
import ReportFilters from 'components/report-page/ReportFilters';
import Table from 'components/table/Table';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { transformDate } from 'utils/transformData';
import reportStore from '../../app/stores/reportStore';
import { shortenName } from 'utils/shortenName';
import { Loader } from '../loader/Loader';
import styles from './ReportPage.module.scss';
import appStore from '../../app/stores/appStore';

const columnNames = [
  'ФИО ученика',
  'Город',
  'Статус',
  'Франшиза',
  'Дата рождения',
  'Оплачен',
  'Дата окончания действия',
  'Тариф',
];

const ReportPage = observer(() => {
  const { role } = appStore;
  const { getReports, reports: currentItem, total, queryFields, perPage } = reportStore;
  const [loading, setLoading] = useState<boolean>(false); // State для загрузки

  useEffect(() => {
    setLoading(true);
    getReports();
    setLoading(false);
  }, [queryFields.page]);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    queryFields.page = newCurrentPage - 1;
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <div className={styles.leftBlock}>
          <ReportFilters />
          <div className={styles.tableContent}>
            <Table
              reportlist={currentItem}
              colNames={columnNames.filter(
                column => role === Roles.Franchisee && column !== 'Франшиза',
              )}
              loading={loading}
            >
              {currentItem?.map(item => (
                <tr key={item.id}>
                  <td>
                    {`${item?.lastName} ${shortenName(item?.firstName)}.${shortenName(
                      item?.middleName,
                    )}.`}
                  </td>
                  <td>{item?.city || 'Нет данных'}</td>
                  <td>{item?.isActive ? 'Активный' : 'Не активный'}</td>
                  {role !== Roles.Franchisee && (
                    <td>{item?.franchise?.shortName || 'Нет данных'}</td>
                  )}
                  <td>{transformDate(item?.birthdate?.date) || 'Нет данных'}</td>
                  <td>{item?.isPayed ? 'Оплачен' : 'Не оплачен'}</td>
                  <td>{transformDate(item?.payedUntil?.date) || 'Нет данных'}</td>
                  <td>{item?.tariff ? item.tariff?.name : 'Нет данных'}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div className={styles.paginationBlock}>
            <Pagination
              count={Math.ceil(total / perPage)}
              onChange={paginate}
              page={queryFields.page ? queryFields.page + 1 : 1}
              defaultValue={0}
              boundaryCount={1}
              color="primary"
              size="large"
            />
          </div>
        </div>
        {/* <div className={styles.rightBlock}>
          <AdminInfoList />
        </div> */}
      </div>
    </div>
  );
});

export default ReportPage;
