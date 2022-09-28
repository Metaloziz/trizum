import { DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { observer } from 'mobx-react';

import {
  numberWithoutLeadingZero,
  numberWithPossibleLeadingZero,
} from './helpers/numberWithoutLeadingZero';
import { Dialog, DialogTitle } from './ui/Dialog';

import Button from 'components/button/Button';
import { FranchisingStore } from 'components/franchising-page/stores';

interface AddOrEditDialogProps {
  store: FranchisingStore;
}

export const AddOrEditDialog = observer((props: AddOrEditDialogProps) => {
  const { store } = props;

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
      <DialogTitle onClose={store.closeDialog}>
        {store.editingEntity?.id ? 'Редактирование записи' : 'Добавление новой франшизы'}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              Сведения об организации
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              label="Полное наименование"
              value={store.editingEntity.fullName}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.fullName = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.fullName.isValidSync(store.editingEntity.fullName)
              }
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Короткое наименование"
              value={store.editingEntity.shortName}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.shortName = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.shortName.isValidSync(store.editingEntity.shortName)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Юр. адрес"
              value={store.editingEntity.legalAddress}
              onChange={({ currentTarget: { value } }) =>
                (store.editingEntity.legalAddress = value)
              }
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.legalAddress.isValidSync(
                  store.editingEntity.legalAddress,
                )
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Фактический адрес"
              value={store.editingEntity.actualAddress}
              onChange={({ currentTarget: { value } }) =>
                (store.editingEntity.actualAddress = value)
              }
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.actualAddress.isValidSync(
                  store.editingEntity.actualAddress,
                )
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              label="Телефон"
              value={store.editingEntity.phone}
              onChange={value => store.onChangePhone(value as string)}
              defaultCountry="ru"
              onlyCountries={['ru']}
              variant="outlined"
              fullWidth
              size="small"
              countryCodeEditable={false}
              error={!store.validateSchema.fields.phone.isValidSync(store.editingEntity.phone)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="E-mail"
              value={store.editingEntity.email}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.email = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.email.isValidSync(store.editingEntity.email)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ИНН"
              value={store.editingEntity.inn}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.inn = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.inn.isValidSync(store.editingEntity.inn)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ОГРН"
              value={store.editingEntity.ogrn}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.ogrn = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.ogrn.isValidSync(store.editingEntity.ogrn)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="КПП"
              value={store.editingEntity.kpp}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.kpp = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.kpp.isValidSync(store.editingEntity.kpp)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Город"
              value={store.editingEntity.city}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.city = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.city.isValidSync(store.editingEntity.city)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              Банковские реквииты
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Наименование школы"
              value={store.editingEntity.schoolName}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.schoolName = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.schoolName.isValidSync(store.editingEntity.schoolName)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Наименование банка"
              value={store.editingEntity.bankName}
              onChange={({ currentTarget: { value } }) => (store.editingEntity.bankName = value)}
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.bankName.isValidSync(store.editingEntity.bankName)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Корр. счёт банка"
              value={store.editingEntity.bankBill}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.bankBill = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.bankBill.isValidSync(store.editingEntity.bankBill)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="БИК банка"
              value={store.editingEntity.bankBik}
              onChange={({ currentTarget: { value } }) =>
                numberWithPossibleLeadingZero(value, () => (store.editingEntity.bankBik = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.bankBik.isValidSync(store.editingEntity.bankBik)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ИНН банка"
              value={store.editingEntity.bankInn}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.bankInn = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.bankInn.isValidSync(store.editingEntity.bankInn)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="КПП банка"
              value={store.editingEntity.bankKpp}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.bankKpp = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={!store.validateSchema.fields.bankKpp.isValidSync(store.editingEntity.bankKpp)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Расчётный счёт"
              value={store.editingEntity.checkingAccount}
              onChange={({ currentTarget: { value } }) =>
                numberWithoutLeadingZero(value, () => (store.editingEntity.checkingAccount = value))
              }
              fullWidth
              variant="outlined"
              size="small"
              error={
                !store.validateSchema.fields.checkingAccount.isValidSync(
                  store.editingEntity.checkingAccount,
                )
              }
            />
          </Grid>
        </Grid>
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
