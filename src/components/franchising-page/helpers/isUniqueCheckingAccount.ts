import { _store } from 'components/franchising-page/FranchisingPage';

export const isUniqueCheckingAccount = (value: string): boolean => {
  const entities = _store.filteredEntities;
  const isExists = entities.some(
    el => el.checkingAccount.toString() === value.toString() && el.id !== _store.editingEntityId,
  );
  return !isExists;
};
