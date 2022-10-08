import { _store } from 'components/franchising-page/FranchisingPage'

export const isUniquePhone = (value: number): boolean => {
    const searchingValue = !value ? null! : parseInt(value.toString().replace(/\D/g, ''), 10)
    const entities = _store.filteredEntities;
    const isExists = entities.some(el => el.phone.toString() === searchingValue.toString() && el.id !== _store.editingEntityId)
    return !isExists;
};