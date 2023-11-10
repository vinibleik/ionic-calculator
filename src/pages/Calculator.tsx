import {
  IonButton,
  IonButtons,
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
import { logOutOutline } from "ionicons/icons";
import { useEffect, useReducer } from "react";
import IonColDigit from "../components/IonColDigit";
import IonColSymbol from "../components/IonColSymbol";
import IonColFunction from "../components/IonColFunction";
import IonColHistory from "../components/IonColHistory";
import "./Calculator.css";
import { evaluate } from "mathjs";
import IonColOperator from "../components/IonColOperator";
import IonColDelete from "../components/IonColDelete";

export type State = {
  current: string;
  previous: State[];
  expression: string;
  hasDot: boolean;
  parenthesis: number;
  error: boolean;
};

export type Action = {
  value: string;
  handler: (state: State, value: string) => State;
};

function handleEvaluate(state: State, value: string): State {
  let result = "";
  try {
    result = evaluate(state.expression);
    return {
      ...state,
      current: result.toString(),
      expression: result.toString(),
      previous: [
        ...state.previous,
        {
          ...state,
        },
      ],
      parenthesis: 0,
      hasDot: result.toString().includes("."),
      error: false,
    };
  } catch (err) {
    return {
      ...state,
      current: "Bad Format!",
      expression: "",
      parenthesis: 0,
      hasDot: false,
      error: true,
    };
  }
}

function reducer(state: State, action: Action): State {
  if (state.error) {
    state = {
      ...state,
      current: "",
      expression: "",
      hasDot: false,
      parenthesis: 0,
      error: false,
    };
  }
  return action.handler(state, action.value);
}

const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    current: "",
    previous: [],
    expression: "",
    hasDot: false,
    parenthesis: 0,
    error: false,
  });

  const history = document.getElementById("history");
  const current = document.getElementById("current");

  useEffect(() => {
    if (current) {
      current.scrollLeft = current.scrollWidth;
    }
  }, [state.current]);

  useEffect(() => {
    if (history) {
      history.scrollTop = history.scrollHeight;
    }
  }, [state.previous]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Calculadora</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/logout" routerDirection="none">
              Logout
              <IonIcon slot="end" icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonGrid>
          <IonRow className="previous text-area">
            <IonColHistory history={state.previous} dispatch={dispatch} />
          </IonRow>
          <IonRow id="current" className="current text-area">
            <IonCol>{state.current}</IonCol>
          </IonRow>
          <IonRow>
            <IonColFunction func="sin" dispatch={dispatch} />
            <IonColFunction func="cos" dispatch={dispatch} />
            <IonColFunction func="tan" dispatch={dispatch} />
            <IonColFunction func="√" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColOperator operator="^" dispatch={dispatch} />
            <IonColSymbol symbol="!" dispatch={dispatch} />
            <IonColDigit digit="(" dispatch={dispatch} />
            <IonColDigit digit=")" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColDelete value="AC" dispatch={dispatch} />
            <IonColSymbol symbol="e" dispatch={dispatch} />
            <IonColSymbol symbol="π" dispatch={dispatch} />
            <IonColOperator operator="÷" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColDigit digit="7" dispatch={dispatch} />
            <IonColDigit digit="8" dispatch={dispatch} />
            <IonColDigit digit="9" dispatch={dispatch} />
            <IonColOperator operator="✕" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColDigit digit="4" dispatch={dispatch} />
            <IonColDigit digit="5" dispatch={dispatch} />
            <IonColDigit digit="6" dispatch={dispatch} />
            <IonColOperator operator="-" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColDigit digit="1" dispatch={dispatch} />
            <IonColDigit digit="2" dispatch={dispatch} />
            <IonColDigit digit="3" dispatch={dispatch} />
            <IonColOperator operator="+" dispatch={dispatch} />
          </IonRow>
          <IonRow>
            <IonColDigit digit="0" dispatch={dispatch} />
            <IonColDigit digit="." dispatch={dispatch} />
            <IonColDelete value="DEL" dispatch={dispatch} />
            <IonCol
              className="button-col"
              onClick={(_) => dispatch({ value: "=", handler: handleEvaluate })}
            >
              =
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
