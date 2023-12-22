//types
import type { LocalstorageNamesType } from '../../../types/localstorage-types';
import type { ILocalstorageService } from '../../../types/services-types';
import type { IGumsDataType } from '../types/data-types';
//variables
import { GUMS_STORAGE_NAME } from '../variables/data-variables';

class ChemistryLocalstorageService implements ILocalstorageService<IGumsDataType> {
  #storageName: LocalstorageNamesType;

  constructor(storageName: LocalstorageNamesType) {
    this.#storageName = storageName;
  }

  getItems(): IGumsDataType | Error | null {
    try {
      const jsonData: string | null = localStorage.getItem(this.#storageName);

      if (jsonData) {
        const parsedJsonData: IGumsDataType = JSON.parse(jsonData);
        return parsedJsonData;
      } else {
        return null;
      }
    } catch (err) {
      if (err instanceof Error) {
        return new Error(err.message);
      } else {
        return new Error('Failed to get data from localStorage');
      }
    }
  }

  setItems(data: IGumsDataType): IGumsDataType | Error {
    try {
      localStorage.setItem(this.#storageName, JSON.stringify(data));
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return new Error(err.message);
      } else {
        return new Error('Failed to write data to localStorage');
      }
    }
  }

  clearStore() {
    localStorage.removeItem(this.#storageName);
  }
}

const chemistryLocalstorageService = new ChemistryLocalstorageService(GUMS_STORAGE_NAME);

export default chemistryLocalstorageService;
