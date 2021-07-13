import {
  IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar,
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList class="ion-no-margin">
          <IonItem>
            <IonInput placeholder="Title" />
          </IonItem>
          <IonItem>
            <IonLabel>
              Repeats?
            </IonLabel>
            <IonToggle checked={false} onIonChange={(e) => {}} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Tab3;
