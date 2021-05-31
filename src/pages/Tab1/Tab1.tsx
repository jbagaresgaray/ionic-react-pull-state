import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { chevronDownCircleOutline } from "ionicons/icons";
import PostCard from "../../components/PostCard/PostCard";
import { PostStore, UserPostState } from "../../store/posts";
import { IUser, UserStore } from "../../store/users";
import "./Tab1.scss";

const Tab1: React.FC = () => {
  const activeUser: IUser = UserStore.useState((s) => s.ActiveUser) as IUser;
  const PostArr = PostStore.useState((s) => s.Posts);
  console.log("PostArr: ", PostArr);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (activeUser) {
      const result = await UserPostState().GetAllUserPosts.run({
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
          <IonTitle>Posts</IonTitle>
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
            <IonTitle size="large">Posts</IonTitle>
          </IonToolbar>
        </IonHeader>
        {PostArr &&
          PostArr.map((item, index) => (
            <PostCard user={activeUser} post={item} key={index} />
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
