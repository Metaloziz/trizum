import { Roles } from 'app/enums/Roles';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
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
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import Button from '../../button/Button';

import usersStore from 'app/stores/usersStore';
import appStore from 'app/stores/appStore';
import { RoleNames, RoleNamesForTutorFilter } from 'app/enums/RoleNames';
import { observer } from 'mobx-react-lite';
import { RequestUsersForFilter } from 'app/types/UserTypes';
import { Moment } from 'moment/moment';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import { GroupTypes } from 'app/enums/GroupTypes';
import tariffsStore from 'app/stores/tariffsStore';
import {
  convertEnumOptions,
  convertFranchiseeOptions,
  convertGroupOptions,
  convertTariffOptions,
  getAllOptionsMUI,
  getRoleOptionsForFilter,
} from 'utils';

const PAID = 'Оплачен';
const NOT_PAID = 'Не оплачен';

const ACTIVE_USER = { value: true, label: 'Активный' };
const NOT_ACTIVE_USER = { value: false, label: 'Не активный' };

interface UserPageFilterProps {
  setIsModalOpen: (value: boolean) => void;
}

export const Filter: FC<UserPageFilterProps> = observer(props => {
  const { role } = appStore;
  const { tariffs } = tariffsStore;
  const { franchise, oneFranchise } = franchiseeStore;
  const { groups, getGroups } = groupStore;
  const { getFilteredUsers, perPage, setSearchUsersParams, cleanSearchUsersParams } = usersStore;

  const franchiseOptions =
    role === Roles.Franchisee || role === Roles.FranchiseeAdmin
      ? convertFranchiseeOptions([oneFranchise])
      : convertFranchiseeOptions(franchise);
  const groupsOptions = convertGroupOptions(groups);
  const groupsTypesOptions = convertEnumOptions(GroupTypes);
  const roleOptions = convertEnumOptions(role === 'tutor' ? RoleNamesForTutorFilter : RoleNames);
  const tariffsOptions = convertTariffOptions(tariffs);

  const [isOpenAccordion, setIsOpenAccordion] = useState(false);

  const [selectedRole, setSelectedRole] = useState('all');

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');

  const [franchiseId, setFranchiseId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupType, setGroupType] = useState('');
  const [tariffId, setTariffId] = useState('');
  const [isPaid, setIsPaid] = useState<string | null>(null);

  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const [isActive, setIsActive] = useState('');

  const [bornDataSince, setBornDataSince] = useState<Moment | null>(null);
  const [bornDateUntil, setBornDateUntil] = useState<Moment | null>(null);

  useEffect(() => {
    if (franchiseId && groupType) {
      getGroups({ franchiseId, type: groupType });
    }
  }, [franchiseId, groupType]);

  const onSearchClick = () => {
    let birthdateSince;
    if (bornDataSince) {
      birthdateSince = bornDataSince.format('DD.MM.YYYY');
    }

    let birthdateUntil;
    if (bornDateUntil) {
      birthdateUntil = bornDateUntil.format('DD.MM.YYYY');
    }

    const params: RequestUsersForFilter = {
      birthdate_since: birthdateSince,
      birthdate_until: birthdateUntil,
      role: selectedRole !== 'all' ? selectedRole : undefined,
      is_payed: isPaid ? isPaid === PAID : undefined,
      firstName,
      middleName,
      lastName,
      city,
      franchiseId,
      groupId,
      page: 0,
      perPage,
      phone,
      email,
      tariff_id: tariffId,
      is_active: isActive ? isActive === ACTIVE_USER.label : null,
    };

    setSearchUsersParams(params);
    getFilteredUsers();
  };

  const handleChangeBornDateSince = (newValue: Moment | null) => {
    setBornDataSince(newValue);
  };

  const handleChangeBornDateUntil = (newValue: Moment | null) => {
    setBornDateUntil(newValue);
  };

  const handleChangeIsPaid = ({ target: { value } }: SelectChangeEvent) => {
    setIsPaid(value);
  };

  const handleChangeFranchiseId = ({ target: { value } }: SelectChangeEvent) => {
    setFranchiseId(value);
  };

  const handleChangeGroupId = ({ target: { value } }: SelectChangeEvent) => {
    setGroupId(value);
  };

  const handleChangeGroupType = ({ target: { value } }: SelectChangeEvent) => {
    setGroupType(value);
  };

  const handleChangeTariffId = ({ target: { value } }: SelectChangeEvent) => {
    setTariffId(value);
  };

  const handleChangeIsActive = ({ target: { value } }: SelectChangeEvent) => {
    setIsActive(value);
  };

  const handleChangeRole = ({ target: { value } }: SelectChangeEvent) => {
    value === 'all' ? setSelectedRole('all') : setSelectedRole(value);
  };

  const handleChangePhone = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value) {
      setPhone(Number(value));
    } else {
      setPhone(null);
    }
  };

  const handleChangeEmail = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(value);
  };
  const onClearFilter = () => {
    setSelectedRole('all');
    setLastName('');
    setFirstName('');
    setMiddleName('');
    setFranchiseId('');
    setGroupId('');
    setTariffId('');
    setIsPaid(null);
    setPhone(null);
    setEmail('');
    setCity('');
    setIsActive('');
    setBornDataSince(null);
    setBornDateUntil(null);
    cleanSearchUsersParams();
  };
  return (
    <Box>
      <Accordion
        expanded={isOpenAccordion}
        onChange={(_, expanded) => setIsOpenAccordion(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтрация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: '15px' }}>
              <DesktopDatePicker
                label="Рождён с"
                inputFormat="DD/MM/YYYY"
                value={bornDataSince}
                onChange={handleChangeBornDateSince}
                renderInput={params => <TextField {...params} fullWidth />}
              />
              <DesktopDatePicker
                label="Рождён по"
                inputFormat="DD/MM/YYYY"
                value={bornDateUntil}
                onChange={handleChangeBornDateUntil}
                renderInput={params => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                autoComplete="on"
                label="Город"
                fullWidth
                value={city}
                onChange={e => setCity(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                autoComplete="on"
                label="Фaмилия"
                fullWidth
                value={lastName}
                onChange={e => setLastName(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                autoComplete="on"
                label="Имя"
                fullWidth
                value={firstName}
                onChange={e => setFirstName(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                autoComplete="on"
                label="Отчество"
                fullWidth
                value={middleName}
                onChange={e => setMiddleName(e.target.value.trim())}
              />
            </Grid>

            {role !== 'franchisee' && role !== 'franchiseeAdmin' && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Франшиза</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={franchiseId}
                    label="Франшиза"
                    onChange={handleChangeFranchiseId}
                  >
                    {getAllOptionsMUI(franchiseOptions)}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Тип группы</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupType}
                  disabled={franchiseId === ''}
                  label="Тип группы"
                  onChange={handleChangeGroupType}
                >
                  {getAllOptionsMUI(groupsTypesOptions)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Группа</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupId}
                  label="Группа"
                  disabled={groupType === ''}
                  onChange={handleChangeGroupId}
                >
                  {getAllOptionsMUI(groupsOptions)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRole}
                  label="Роль"
                  onChange={handleChangeRole}
                >
                  {getAllOptionsMUI(getRoleOptionsForFilter(roleOptions, role))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="on"
                label="Номер телефона"
                fullWidth
                value={phone || ''}
                type="number"
                onChange={handleChangePhone}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                label="Email"
                fullWidth
                value={email}
                onChange={handleChangeEmail}
              />
            </Grid>
            {role === Roles.Admin && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Активный пользователь?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isActive}
                    label="Активный пользователь?"
                    onChange={handleChangeIsActive}
                  >
                    <MenuItem value={ACTIVE_USER.label}>{ACTIVE_USER.label}</MenuItem>
                    <MenuItem value={NOT_ACTIVE_USER.label}>{NOT_ACTIVE_USER.label}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {selectedRole === 'student' && (
              <>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тариф</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tariffId}
                      label="Тариф"
                      onChange={handleChangeTariffId}
                    >
                      {getAllOptionsMUI(tariffsOptions)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Статус оплаты</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isPaid || ''}
                      label="Статус оплаты"
                      onChange={handleChangeIsPaid}
                    >
                      <MenuItem value={PAID}>{PAID}</MenuItem>
                      <MenuItem value={NOT_PAID}>{NOT_PAID}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Stack
            spacing={10}
            direction="row"
            justifyContent="space-between"
            sx={{
              width: '100%',
              px: 1,
            }}
          >
            <Button size="small" onClick={onSearchClick}>
              Найти
            </Button>
            <Button size="small" onClick={onClearFilter}>
              Сбросить
            </Button>
            <Button variant="addUser" size="small" onClick={() => props.setIsModalOpen(true)}>
              Добавить пользователя
            </Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});
