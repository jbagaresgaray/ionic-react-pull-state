import {
  createAsyncAction,
  errorResult,
  registerInDevtools,
  Store,
  successResult,
} from "pullstate";
import PostsService from "../services/posts";
import { StoreLocalStorage } from "../services/pullstate-local-storage";
import TodosService from "../services/todos";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ITodoStore {
  Todos: ITodo[] | null;
}

export const TodoStore = new Store<ITodoStore>({
  Todos: [],
});
registerInDevtools({ TodoStore });

const GetAllUserTodos = createAsyncAction(
  async ({ userId }) => {
    try {
      const result: ITodo[] = (await TodosService().Todos(userId)) as any;
      return successResult(result);
    } catch (error) {
      return errorResult([], `Error: ${error}`);
    }
  },
  {
    postActionHook: ({ result }) => {
      if (!result.error) {
        TodoStore.update((s) => {
          s.Todos = result.payload;
        });
      }
    },
  }
);

export const UserTodosState = () => {
  return {
    GetAllUserTodos,
  };
};
