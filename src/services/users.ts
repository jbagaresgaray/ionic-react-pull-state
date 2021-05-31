import { AxiosResponse } from "axios";
import { IUser } from "../store/users";
import API from "./index";

const UsersService = () => {
  return {
    Users: (): Promise<AxiosResponse<IUser[]>> => {
      return API.GET("users");
    },
  };
};

export default UsersService;
