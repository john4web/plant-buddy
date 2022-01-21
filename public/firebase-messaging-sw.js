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

// different place
const messaging = app.messaging();
messaging
    .getToken({
        vapidKey:
            'BPjg1ATlmZ8gvlgzNKdoNP3gD16Yq09MnYkPDpSh3to2CKU8zblyrKw5hWWWEIAtLPy0dX2kPW47jKY7owJO5Zs',
    })
    .then((token) => {
        if (token) {
            // send to BE
            console.log(token);
        } else {
            console.log(
                'sthg went wrong... u might not have the permission...'
            );
        }
    });

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.title,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
