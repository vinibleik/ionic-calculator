import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { backspaceOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="previous">
            <IonCol>TEST</IonCol>
          </IonRow>
          <IonRow className="current">
            <IonCol>TEST</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col">AC</IonCol>
            <IonCol className="button-col">(</IonCol>
            <IonCol className="button-col">)</IonCol>
            <IonCol className="button-col">÷</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col">7</IonCol>
            <IonCol className="button-col">8</IonCol>
            <IonCol className="button-col">9</IonCol>
            <IonCol className="button-col">✕</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col">4</IonCol>
            <IonCol className="button-col">5</IonCol>
            <IonCol className="button-col">6</IonCol>
            <IonCol className="button-col">-</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col">1</IonCol>
            <IonCol className="button-col">2</IonCol>
            <IonCol className="button-col">3</IonCol>
            <IonCol className="button-col">+</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col">0</IonCol>
            <IonCol className="button-col">.</IonCol>
            <IonCol className="button-col">
              <IonIcon icon={backspaceOutline}></IonIcon>
            </IonCol>
            <IonCol className="button-col">=</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
