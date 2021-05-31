import {
  Store,
  createAsyncAction,
  errorResult,
  successResult,
  registerInDevtools,
} from "pullstate";
import { LocalStorageService } from "../services/LocalStorage";
import { StoreLocalStorage } from "../services/pullstate-local-storage";
import UsersService from "../services/users";

export interface IUserAddress {
  city: string;
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
}

export interface IUserCompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface IUser {
  address: IUserAddress;
  company: IUserCompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface IUserStore {
  Users: IUser[] | null;
  UsersLoading: boolean;
  ActiveUser: IUser | null;
}

export const UserStore = new Store<IUserStore>({
  Users: [],
  UsersLoading: false,
  ActiveUser: null || LocalStorageService.getItem("@ActiveUser"),
});

registerInDevtools({ UserStore });

const GetAllUsers = createAsyncAction(
  async () => {
    try {
      const result: IUser[] = (await UsersService().Users()) as any;
      return successResult(result);
    } catch (error) {
      return errorResult([], `Error: ${error}`);
    }
  },
  {
    postActionHook: ({ result, stores }) => {
      if (!result.error) {
        UserStore.update((s) => {
          s.Users = result.payload;
        });
      }
    },
  }
);

UserStore.subscribe(
  (s) => s,
  (userStore) => {
    const ActiveUser = LocalStorageService.getItem("@userData");
    userStore = {
      ...userStore,
      ActiveUser,
    };
    LocalStorageService.setItem("@userData", userStore);
  }
);

export const UsersState = () => {
  return {
    GetAllUsers,
  };
};
