import { _store } from 'components/franchising-page/FranchisingPage'

export const isUniqueInn = (value: number): boolean => {
    const entities = _store.filteredEntities;
    const isExists = entities.some(el => el.inn.toString() === value.toString() && el.id !== _store.editingEntityId);
    return !isExists;
};