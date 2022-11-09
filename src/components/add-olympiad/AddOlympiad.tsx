import { Roles } from 'app/enums/Roles';
import React, { ChangeEvent, useEffect, useState } from 'react';

import styles from './AddOlympiad.module.scss';

import image from '../../assets/svgs/icon-setting-blue.svg';

import NameOlympiad from 'components/name-olimpiad/NameOlympiad';
import Table from 'components/table/Table';
import groupStore from 'app/stores/groupStore';
import { ResponseGroups } from 'app/types/GroupTypes';
import { GroupLevels } from 'app/enums/GroupLevels';
import Button from '@mui/material/Button';
import Image from 'components/image/Image';
import { OlympiadForm } from 'components/olympiad-page/components/OlympiadForm/OlympiadForm';
import BasicModal from 'components/basic-modal/BasicModal';
import { observer } from 'mobx-react-lite';
import { changeDateView } from 'utils/changeDateView';
import Pagination from '@mui/material/Pagination';
import appStore from 'app/stores/appStore';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import franchiseeStore from '../../app/stores/franchiseeStore';
import coursesStore from '../../app/stores/coursesStore';

const colNames = [
  'Название олимпиады',
  'Дата и время начала',
  'Дата и время окончания',
  'Группа',
  'Тип группы',
  'Город',
  'Адрес школы',
  '',
];

const isEditRole = (roleDate: Roles) => {
  switch (roleDate) {
    case 'admin':
    case 'methodist':
      return true;
    default:
      return false;
  }
};

const AddOlympiad = observer(() => {
  const navigate = useNavigate();
  const { role } = appStore;
  const {
    groups: currentItem,
    getOlympiadGroups,
    getCurrentGroupFromLocalStorage,
    perPage,
    total,
    getOneGroup,
    queryFieldsOlympiads,
    cleanOlympiadQueryFieldsWithoutRequest,
  } = groupStore;
  const { getFranchisee } = franchiseeStore;
  const { getCoursesOlimp } = coursesStore;
  const IS_EDIT_ROLE = isEditRole(role as Roles);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<ResponseGroups>();

  useEffect(() => {
    getFranchisee();
    getCoursesOlimp();
    getOlympiadGroups();
    return () => {
      cleanOlympiadQueryFieldsWithoutRequest();
    };
  }, [queryFieldsOlympiads.page]);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    queryFieldsOlympiads.page = newCurrentPage - 1;
  };

  const setEditModal = (groupId: string) => {
    setShowModal(true);
    const result = getCurrentGroupFromLocalStorage(groupId);
    setCurrentGroup(result);
  };

  const redirect = (groupId: string) => {
    getOneGroup(groupId);
    navigate(AppRoutes.OlympiadsListPage);
  };

  const count = Math.ceil(total / perPage);
  return (
    <div className={styles.containerAdd}>
      <NameOlympiad isEditRole={IS_EDIT_ROLE} />
      <div className={styles.tableWrap}>
        <h2>Список Олимпиад</h2>
        <Table colNames={colNames} loading={false}>
          {currentItem.map(({ id, name, startedAt, endedAt, level }) => (
            <tr key={id} onClick={() => redirect(id)}>
              <td>{name}</td>
              <td>{changeDateView(startedAt.date)}</td>
              <td>{changeDateView(endedAt.date)}</td>
              <td>{GroupLevels[level]}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                {IS_EDIT_ROLE && (
                  <Button
                    className={styles.settingOlympiad}
                    onClick={event => {
                      event.stopPropagation();
                      setEditModal(id);
                    }}
                  >
                    <Image src={image} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        <Pagination
          count={count}
          color="primary"
          size="large"
          page={queryFieldsOlympiads.page ? queryFieldsOlympiads.page + 1 : 1}
          boundaryCount={1}
          onChange={paginate}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadForm setShowModal={setShowModal} mode="edite" group={currentGroup} />
      </BasicModal>
    </div>
  );
});

export default AddOlympiad;
