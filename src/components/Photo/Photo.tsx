import { IonCard, IonItem, IonLabel, IonImg } from "@ionic/react";
import React from "react";
import { IPhoto } from "../../store/photos";

import "./Photo.scss";

interface Props {
  photo: IPhoto;
}

const Photo: React.FC<Props> = ({ photo }) => {
  return (
    <div className="Photo">
      <IonCard className="Photo-Card">
        <IonImg src={photo.thumbnailUrl} />
      </IonCard>
    </div>
  );
};

export default Photo;
