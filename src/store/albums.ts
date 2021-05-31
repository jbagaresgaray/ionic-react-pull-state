import {
  createAsyncAction,
  errorResult,
  registerInDevtools,
  Store,
  successResult,
} from "pullstate";
import AlbumsService from "../services/albums";
import { StoreLocalStorage } from "../services/pullstate-local-storage";

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

interface IAlbumStore {
  Albums: IAlbum[] | null;
}

export const AlbumStore = new Store<IAlbumStore>({
  Albums: [],
});
registerInDevtools({ AlbumStore });

const GetAllUserAlbums = createAsyncAction(
  async ({ userId }) => {
    try {
      const result: IAlbum[] = (await AlbumsService().Albums(userId)) as any;
      return successResult(result);
    } catch (error) {
      return errorResult([], `Error: ${error}`);
    }
  },
  {
    postActionHook: ({ result }) => {
      if (!result.error) {
        AlbumStore.update((s) => {
          s.Albums = result.payload;
        });
      }
    },
  }
);

export const UserAlbumState = () => {
  return {
    GetAllUserAlbums,
  };
};
