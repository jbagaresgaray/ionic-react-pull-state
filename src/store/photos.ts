import {
  createAsyncAction,
  errorResult,
  registerInDevtools,
  Store,
  successResult,
} from "pullstate";
import PhotosService from "../services/photos";

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IPhotoStore {
  Photos: IPhoto[] | null;
}

export const PhotoStore = new Store<IPhotoStore>({
  Photos: [],
});
registerInDevtools({ PhotoStore });

const GetAllUserPhotos = createAsyncAction(
  async ({ albumId }) => {
    try {
      const result: IPhoto[] = (await PhotosService().Photos(albumId)) as any;
      return successResult(result);
    } catch (error) {
      return errorResult([], `Error: ${error}`);
    }
  },
  {
    postActionHook: ({ result }) => {
      if (!result.error) {
        PhotoStore.update((s) => {
          s.Photos = result.payload;
        });
      }
    },
  }
);

export const UserPhotoState = () => {
  return {
    GetAllUserPhotos,
  };
};
