import { Nullable } from 'app/types/Nullable';
import axios from 'axios';
import { makeObservable, observable } from 'mobx';

export class StoreBase {
  isLoading: boolean = false;

  error: Nullable<Error> = null;

  success: Nullable<React.ReactNode> = null;

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
    } finally {
      this.isLoading = false;
    }
  };
}
