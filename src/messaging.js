import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebase";

const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
    try {
        // Ask the user for notification permission
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("Notification permission denied");
            return null;
        }

        // Register Firebase Messaging service worker
        const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
            {
                scope: "/firebase-cloud-messaging-push-scope/",
            }
        );

        console.log("Firebase Messaging service worker registered");

        // Get FCM token
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
        });

        console.log("FCM Token:", token);

        return token;
    } catch (error) {
        console.error("Notification setup failed:", error);
        return null;
    }
};

export const listenForMessages = (callback) => {
    return onMessage(messaging, (payload) => {
        console.log("Foreground notification:", payload);

        if (callback) {
            callback(payload);
        }
    });
};