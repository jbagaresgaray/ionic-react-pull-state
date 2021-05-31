import {
  createAsyncAction,
  errorResult,
  registerInDevtools,
  Store,
  successResult,
} from "pullstate";
import PostsService from "../services/posts";
import { StoreLocalStorage } from "../services/pullstate-local-storage";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostStore {
  Posts: IPost[] | null;
}


export const PostStore = new Store<IPostStore>({
  Posts: [],
});
registerInDevtools({ PostStore });


const GetAllUserPosts = createAsyncAction(
  async ({ userId }) => {
    try {
      const result: IPost[] = (await PostsService().Posts(userId)) as any;
      return successResult(result);
    } catch (error) {
      return errorResult([], `Error: ${error}`);
    }
  },
  {
    postActionHook: ({ result }) => {
      if (!result.error) {
        PostStore.update((s) => {
          s.Posts = result.payload;
        });
      }
    },
  }
);

export const UserPostState = () => {
  return {
    GetAllUserPosts,
  };
};
