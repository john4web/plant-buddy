const admin = require('firebase-admin');
const serviceAccount = require('./credentials/firebaseAdminCredentials.json');
const express = require('express');

const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.listen(3000);

db.collection('notifications').onSnapshot((docs) => {
    docs.forEach((doc) => console.log(doc.data()));
});

// send a message
const messaging = admin.messaging();

// TODO retrieve this from the user!
const registrationToken =
    'ejC_KbJxCcaexEtux0TNRd:APA91bH00XHUQ-7EoWhsUu_82AGAcYpJrXaOT3DwMHE7Lovf9SqqCw8sBRSURVs3CvRlSs6TXAhBIIxsUEn6F_80dwTNSlj7DU9y17lHFjpfYAqVPSispPOz8LHwn1283DJTivk70utc';
const message = {
    data: {
        title: 'Klaus ist durstig',
        body: 'Bitte Pflanze gießen.',
    },
    token: registrationToken,
};

/*
messaging
    .send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
*/
