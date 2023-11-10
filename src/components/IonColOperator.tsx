import { IonCol } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";

type IonColOperatorProps = {
  operator: string;
  dispatch: React.Dispatch<Action>;
};

export const OPERATORS = {
  "+": "+",
  "-": "-",
  "÷": "/",
  "✕": "*",
  "^": "^",
};

function handleOperator(state: State, value: string): State {
  const lastChar = state.current.at(-1);

  if (!lastChar) {
    if (value === "-") {
      return {
        ...state,
        current: state.current + value,
        expression: state.expression + OPERATORS[value],
        hasDot: false,
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
      current: state.current + value,
      expression: state.expression + OPERATORS[value],
      hasDot: false,
    };
  }

  if (value !== "-") {
    if (state.current.length === 1) {
      return {
        ...state,
        current: "",
        expression: "",
        hasDot: false,
      };
    } else if (lastChar === "-" && state.current.at(-2) in OPERATORS) {
      return {
        ...state,
        current: state.current.slice(0, -1),
        expression: state.expression.slice(0, -1),
        hasDot: false,
      };
    } else {
      return {
        ...state,
        current: state.current.slice(0, -1) + value,
        expression: state.expression.slice(0, -1) + OPERATORS[value],
        hasDot: false,
      };
    }
  }

  if (lastChar !== "-") {
    return {
      ...state,
      current: state.current + value,
      expression: state.expression + OPERATORS[value],
      hasDot: false,
    };
  }

  return {
    ...state,
  };
}

const IonColOperator: React.FC<IonColOperatorProps> = ({
  operator,
  dispatch,
}) => {
  return (
    <>
      <IonCol
        className="button-col"
        onClick={(_) =>
          dispatch({
            value: operator,
            handler: handleOperator,
          })
        }
      >
        {operator}
      </IonCol>
    </>
  );
};

export default IonColOperator;
