import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { AppRoutes } from 'app/enums/AppRoutes';
import { GroupLevels } from 'app/enums/GroupLevels';
import { Roles } from 'app/enums/Roles';
import { StatusTypes } from 'app/enums/StatusTypes';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import { FranchiseWTF } from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { OlympiadFormType } from 'app/types/OlympiadPayloadType';
import Image from 'components/image/Image';
import NameOlympiad from 'components/name-olimpiad/NameOlympiad';
import { OlympiadForm } from 'components/olympiad-page/components/OlympiadForm/OlympiadForm';
import Table from 'components/table/Table';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeDateView } from 'utils/changeDateView';
import coursesStore from '../../app/stores/coursesStore';
import franchiseeStore from '../../app/stores/franchiseeStore';

import image from '../../assets/svgs/icon-setting-blue.svg';

import styles from './AddOlympiad.module.scss';

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
    perPage,
    total,
    getOneGroup,
    queryFieldsOlympiads,
    cleanOlympiadQueryFieldsWithoutRequest,
    setDefaultValuesOlympiad,
    defaultValuesOlympiad,
    setCurrentOlympiad,
    getGroupsForSelect,
    addOlympiadGroup,
    groupsForSelect,
    editOlympiadGroup,
  } = groupStore;
  const { getFranchisee, franchise: franchiseList } = franchiseeStore;
  const { getCourses, setSearchCoursesParams, courses } = coursesStore;

  const IS_EDIT_ROLE = isEditRole(role as Roles);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getFranchisee();
    setSearchCoursesParams({ per_page: 1000, type: 'olympiad', status: StatusTypes.active });
    getCourses();
    getOlympiadGroups();
    return () => {
      cleanOlympiadQueryFieldsWithoutRequest();
    };
  }, [queryFieldsOlympiads.page]);

  const paginate = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    queryFieldsOlympiads.page = newCurrentPage - 1;
  };

  const onGetGroups = async (franchiseId: string) => {
    await getGroupsForSelect({ franchiseId, type: 'class' });
  };

  const setEditModal = async (groupId: string, franchise: Nullable<FranchiseWTF>) => {
    await setCurrentOlympiad(groupId);
    if (franchise) {
      await onGetGroups(franchise.id);
    }
    setShowModal(true);
  };

  const redirect = async (groupId: string) => {
    await getOneGroup(groupId);
    navigate(AppRoutes.OlympiadsListPage);
  };

  const onAddOlympiadClick = () => {
    setDefaultValuesOlympiad();
    setShowModal(true);
  };

  const onSubmit = async (values: OlympiadFormType) => {
    if (values.id) {
      await editOlympiadGroup(values, values.id);
    } else {
      await addOlympiadGroup(values);
    }
    setShowModal(false);
  };

  const title = defaultValuesOlympiad?.id ? 'Изменение олимпиады' : 'Добавление олимпиады';

  const count = Math.ceil(total / perPage);
  return (
    <div className={styles.containerAdd}>
      <NameOlympiad addOlympiad={onAddOlympiadClick} isEditRole={IS_EDIT_ROLE} />
      <div className={styles.tableWrap}>
        <h2>Список Олимпиад</h2>
        <Table colNames={colNames} loading={false}>
          {currentItem.length === 0 ? (
            <tr>
              <td style={{ textAlign: 'center', fontWeight: 500, fontSize: '18px' }}>
                Олимпиад нет
              </td>
            </tr>
          ) : (
            currentItem.map(({ id, name, startedAt, endedAt, level, franchise }) => (
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
                      onClick={async event => {
                        event.stopPropagation();
                        await setEditModal(id, franchise);
                      }}
                    >
                      <Image src={image} />
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>
      <div className={styles.paginationOlympiad}>
        {currentItem.length !== 0 && (
          <Pagination
            count={count}
            color="primary"
            size="large"
            page={queryFieldsOlympiads.page ? queryFieldsOlympiads.page + 1 : 1}
            boundaryCount={1}
            onChange={paginate}
          />
        )}
      </div>
      {showModal && defaultValuesOlympiad && (
        <OlympiadForm
          defaultValues={defaultValuesOlympiad}
          setShowModal={setShowModal}
          onSubmitForm={onSubmit}
          title={title}
          franchise={franchiseList}
          courses={courses}
          groups={groupsForSelect}
          getGroups={onGetGroups}
        />
      )}
    </div>
  );
});

export default AddOlympiad;
