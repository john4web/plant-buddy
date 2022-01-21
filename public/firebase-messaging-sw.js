importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

var firebaseConfig = {
    apiKey: 'AIzaSyCe0gTDdNWXfhYlQ-jDpQ_vp_rC3RTtvk8',
    authDomain: 'plant-buddy-fd8f2.firebaseapp.com',
    projectId: 'plant-buddy-fd8f2',
    storageBucket: 'plant-buddy-fd8f2.appspot.com',
    messagingSenderId: '247876550142',
    appId: '1:247876550142:web:55a24f753b42e9ef23d4af',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = app.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.data.title, {
        body: payload.data.body,
    });
});
