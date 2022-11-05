import Axios from 'axios';

import appStore from 'app/stores/appStore';

export const execute = async <T>(
  action: () => Promise<T>,
  startLoading?: () => void,
  finishLoading?: () => void,
): Promise<T | undefined> => {
  try {
    startLoading && startLoading();
    return await action();
  } catch (e) {
    // TODO: корректная обработка ошибок
    const errorMsg = Axios.isAxiosError(e) ? e.message : (e as Error).message;
    appStore.setError(errorMsg);
    appStore.setLoginError(errorMsg);
    return Promise.resolve(undefined);
  } finally {
    finishLoading && finishLoading();
  }
};
