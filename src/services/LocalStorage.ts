import { isEmpty } from "lodash-es";

export const LocalStorageService = {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(item: string) {
    localStorage.removeItem(item);
  },

  getItem(item: string) {
    const data = localStorage.getItem(item);
    return !isEmpty(data) ? JSON.parse(String(data)) : null;
  },

  clearStorage() {
    return localStorage.clear();
  },
};
