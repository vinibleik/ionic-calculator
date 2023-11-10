import { IonCol, IonIcon } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";
import { OPERATORS } from "./IonColOperator";
import { FUNCTIONS } from "./IonColFunction";
import { SYMBOLS } from "./IonColSymbol";
import { backspaceOutline } from "ionicons/icons";

type IonColDeleteProps = {
  value: string;
  dispatch: React.Dispatch<Action>;
};

function checkDot(state: State): boolean {
  for (
    let i = state.current.length - 2;
    i >= 0 &&
    !(state.current[i] in OPERATORS) &&
    !(state.current[i] in SYMBOLS) &&
    state.current[i] !== "(";
    i--
  ) {
    if (state.current[i] === ".") {
      return true;
    }
  }
  return false;
}

function handleDelete(state: State, value: string): State {
  if (value === "AC" || state.current.length <= 1) {
    return {
      ...state,
      current: "",
      expression: "",
      hasDot: false,
      parenthesis: 0,
    };
  }

  for (const [_, f] of Object.entries(FUNCTIONS)) {
    if (state.current.endsWith(f)) {
      return {
        ...state,
        current: state.current.slice(0, -f.length),
        expression: state.expression.slice(0, -f.length),
        parenthesis: state.parenthesis - 1,
        hasDot: checkDot(state),
      };
    }
  }

  const lastChar = state.current.at(-1);
  const hasDot = lastChar === "." ? false : checkDot(state);
  let { parenthesis } = state;

  if (lastChar === "(") {
    parenthesis--;
  } else if (lastChar === ")") {
    parenthesis++;
  }

  return {
    ...state,
    current: state.current.slice(0, -1),
    expression: state.expression.slice(0, -1),
    hasDot,
    parenthesis,
  };
}

const IonColDelete: React.FC<IonColDeleteProps> = ({ value, dispatch }) => {
  return (
    <>
      <IonCol
        className="button-col"
        onClick={(_) =>
          dispatch({
            value: value,
            handler: handleDelete,
          })
        }
      >
        {value === "AC" ? "AC" : <IonIcon icon={backspaceOutline}></IonIcon>}
      </IonCol>
    </>
  );
};

export default IonColDelete;
