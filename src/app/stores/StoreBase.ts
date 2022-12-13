import { Nullable } from 'app/types/Nullable';
import axios from 'axios';
import { makeObservable, observable } from 'mobx';
import { ReactNode } from 'react';
import { throwErrorMessage } from 'utils';

export class StoreBase {
  isLoading: boolean = false;

  error: Nullable<Error> = null;

  success: Nullable<ReactNode> = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      success: observable,
    });
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoading = true;
      await action();
    } catch (error) {
      // debugger;
      error = axios.isAxiosError(error)
        ? new Error(error.message)
        : typeof error === 'string'
        ? new Error(error)
        : error;

      throwErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  };
}
