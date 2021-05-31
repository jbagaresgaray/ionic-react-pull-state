import {
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCardContent,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonNote,
} from "@ionic/react";
import React from "react";
import {
  thumbsUpOutline,
  chatboxOutline,
  arrowRedoOutline,
} from "ionicons/icons";
import { IPost } from "../../store/posts";
import { IUser } from "../../store/users";

import "./PostCard.scss";

interface Props {
  user: IUser;
  post: IPost;
}

const PostCard: React.FC<Props> = ({ user, post }) => {
  return (
    <IonCard className="PostCard">
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel>
          <h2>{user.name}</h2>
          <p>3hrs ago</p>
        </IonLabel>
      </IonItem>
      <IonCardContent>
        <p>{post.body}</p>
      </IonCardContent>
      <IonRow className="PostCard-ActionInfo">
        <IonCol size="6">
          <IonButton fill="clear" size="small">
            <IonIcon icon={thumbsUpOutline}></IonIcon>
            <small>&nbsp; 5 Likes</small>
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            className="ShareInfo"
            fill="clear"
            size="small"
            color="medium"
          >
            <small>4 Comments</small>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="PostCard-ActionButton">
        <IonCol size="4">
          <IonButton fill="clear" color="dark">
            <IonIcon icon={thumbsUpOutline}></IonIcon>
            <small> &nbsp;Like</small>
          </IonButton>
        </IonCol>
        <IonCol size="4">
          <IonButton fill="clear" color="dark">
            <IonIcon icon={chatboxOutline}></IonIcon>
            <small>&nbsp;Comment</small>
          </IonButton>
        </IonCol>
        <IonCol size="4">
          <IonButton fill="clear" color="dark">
            <IonIcon icon={arrowRedoOutline}></IonIcon>
            <small>&nbsp;Share</small>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

export default PostCard;
