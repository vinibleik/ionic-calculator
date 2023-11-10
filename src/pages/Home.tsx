import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonAlert,
} from "@ionic/react";
import { logIn } from "ionicons/icons";

function checkLogin(username: string, password: string) {
  return username === "mobile" && password === "prova2";
}

const Home: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    await present("Logging in...");
    setTimeout(async () => {
      await dismiss();

      if (!checkLogin(username, password)) {
        presentAlert({
          header: "Login failed",
          message: "Please check your credentials",
          buttons: ["OK"],
        });
        return;
      }
      router.push("/calculator", "forward");
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: "45%",
          }}
        >
          <IonCard color={"secondary"}>
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonInput
                  placeholder="username"
                  label="Username"
                  labelPlacement="floating"
                  type="text"
                  fill="outline"
                  style={{ fontSize: "16px" }}
                  name="username"
                ></IonInput>
                <IonInput
                  name="password"
                  className="ion-margin-top"
                  style={{ fontSize: "16px" }}
                  placeholder="********"
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  type="password"
                ></IonInput>
                <IonButton
                  style={{ fontSize: "16px" }}
                  type="submit"
                  className="ion-margin-top"
                  expand="block"
                >
                  Login
                  <IonIcon slot="end" icon={logIn} />
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
