import { AxiosResponse } from "axios";
import { IPhoto } from "../store/photos";
import API from "./index";

const PhotosService = () => {
  return {
    Photos: (albumId: number): Promise<AxiosResponse<IPhoto[]>> => {
      return API.GET(`albums/${albumId}/photos`);
    },
  };
};

export default PhotosService;
