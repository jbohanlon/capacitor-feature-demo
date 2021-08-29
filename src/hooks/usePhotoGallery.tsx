import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = 'photos';

/**
 * Returns a base64 representation of the file at the given path.
 * @param {string} path
 * @returns {Promise<string>} A promise that resolves to a base64 string
 *   if a file is found at the given path, or a rejection with an error message.
 */
async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('method did not return a string'));
      }
    };
    reader.readAsDataURL(blob);
  });
}

/**
 *
 * @param photo Saves the given photo in file storage at the path given by fileName.
 * @param fileName
 * @returns {Promise<UserPhoto>} A Promise that resolves to a UserPhoto object.
 */
const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
  let base64Data: string;
  // "hybrid" will detect non-web platforms like Cordova or Capacitor
  if (isPlatform('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path!,
    });
    base64Data = file.data;
  } else {
    base64Data = await base64FromPath(photo.webPath!);
  }
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  if (isPlatform('hybrid')) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
};

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Storage.get({ key: PHOTO_STORAGE });
      const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];

      // If running on the web:
      if (!isPlatform('hybrid')) {
        await Promise.all(
          photosInStorage.map(async (photo) => {
            const file = await Filesystem.readFile({
              path: photo.filepath,
              directory: Directory.Data,
            });

            // For the web platform, we need to load the photo as base64 data
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;

            // Return value doesn't matter, since we only care about waiting
            // for the Promise that null is wrapped in
            return null;
          }),
        );
      }

      setPhotos(photosInStorage);
    };
    loadSaved();
  }, []);

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // Delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });

    setPhotos(newPhotos);
  };

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = `${new Date().getTime()}.jpeg`;
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];

    Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
    deletePhoto,
  };
}
