import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
import { enableIndexedDbPersistence } from "firebase/firestore";

const config = {
    apiKey: 'AIzaSyCe0gTDdNWXfhYlQ-jDpQ_vp_rC3RTtvk8',
    authDomain: 'plant-buddy-fd8f2.firebaseapp.com',
    projectId: 'plant-buddy-fd8f2',
    storageBucket: 'plant-buddy-fd8f2.appspot.com',
    messagingSenderId: '247876550142',
    appId: '1:247876550142:web:55a24f753b42e9ef23d4af',
};

const firebaseApp = initializeApp(config);
const firestore = getFirestore(firebaseApp);
const messaging = getMessaging(firebaseApp);
const storage = getStorage(firebaseApp);

enableIndexedDbPersistence(firestore)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
// Subsequent queries will use persistence, if it was enabled successfully


export { firebaseApp, firestore, messaging, storage };