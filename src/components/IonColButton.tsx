import { IonCol } from "@ionic/react";
import React from "react";
import { ACTIONS, Action } from "../pages/Home";

type IonColButtonProps = {
  text: string;
  dispatch: React.Dispatch<Action>;
};

const IonColButton: React.FC<IonColButtonProps> = ({ text, dispatch }) => {
  function handleDigit(digit: string) {
    dispatch({ type: ACTIONS.DIGIT, value: digit });
  }

  return (
    <>
      <IonCol className="button-col" onClick={(_) => handleDigit(text)}>
        {text}
      </IonCol>
    </>
  );
};

export default IonColButton;
