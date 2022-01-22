import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

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

export { firebaseApp, firestore, messaging, storage };