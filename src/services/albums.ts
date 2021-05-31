import { AxiosResponse } from "axios";
import { IAlbum } from "../store/albums";
import API from "./index";

const AlbumsService = () => {
  return {
    Albums: (userId: number): Promise<AxiosResponse<IAlbum[]>> => {
      return API.GET_PARAMS("albums", { userId });
    },
  };
};

export default AlbumsService;
