import { createPullstateCore, registerInDevtools } from "pullstate";
import { StoreLocalStorage } from "../services/pullstate-local-storage";

import { AlbumStore } from "./albums";
import { PostStore } from "./posts";
import { TodoStore } from "./todos";
import { UserStore } from "./users";

const AllUIState = {
  AlbumStore,
  PostStore,
  TodoStore,
  UserStore,
};

// const LocalStorageCore = new StoreLocalStorage();
// LocalStorageCore.addStore({
//   key: "post-store",
//   store: PostStore,
// });
// LocalStorageCore.addStore({
//   key: "todo-store",
//   store: TodoStore,
// });
// LocalStorageCore.addStore({
//   key: "user-store",
//   store: UserStore,
// });
// LocalStorageCore.addStore({
//   key: "albums-store",
//   store: AlbumStore,
// });
// LocalStorageCore.initiateLocalStorageValues();

export const PullstateCore = createPullstateCore(AllUIState);
