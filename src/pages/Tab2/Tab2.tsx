import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import Todo from "../../components/Todo/Todo";
import { TodoStore, UserTodosState } from "../../store/todos";
import "./Tab2.scss";
import { IUser, UserStore } from "../../store/users";
import { chevronDownCircleOutline } from "ionicons/icons";

const Tab2: React.FC = () => {
  const TodosArr = TodoStore.useState((s) => s.Todos);
  const activeUser: IUser = UserStore.useState((s) => s.ActiveUser) as IUser;
  console.log("TodosArr: ", TodosArr);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (activeUser) {
      const result = await UserTodosState().GetAllUserTodos.run({
        userId: activeUser.id,
      });

      if (result) {
        event.detail.complete();
      }
    } else {
      event.detail.complete();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
          ></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {TodosArr &&
            TodosArr.map((item, index) => <Todo todo={item} key={index} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
