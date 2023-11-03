import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { backspaceOutline } from "ionicons/icons";
import { useReducer } from "react";
import IonColButton from "../components/IonColButton";
import "./Home.css";
import { evaluate } from "mathjs";

export type Action = {
  type: string;
  value: string;
};

type State = {
  current: string;
  previous: string;
};

export const ACTIONS = {
  DELETE: "delete",
  CLEAR: "clear",
  DIGIT: "digit",
  OPERATOR: "operator",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.DELETE:
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {
        current: "",
        previous: "",
      };
    case ACTIONS.DIGIT:
      return {
        ...state,
        current: state.current + action.value,
      };
    case ACTIONS.OPERATOR:
      break;
  }

  return {
    ...state,
  };
}

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    current: "",
    previous: "",
  });

  function handleDelete() {
    dispatch({ type: ACTIONS.DELETE, value: "" });
  }

  function handleClear() {
    dispatch({ type: ACTIONS.CLEAR, value: "" });
  }

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <IonGrid>
          <IonRow className="previous text-area">
            <IonCol>{state.previous}</IonCol>
          </IonRow>
          <IonRow className="current text-area">
            <IonCol>{state.current}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="button-col" onClick={(_) => handleClear()}>
              AC
            </IonCol>
            <IonCol className="button-col">(</IonCol>
            <IonCol className="button-col">)</IonCol>
            <IonCol className="button-col">÷</IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="7" dispatch={dispatch} />
            <IonColButton text="8" dispatch={dispatch} />
            <IonColButton text="9" dispatch={dispatch} />
            <IonCol className="button-col">✕</IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="4" dispatch={dispatch} />
            <IonColButton text="5" dispatch={dispatch} />
            <IonColButton text="6" dispatch={dispatch} />
            <IonCol className="button-col">-</IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="1" dispatch={dispatch} />
            <IonColButton text="2" dispatch={dispatch} />
            <IonColButton text="3" dispatch={dispatch} />
            <IonCol className="button-col">+</IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="0" dispatch={dispatch} />
            <IonCol className="button-col">.</IonCol>
            <IonCol className="button-col" onClick={(_) => handleDelete()}>
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
