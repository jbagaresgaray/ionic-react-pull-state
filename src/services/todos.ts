import { AxiosResponse } from "axios";
import { ITodo } from "../store/todos";
import API from "./index";

const TodosService = () => {
  return {
    Todos: (userId: number): Promise<AxiosResponse<ITodo[]>> => {
      return API.GET_PARAMS("todos", { userId });
    },
  };
};

export default TodosService;
