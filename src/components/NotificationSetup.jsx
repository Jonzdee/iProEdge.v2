import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { requestNotificationPermission, listenForMessages } from "../messaging";

function NotificationSetup() {
  const { user } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Browser doesn't support notifications
    if (!("Notification" in window)) {
      return;
    }

    // Customer already made a notification decision
    if (Notification.permission !== "default") {
      return;
    }


    const dismissedAt = localStorage.getItem("iproedge_notification_dismissed");

    if (dismissedAt) {
      const daysSinceDismissed =
        (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);

      // Wait 7 days before showing the popup again
      if (daysSinceDismissed < 7) {
        return;
      }
    }
    // Wait 3 seconds before showing our popup
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = listenForMessages((payload) => {
      console.log("New iProEdge notification:", payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAllowNotifications = async () => {
    setShowPrompt(false);

    const token = await requestNotificationPermission();

    if (!token) {
      return;
    }

    try {
      if (user) {
        // Logged-in customer
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

        console.log("FCM token saved to customer account");
      } else {
        // Guest customer
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

const handleNotNow = () => {
  setShowPrompt(false);

  localStorage.setItem(
    "iproedge_notification_dismissed",
    Date.now().toString(),
  );
};

  if (!showPrompt) {
    return null;
  }

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
