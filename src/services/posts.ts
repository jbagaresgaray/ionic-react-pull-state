import { AxiosResponse } from "axios";
import { IPost } from "../store/posts";
import API from "./index";

const PostsService = () => {
  return {
    Posts: (userId: number): Promise<AxiosResponse<IPost[]>> => {
      return API.GET_PARAMS("posts", { userId });
    },
  };
};

export default PostsService;
