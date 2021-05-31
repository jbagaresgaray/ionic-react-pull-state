import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  useIonViewWillEnter,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { chevronDownCircleOutline } from "ionicons/icons";
import { PhotoStore, UserPhotoState } from "../../store/photos";
import { useParams } from "react-router";
import Photo from "../../components/Photo/Photo";

const Photos: React.FC = () => {
  const PhotosArr = PhotoStore.useState((s) => s.Photos);
  const { albumId } = useParams() as any;

  useIonViewWillEnter(async () => {
    if (albumId) {
      await UserPhotoState().GetAllUserPhotos.run({
        albumId,
      });
    }
  });

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (albumId) {
      const result = await UserPhotoState().GetAllUserPhotos.run({
        albumId,
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
          <IonTitle>Photos</IonTitle>
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
            <IonTitle size="large">Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {PhotosArr &&
              PhotosArr.map((item, index) => (
                <IonCol size="6" key={index}>
                  <Photo photo={item} key={index} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Photos;
