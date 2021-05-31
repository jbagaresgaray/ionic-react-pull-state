import React, { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonAvatar,
  NavContext,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { IUser, UsersState, UserStore } from "../../store/users";
// import AppLoading from "../../components/AppLoading/AppLoading";
import "./Users.scss";
import { LocalStorageService } from "../../services/LocalStorage";
import { chevronDownCircleOutline } from "ionicons/icons";

const Users: React.FC = () => {
  const UsersArr = UserStore.useState((s) => s.Users);
  const { navigate } = useContext(NavContext);

  const onUserClick = (user: IUser) => {
    UserStore.update((s) => {
      s.ActiveUser = user;
      LocalStorageService.setItem("@ActiveUser", user);
    });
    navigate("/tabs", "forward");
  };

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const result = await UsersState().GetAllUsers.run();
    if (result) {
      event.detail.complete();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Users</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
          ></IonRefresherContent>
        </IonRefresher>

        {/* {!finished && <AppLoading />} */}

        {UsersArr && (
          <IonList>
            {UsersArr.map((item, index) => (
              <IonItem button key={index} onClick={() => onUserClick(item)}>
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>{item.name}</h2>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Users;
