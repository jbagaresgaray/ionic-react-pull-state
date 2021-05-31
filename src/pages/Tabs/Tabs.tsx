import React, { useEffect } from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonViewWillEnter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  BrowserRouter as Router,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { listOutline, albumsOutline, chatboxOutline } from "ionicons/icons";

import Tab1 from "./../Tab1/Tab1";
import Tab2 from "./../Tab2/Tab2";
import Tab3 from "./../Tab3/Tab3";
import Photos from "../Photos/Photos";

import { IUser, UserStore } from "../../store/users";
import { UserPostState } from "../../store/posts";
import { UserAlbumState } from "../../store/albums";
import { UserTodosState } from "../../store/todos";

const Tabs: React.FC = () => {
  const activeUser: IUser = UserStore.useState((s) => s.ActiveUser) as IUser;
  if (activeUser) {
    UserPostState().GetAllUserPosts.run({ userId: activeUser.id });
    UserAlbumState().GetAllUserAlbums.run({ userId: activeUser.id });
    UserTodosState().GetAllUserTodos.run({ userId: activeUser.id });
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/tab1" component={Tab1} />
          <Route exact path="/tabs/tab2" component={Tab2} />
          <Route exact path="/tabs/tab3" component={Tab3} />
          <Route path="/tabs/tab3/:albumId/photos">
            <Photos />
          </Route>
          <Route path="/tabs" exact>
            <Redirect to="/tabs/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tabs/tab1">
            <IonIcon icon={chatboxOutline} />
            <IonLabel>Posts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2">
            <IonIcon icon={listOutline} />
            <IonLabel>Todos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3">
            <IonIcon icon={albumsOutline} />
            <IonLabel>Albums</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Tabs;
