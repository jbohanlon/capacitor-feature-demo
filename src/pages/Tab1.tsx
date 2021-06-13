import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
} from '@ionic/react';
import { futureDate, scheduleLocalNotifications } from '../utils/NotificationUtils';
import './Tab1.css';

const Tab1: React.FC = () => {
  const scheduleTestNotifications = () => {
    scheduleLocalNotifications([
      {
        id: 1,
        title: 'First notification',
        body: 'Expand notification for options.',
        actionTypeId: 'reminder',
      },
      {
        id: 2,
        title: 'Second notification',
        body: 'It also worked! Also nice!',
        largeBody: "Wow there's so much text here. What an overwhelming amount of text. It's IRRESPONSIBLE to have this much text!",
        schedule: {
          at: futureDate({ seconds: 5 }),
        },
      },
    ]);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification Test</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonButton color="primary" onClick={() => { scheduleTestNotifications(); }}>Fire notification!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
