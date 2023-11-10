import { IonCol } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";

type IonColFunctionProps = {
  func: string;
  dispatch: React.Dispatch<Action>;
};

export const FUNCTIONS = {
  "√": "sqrt(",
  sin: "sin(",
  cos: "cos(",
  tan: "tan(",
};

function handleFunction(state: State, value: string): State {
  return {
    ...state,
    current: state.current + FUNCTIONS[value],
    expression: state.expression + FUNCTIONS[value],
    hasDot: false,
    parenthesis: state.parenthesis + 1,
  };
}

const IonColFunction: React.FC<IonColFunctionProps> = ({ func, dispatch }) => {
  return (
    <>
      <IonCol
        className="button-col"
        onClick={(_) =>
          dispatch({
            value: func,
            handler: handleFunction,
          })
        }
      >
        {func}
      </IonCol>
    </>
  );
};

export default IonColFunction;
