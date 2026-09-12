import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { requestNotificationPermission, listenForMessages } from "../messaging";

function NotificationSetup() {
  const { user } = useAuth();

  useEffect(() => {
    const setupNotifications = async () => {
      // Wait until Firebase knows whether the customer is logged in
      if (!user) {
        return;
      }

      const token = await requestNotificationPermission();

      if (!token) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            fcmToken: token,
            notificationsEnabled: true,
          },
          {
            merge: true,
          },
        );

        console.log("FCM token saved successfully");
      } catch (error) {
        console.error("Failed to save FCM token:", error);
      }
    };

    setupNotifications();

    const unsubscribe = listenForMessages((payload) => {
      console.log("New iProEdge notification:", payload);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return null;
}

export default NotificationSetup;
