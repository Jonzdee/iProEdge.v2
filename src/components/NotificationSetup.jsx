import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { requestNotificationPermission, listenForMessages } from "../messaging";

function NotificationSetup() {
  const { user } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  // ==========================================
  // SAVE FCM TOKEN
  // ==========================================
  const saveNotificationToken = async (token) => {
    if (!token) {
      console.log("No FCM token available.");
      return;
    }

    try {
      // ========================================
      // LOGGED-IN USER
      // ========================================
      if (user) {
        await setDoc(
          doc(db, "users", user.uid, "notificationTokens", token),
          {
            fcmToken: token,
            notificationsEnabled: true,
            createdAt: new Date(),
          },
          {
            merge: true,
          },
        );

        console.log("FCM token saved to logged-in customer device");
      }

      // ========================================
      // GUEST USER
      // ========================================
      else {
        await setDoc(
          doc(db, "notificationTokens", token),
          {
            fcmToken: token,
            notificationsEnabled: true,
            createdAt: new Date(),
          },
          {
            merge: true,
          },
        );

        console.log("Guest FCM token saved");
      }
    } catch (error) {
      console.error("Failed to save FCM token:", error);
    }
  };

  // ==========================================
  // CHECK / REGISTER NOTIFICATIONS
  // ==========================================
  useEffect(() => {
    const setupNotifications = async () => {
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
        return;
      }

      // ----------------------------------------
      // Permission already granted
      // ----------------------------------------
      if (Notification.permission === "granted") {
        console.log("Notification permission already granted.");

        const token = await requestNotificationPermission();

        if (token) {
          await saveNotificationToken(token);
        }

        return;
      }

      // ----------------------------------------
      // Permission already denied
      // ----------------------------------------
      if (Notification.permission === "denied") {
        console.log("Notification permission is denied.");
        return;
      }

      // ----------------------------------------
      // Permission is still default
      // ----------------------------------------
      if (Notification.permission === "default") {
        const dismissedAt = localStorage.getItem(
          "iproedge_notification_dismissed",
        );

        if (dismissedAt) {
          const daysSinceDismissed =
            (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);

          if (daysSinceDismissed < 7) {
            return;
          }
        }

        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 3000);

        return () => clearTimeout(timer);
      }
    };

    setupNotifications();
  }, [user]);

  // ==========================================
  // FOREGROUND NOTIFICATIONS
  // ==========================================
  useEffect(() => {
    const unsubscribe = listenForMessages((payload) => {
      console.log("New iProEdge notification:", payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================
  // ALLOW NOTIFICATIONS BUTTON
  // ==========================================
  const handleAllowNotifications = async () => {
    setShowPrompt(false);

    const token = await requestNotificationPermission();

    if (!token) {
      console.log("Notification permission/token failed.");
      return;
    }

    await saveNotificationToken(token);
  };

  // ==========================================
  // NOT NOW BUTTON
  // ==========================================
  const handleNotNow = () => {
    setShowPrompt(false);

    localStorage.setItem(
      "iproedge_notification_dismissed",
      Date.now().toString(),
    );
  };

  // ==========================================
  // DON'T SHOW PROMPT
  // ==========================================
  if (!showPrompt) {
    return null;
  }

  // ==========================================
  // NOTIFICATION PROMPT
  // ==========================================
  return (
    <div className="notification-prompt-overlay">
      <div className="notification-prompt">
        <button className="notification-prompt-close" onClick={handleNotNow}>
          ×
        </button>

        <div className="notification-prompt-icon">🔔</div>

        <h3>Stay updated with iProEdge</h3>

        <p>
          Get notified about new products, price drops, special offers and
          important updates.
        </p>

        <button
          className="notification-allow-btn"
          onClick={handleAllowNotifications}
        >
          Allow Notifications
        </button>

        <button className="notification-later-btn" onClick={handleNotNow}>
          Not now
        </button>
      </div>
    </div>
  );
}

export default NotificationSetup;
