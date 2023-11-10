import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { home } from "ionicons/icons";

const Logout: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Logout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"light"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: "60%",
          }}
        >
          <IonCard color={"secondary"}>
            <IonCardContent className="ion-text-center">
              <IonTitle>Você saiu do aplicativo!</IonTitle>
              <IonButton routerLink="/" className="ion-margin-top">
                <IonIcon slot="start" icon={home} />
                Home
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Logout;
