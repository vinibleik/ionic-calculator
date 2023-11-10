import { IonCol } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";

type IonColDigitProps = {
  digit: string;
  dispatch: React.Dispatch<Action>;
};

function handleParenthesis(state: State, value: string): State {
  let { parenthesis, hasDot } = state;

  if (value === "(") {
    parenthesis++;
    hasDot = false;
  } else if (parenthesis <= 0) {
    return {
      ...state,
    };
  } else {
    parenthesis--;
  }

  return {
    ...state,
    current: state.current + value,
    expression: state.expression + value,
    hasDot,
    parenthesis,
  };
}

function handleDot(state: State, value: string): State {
  if (state.hasDot) {
    return {
      ...state,
    };
  }

  return {
    ...state,
    current: state.current + value,
    expression: state.expression + value,
    hasDot: true,
  };
}

function handleDigit(state: State, value: string): State {
  if (value === ".") {
    return handleDot(state, value);
  }

  if (value === "(" || value === ")") {
    return handleParenthesis(state, value);
  }

  return {
    ...state,
    current: state.current + value,
    expression: state.expression + value,
  };
}

const IonColDigit: React.FC<IonColDigitProps> = ({ digit, dispatch }) => {
  return (
    <>
      <IonCol
        className="button-col"
        onClick={(_) =>
          dispatch({
            value: digit,
            handler: handleDigit,
          })
        }
      >
        {digit}
      </IonCol>
    </>
  );
};

export default IonColDigit;
