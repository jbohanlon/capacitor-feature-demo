import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet,
} from '@ionic/react';
import React, { useState } from 'react';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="photo-gallery">
        <IonGrid>
          <IonRow>
            {photos.map((photo) => {
              return (
                <IonCol size="6" key={photo.filepath}>
                  <IonImg
                    onClick={() => setPhotoToDelete(photo)}
                    src={photo.webviewPath}
                  />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            },
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>

    </IonPage>
  );
};

export default Tab2;
