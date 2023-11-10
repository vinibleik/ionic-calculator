import { IonCol, IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";
import { Action, State } from "../pages/Calculator";

type IonColHistoryProps = {
  history: State[];
  dispatch: React.Dispatch<Action>;
};

function handlerHistory(state: State, prevState: State): State {
  return {
    ...prevState,
    previous: state.previous,
  };
}

const IonColHistory: React.FC<IonColHistoryProps> = ({ history, dispatch }) => {
  return (
    <>
      <IonCol id="history-container">
        <IonList inset={true} id="history">
          {history.map((p, index) => (
            <IonItem
              key={index}
              lines="none"
              className="history-item"
              onClick={() => dispatch({ value: p, handler: handlerHistory })}
            >
              <IonLabel slot="end">{p.current}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCol>
    </>
  );
};

export default IonColHistory;
