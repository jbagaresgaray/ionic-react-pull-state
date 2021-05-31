import { IonLabel, IonItem, IonCheckbox } from "@ionic/react";
import React from "react";
import { ITodo } from "../../store/todos";

import "./Todo.scss";

interface Props {
  todo: ITodo;
}

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <IonItem className="Todo-Item" lines="none">
      <IonLabel>{todo.title}</IonLabel>
      <IonCheckbox color="success" checked={todo.completed}></IonCheckbox>
    </IonItem>
  );
};

export default Todo;
