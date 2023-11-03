import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { atCircleOutline, backspaceOutline } from "ionicons/icons";
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
  expression: string;
};

const OPERATORS = { "+": "+", "-": "-", "÷": "/", "✕": "*" };

export const ACTIONS = {
  CLEAR: "clear",
  DELETE: "delete",
  DIGIT: "digit",
  DOT: "dot",
  OPERATOR: "operator",
  EVALUATE: "evaluate",
  PARENTHESIS: "parenthesis",
};

function reducerEvaluate(state: State, action: Action): State {}

function reducerOperator(state: State, action: Action): State {
  const lastChar = state.current.at(-1);

  if (!lastChar) {
    if (action.value === "-") {
      return {
        ...state,
        current: state.current + action.value,
        expression: state.expression + OPERATORS[action.value],
      };
    } else {
      return {
        ...state,
      };
    }
  }

  if (!(lastChar in OPERATORS)) {
    return {
      ...state,
      current: state.current + action.value,
      expression: state.expression + OPERATORS[action.value],
    };
  }

  if (action.value !== "-") {
    if (state.current.length === 1) {
      return {
        ...state,
        current: "",
        expression: "",
      };
    } else if (lastChar === "-" && state.current.at(-2) in OPERATORS) {
      return {
        ...state,
        current: state.current.slice(0, -1),
        expression: state.expression.slice(0, -1),
      };
    } else {
      return {
        ...state,
        current: state.current.slice(0, -1) + action.value,
        expression: state.expression.slice(0, -1) + OPERATORS[action.value],
      };
    }
  }

  if (lastChar !== "-") {
    return {
      ...state,
      current: state.current + action.value,
      expression: state.expression + OPERATORS[action.value],
    };
  }

  return {
    ...state,
  };
}

function reducerDot(state: State, action: Action): State {
  if (state.current.includes(".")) {
    return {
      ...state,
    };
  }

  return {
    ...state,
    current: state.current + action.value,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.CLEAR:
      return {
        current: "",
        previous: "",
        expression: "",
      };
    case ACTIONS.DELETE:
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case ACTIONS.DIGIT:
      return {
        ...state,
        current: state.current + action.value,
      };
    case ACTIONS.DOT:
      return reducerDot(state, action);
    case ACTIONS.OPERATOR:
      return reducerOperator(state, action);
    case ACTIONS.EVALUATE:
      return reducerEvaluate(state, action);
    case ACTIONS.PARENTHESIS:
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
    expression: "",
  });

  function handleDelete() {
    dispatch({ type: ACTIONS.DELETE, value: "" });
  }

  function handleClear() {
    dispatch({ type: ACTIONS.CLEAR, value: "" });
  }

  function handleOperator(value: string) {
    dispatch({ type: ACTIONS.OPERATOR, value });
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
            <IonCol className="button-col" onClick={(_) => handleOperator("(")}>
              (
            </IonCol>
            <IonCol className="button-col" onClick={(_) => handleOperator(")")}>
              )
            </IonCol>
            <IonCol className="button-col" onClick={(_) => handleOperator("÷")}>
              ÷
            </IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="7" dispatch={dispatch} />
            <IonColButton text="8" dispatch={dispatch} />
            <IonColButton text="9" dispatch={dispatch} />
            <IonCol className="button-col" onClick={(_) => handleOperator("✕")}>
              ✕
            </IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="4" dispatch={dispatch} />
            <IonColButton text="5" dispatch={dispatch} />
            <IonColButton text="6" dispatch={dispatch} />
            <IonCol className="button-col" onClick={(_) => handleOperator("-")}>
              -
            </IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="1" dispatch={dispatch} />
            <IonColButton text="2" dispatch={dispatch} />
            <IonColButton text="3" dispatch={dispatch} />
            <IonCol className="button-col" onClick={(_) => handleOperator("+")}>
              +
            </IonCol>
          </IonRow>
          <IonRow>
            <IonColButton text="0" dispatch={dispatch} />
            <IonCol
              className="button-col"
              onClick={(_) => dispatch({ type: ACTIONS.DOT, value: "." })}
            >
              .
            </IonCol>
            <IonCol className="button-col" onClick={(_) => handleDelete()}>
              <IonIcon icon={backspaceOutline}></IonIcon>
            </IonCol>
            <IonCol
              className="button-col"
              onClick={(_) => dispatch({ type: ACTIONS.EVALUATE, value: "" })}
            >
              =
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
