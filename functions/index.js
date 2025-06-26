const functions = require("firebase-functions");
const { setGlobalOptions } = require("firebase-functions");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

setGlobalOptions({ maxInstances: 10 });
admin.initializeApp();

// Get email/password from Firebase config (set with `firebase functions:config:set`)
const ADMIN_EMAIL = functions.config().gmail.email;
const GMAIL_EMAIL = functions.config().gmail.email;
const GMAIL_PASSWORD = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
});

exports.orderEmailTrigger = onDocumentWritten("orders/{orderId}", async (event) => {
  const before = event.data?.before?.data();
  const after = event.data?.after?.data();

  try {
    // Order Placed
    if (!before && after) {
      const userEmail = after.userEmail;
      const orderId = event.params.orderId;
      const total = after.total || "N/A";

      // Email to admin
      await transporter.sendMail({
        from: GMAIL_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Order Placed: #${orderId}`,
        text: `A new order has been placed by ${userEmail}. Order Total: ${total}`,
      });

      // Confirmation to user
      await transporter.sendMail({
        from: GMAIL_EMAIL,
        to: userEmail,
        subject: "Order Confirmation",
        text: `Thank you for your order! Your order ID is ${orderId} and total is ${total}.`,
      });
    }

    // Order Status Changed
    if (before && after && before.status !== after.status) {
      const userEmail = after.userEmail;
      const orderId = event.params.orderId;

      if (after.status === "canceled") {
        // Notify admin
        await transporter.sendMail({
          from: GMAIL_EMAIL,
          to: ADMIN_EMAIL,
          subject: `Order Canceled: #${orderId}`,
          text: `User ${userEmail} canceled order. Order #${orderId} has been canceled.`,
        });

        // Notify user
        await transporter.sendMail({
          from: GMAIL_EMAIL,
          to: userEmail,
          subject: "Your Order Was Canceled",
          text: `Your order #${orderId} was canceled as requested.`,
        });
      }

      if (after.status === "return_requested") {
        // Notify admin
        await transporter.sendMail({
          from: GMAIL_EMAIL,
          to: ADMIN_EMAIL,
          subject: `Return Requested: #${orderId}`,
          text: `User ${userEmail} requested a return. Return requested for order #${orderId}.`,
        });

        // Notify user
        await transporter.sendMail({
          from: GMAIL_EMAIL,
          to: userEmail,
          subject: "Return Request Received",
          text: `We have received your return request for order #${orderId}.`,
        });
      }
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
});