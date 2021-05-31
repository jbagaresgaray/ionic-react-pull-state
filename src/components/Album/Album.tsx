import { IonCard, IonItem, IonLabel, IonImg } from "@ionic/react";
import React from "react";
import { IAlbum } from "../../store/albums";

import "./Album.scss";

interface Props {
  album: IAlbum;
  onAlbumClick?: (albumId: number) => void | Promise<void> | undefined;
}

const Album: React.FC<Props> = ({ album, onAlbumClick }) => {
  return (
    <div className="Album">
      <IonCard
        className="Album-Card"
        onClick={() => {
          if (onAlbumClick) onAlbumClick(album.id);
        }}
      >
        <IonImg src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
      </IonCard>
      <IonItem className="Album-Item" lines="none">
        <IonLabel>
          <h2>{album.title}</h2>
        </IonLabel>
      </IonItem>
    </div>
  );
};

export default Album;
