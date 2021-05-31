import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { UsersState } from "../../store/users";

import Users from "../Users/Users";
import Tabs from "../Tabs/Tabs";
import Photos from "../Photos/Photos";

export default function Main() {
  UsersState().GetAllUsers.useBeckon();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Users />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/photos/:albumId">
            <Photos />
          </Route>
          <Route path="/tabs" component={Tabs} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
