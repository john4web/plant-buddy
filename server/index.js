const admin = require('firebase-admin');
const serviceAccount = require('./credentials/firebaseAdminCredentials.json');
const express = require('express');
const cron = require('node-cron');

const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.listen(3000);

const messaging = admin.messaging();

const sendMessage = (title, body, token) => {
    const message = {
        data: {
            title: title,
            body: body,
        },
        token: token,
    };

    messaging
        .send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
};


const initializeCronJobsForAll = async () => {
    
    const snapshot = await db.collection('notifications').get();
    const notificationArray = snapshot.docs.map(doc => doc.data());

    notificationArray.forEach(async (notification) => {

        const hours = notification.time.split(':')[0];
        const minutes = notification.time.split(':')[1];
        const day = notification.day;
        const messageTitle = notification.title;
        const messageBody = notification.body;
        const user = await notification.userReference.get();
        const userToken = user.data().token;

        console.log(`cronjob set at ${minutes} ${hours} * * ${day}`);
        cron.schedule(`${minutes} ${hours} * * ${day}`, function() {
            sendMessage(messageTitle, messageBody, userToken);
        });

    });
};

const setCronjobsForNewNotifications = () => {

    let initState = true;

    db.collection('notifications').onSnapshot((docs) => {

        console.log(`Received doc snapshot`);
        if (initState) {
            initState = false;
        } else {
            if (!docs.docChanges().empty) {

                docs.docChanges().forEach(async (newDoc) => {

                    const data = newDoc.doc.data();
                    const day = data.day;
                    const time = data.time;
                    const messageTitle = data.title;
                    const messageBody = data.body;
                    const user = await data.userReference.get();
                    const userToken = user.data().token;
                    const hours = time.split(':')[0];
                    const minutes = time.split(':')[1];

                    console.log(`cronjob set at ${minutes} ${hours} * * ${day}`);

                    cron.schedule(`${minutes} ${hours} * * ${day}`, function() {
                        sendMessage(messageTitle, messageBody, userToken);
                    });

                });
            }
        }
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
};

initializeCronJobsForAll();
setCronjobsForNewNotifications();