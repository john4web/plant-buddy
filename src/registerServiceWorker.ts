/* eslint-disable no-console */

import { register } from 'register-service-worker';
import { getToken, onMessage } from 'firebase/messaging';
import { firestore, messaging } from '@/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import AuthService from '@/services/AuthService';

if (process.env.NODE_ENV === 'production') {
    register(`firebase-messaging-sw.js`, {
        ready(registration) {
            if ('Notification' in window)
                Notification.requestPermission().then(async (perm) => {
                    if (perm === 'granted') {
                        const auth = AuthService.getAuth();
                        auth.onAuthStateChanged((user) => {
                            if (user?.uid) {
                                getToken(messaging, {
                                    vapidKey:
                                        'BPjg1ATlmZ8gvlgzNKdoNP3gD16Yq09MnYkPDpSh3to2CKU8zblyrKw5hWWWEIAtLPy0dX2kPW47jKY7owJO5Zs',
                                }).then((token) => {
                                    if (token) {
                                        console.log(user.uid);
                                        const userRef = doc(
                                            firestore,
                                            'users',
                                            user.uid
                                        );
                                        updateDoc(userRef, { token: token });
                                    }
                                });

                                onMessage(messaging, (payload) => {
                                    if (payload.data?.title)
                                        registration.showNotification(
                                            payload?.data?.title,
                                            {
                                                body: payload.data?.body,
                                            }
                                        );
                                });
                            }
                        });
                    } else {
                        console.log('permission not given :(');
                    }
                });
        },
        registered() {
            console.log('Service worker has been registered.');
        },
        cached() {
            console.log('Content has been cached for offline use.');
        },
        updatefound() {
            console.log('New content is downloading.');
        },
        updated() {
            console.log('New content is available; please refresh.');
        },
        offline() {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        },
        error(error) {
            console.error('Error during service worker registration:', error);
        },
    });
}
