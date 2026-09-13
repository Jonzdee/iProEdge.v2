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
    return onMessage(messaging, async (payload) => {
        console.log("Foreground notification:", payload);

        const title =
            payload.notification?.title || "iProEdge";

        const body =
            payload.notification?.body ||
            "You have a new notification from iProEdge.";

        try {
            const registration =
                await navigator.serviceWorker.register(
                    "/firebase-messaging-sw.js",
                    {
                        scope:
                            "/firebase-cloud-messaging-push-scope/",
                    }
                );

            console.log(
                "Firebase Messaging SW ready:",
                registration.active?.scriptURL
            );

            if (Notification.permission === "granted") {
                await registration.showNotification(title, {
                    body,
                    icon: "/pwa-192x192.png",
                    badge: "/pwa-192x192.png",
                });

                console.log("OS notification displayed");
            }
        } catch (error) {
            console.error(
                "Failed to display foreground notification:",
                error
            );
        }

        if (callback) {
            callback(payload);
        }
    });
};