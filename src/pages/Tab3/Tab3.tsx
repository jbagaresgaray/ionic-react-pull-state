import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import Album from "../../components/Album/Album";
import { AlbumStore, UserAlbumState } from "../../store/albums";
import { IUser, UserStore } from "../../store/users";

import "./Tab3.scss";
import { chevronDownCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const Tab3: React.FC = () => {
  const activeUser: IUser = UserStore.useState((s) => s.ActiveUser) as IUser;
  const AlbumsArr = AlbumStore.useState((s) => s.Albums);
  const history = useHistory();

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (activeUser) {
      const result = await UserAlbumState().GetAllUserAlbums.run({
        userId: activeUser.id,
      });

      if (result) {
        event.detail.complete();
      }
    } else {
      event.detail.complete();
    }
  };

  const onAlbumClick = (albumId: number) => {
    history.push({
      pathname: `/tabs/tab3/${albumId}/photos`,
      state: {
        albumId,
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Albums</IonTitle>
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
            <IonTitle size="large">Albums</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {AlbumsArr &&
              AlbumsArr.map((item, index) => (
                <IonCol size="6" key={index}>
                  <Album album={item} onAlbumClick={onAlbumClick} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
