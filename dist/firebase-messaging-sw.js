importScripts(
    "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyCpXHbbY4NxYKoXTA_hZ-4ue5eUzY5KOBc",
    authDomain: "iprodatabase-9d9db.firebaseapp.com",
    projectId: "iprodatabase-9d9db",
    storageBucket: "iprodatabase-9d9db.firebasestorage.app",
    messagingSenderId: "135650665800",
    appId: "1:135650665800:web:1f3b443466db3939257f7d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Background message:",
        payload
    );

    const notificationTitle =
        payload.notification?.title || "iProEdge";

    const notificationOptions = {
        body:
            payload.notification?.body ||
            "You have a new notification from iProEdge.",
        icon: "/pwa-192x192.png",
        badge: "/pwa-192x192.png",
    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});