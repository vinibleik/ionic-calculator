import { IonCol } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";

type IonColSymbolProps = {
  symbol: string;
  dispatch: React.Dispatch<Action>;
};

export const SYMBOLS = {
  π: "pi",
  e: "e",
  "!": "!",
};

function handleSymbol(state: State, value: string): State {
  return {
    ...state,
    current: state.current + value,
    expression: state.expression + SYMBOLS[value],
    hasDot: false,
  };
}

const IonColSymbol: React.FC<IonColSymbolProps> = ({ symbol, dispatch }) => {
  return (
    <>
      <IonCol
        className="button-col"
        onClick={(_) =>
          dispatch({
            value: symbol,
            handler: handleSymbol,
          })
        }
      >
        {symbol}
      </IonCol>
    </>
  );
};

export default IonColSymbol;
