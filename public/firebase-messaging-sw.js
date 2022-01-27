// firebase cloud messaging stuff
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

// create connection to firebase
const app = firebase.initializeApp(firebaseConfig);
// create connection to firebase cloud messaging
const messaging = app.messaging();

// listen for push notifications from our server when the app is running in the background
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.data.title, {
        body: payload.data.body,
    });
});

let CACHE_NAME = "pb-cache";
let CACHED_URLS = [
    "/index.html",
    "/favicon.ico",
    "/firebase-messaging-sw.js",
    "/manifest.json",
    "/registerServiceWorker.ts",
    "/robots.txt",
    "/css/app.3c78f67a.css",
    "/js/app.7923e42b.js",
    "/js/chunk-vendors.b804dedf.js",
    "/img/camera.1f6f1b8e.png",
    "/img/plant_care_illustration.cd227edc.png",
    "/img/plant-icon.021de54f.png",
    "/img/icons/android-chrome-192x192.png",
    "/img/icons/android-chrome-512x512.png",
    "/img/icons/apple-touch-icon.png",
    "/img/icons/favicon-16x16.png",
    "/img/icons/favicon-32x32.png",
    "/img/icons/mstile-150x150.png",
    "/img/icons/safari-pinned-tab.svg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            //REquest ist schief gelaufen

            //Gibt es das file im cache
            return caches.match(event.request).then(function(response) {
                if (response) {
                    //if the file is in the cache -> return it
                    return response;
                } else {
                    //if the file is not in the cache -> return offline.html
                    console.log("Offline served");
                   // return caches.match("/index-offline.html");
                }
            });
        })
    );
});