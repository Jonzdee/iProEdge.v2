const express = require('express');
const { db, admin } = require('./firebase');
const nodemailer = require('nodemailer');
const { authenticate, requireAdmin } = require('./middleware/auth');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Nodemailer transporter (use environment variables in production)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.MAIL_USER || 'ogunyankinjohnson@gmail.com',
    pass: process.env.MAIL_PASS || 'weas ermr somi wjli',
  },
});

function orderConfirmationHtml(order, orderId) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f6f9fc" style="padding:32px 0;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius:12px; box-shadow:0 3px 12px rgba(0,0,0,0.07); font-family:Arial,sans-serif; color:#333;">
          <tr>
            <td align="center" style="padding:36px 30px 24px 30px;">
              <h2 style="font-weight:bold; color:#0f3460; margin-bottom:10px;">Thank you for your order, ${order.userName}!</h2>
              <p style="font-size:1.08rem; color:#444;">We have received your order and are processing it.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f6f9fc" style="border-radius:8px;">
                <tr>
                  <td style="padding:18px 16px 10px 16px;">
                    <p style="margin:4px 0;"><strong>Order ID:</strong> <span style="color:#06a;">${orderId}</span></p>
                    <p style="margin:4px 0;"><strong>Order Total:</strong> ₦${order.orderTotal}</p>
                    <p style="margin:4px 0;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    <p style="margin:4px 0;"><strong>Delivery Type:</strong> ${
                      order.deliveryType === "door"
                        ? "Doorstep Delivery"
                        : `Pickup at ${order.pickupStation || "N/A"}`
                    }</p>
                    <p style="margin:4px 0;"><strong>Delivery Address:</strong> ${order.address || "N/A"}</p>
                    ${order.promo ? `<p style="margin:4px 0;"><strong>Promo Applied:</strong> -₦${order.promo}</p>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px;">
              <h3 style="font-size:1.13rem; color:#0f3460; margin-bottom:8px;">Your Items</h3>
              <ul style="padding-left:20px; margin:0 0 18px 0; color:#222;">
                ${
                  Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map(item =>
                        `<li style="margin-bottom:6px;">
                          <span style="font-weight:500;">${item.name || item.productName}</span>
                          <span style="color:#888;"> (x${item.qty || item.quantity || 1})</span>
                        </li>`
                      ).join('')
                    : '<li>No items found in this order.</li>'
                }
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px 30px 30px;">
              <p style="color:#444; font-size:1.05rem; margin:18px 0 8px 0;">
                We sincerely appreciate your trust in <strong>iProEdge</strong>. Your satisfaction is our top priority, and we are dedicated to providing you with the best service possible.
              </p>
              <p style="color:#888; font-size:0.99rem; margin:0;">
                If you have any questions, simply reply to this email or contact our support team.
              </p>
              <p style="margin:24px 0 0 0; font-weight:600; color:#0f3460;">
                Thank you for choosing <span style="color:#800080;">iProEdge</span>!
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 30px 32px 30px; color:#aaa; font-size:13px;">
              &copy; ${new Date().getFullYear()} iProEdge. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

function adminOrderNotificationHtml(order, orderId) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f6f9fc" style="padding:32px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.07); font-family:Arial,sans-serif; color:#222;">
          <tr>
            <td align="center" style="padding:34px 28px 18px 28px;">
              <h2 style="font-weight:700; color:#0f3460; margin-bottom:10px;">New Order Placed</h2>
              <p style="color:#555; font-size:1rem;">You have received a new order on IprEdge.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f6f9fc" style="border-radius:8px;">
                <tr>
                  <td style="padding:15px 14px 10px 14px;">
                    <p style="margin:4px 0;"><strong>Order ID:</strong> <span style="color:#06a;">${orderId}</span></p>
                    <p style="margin:4px 0;"><strong>Order Total:</strong> ₦${order.orderTotal}</p>
                    <p style="margin:4px 0;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    <p style="margin:4px 0;"><strong>Delivery Type:</strong> ${
                      order.deliveryType === "door"
                        ? "Doorstep Delivery"
                        : `Pickup at ${order.pickupStation || "N/A"}`
                    }</p>
                    <p style="margin:4px 0;"><strong>Delivery Address:</strong> ${order.address || "N/A"}</p>
                    ${order.promo ? `<p style="margin:4px 0;"><strong>Promo Applied:</strong> -₦${order.promo}</p>` : ""}
                  </td>
                </tr>
              </table>
              <div style="margin:10px 0 8px 0;">
                <strong>Customer:</strong> ${order.userName} (${order.userEmail})
              </div>
              <h4 style="font-size:1.08rem; color:#0f3460; margin-bottom:6px;">Items Ordered</h4>
              <ul style="padding-left:20px; margin:0 0 14px 0; color:#222; font-size:0.97rem;">
                ${
                  Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map(item =>
                        `<li style="margin-bottom:5px;">
                          <span style="font-weight:500;">${item.name || item.productName}</span>
                          <span style="color:#888;"> (x${item.qty || item.quantity || 1})</span>
                        </li>`
                      ).join('')
                    : '<li>No items found in this order.</li>'
                }
              </ul>
              <div style="color:#888; font-size:0.95rem; margin-top:18px;">
                Login to your dashboard for full details.
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 28px 24px 28px; color:#aaa; font-size:13px;">
              &copy; ${new Date().getFullYear()} IprEdge. Admin Notification.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}


function actionEmailHtml(order, orderId, type) {
  const actionTxt = type === "cancelRequested" ? "Order Cancellation Requested" : "Order Return Requested";
  const reasonTxt = type === "cancelRequested"
    ? "Your order cancellation request has been received and is being processed."
    : "Your order return request has been received and is being processed.";
  return `
    <div style="font-family: Arial, sans-serif; color:#333;">
      <h2 style="color:#0f3460;">${actionTxt}</h2>
      <p>Hi ${order.userName || "Customer"},</p>
      <p>${reasonTxt}</p>
      <ul>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Order Total:</strong> ₦${order.orderTotal}</li>
      </ul>
      <p>We will contact you for further steps. If you have questions, reply to this email or contact support.</p>
      <p style="color:#888;">Thank you for choosing <strong>iProEdge</strong>.</p>
    </div>
  `;
}
function actionAdminHtml(order, orderId, type) {
  const actionTxt = type === "cancelRequested" ? "Order Cancellation Requested" : "Order Return Requested";
  return `
    <div style="font-family: Arial, sans-serif; color:#333;">
      <h2 style="color:#0f3460;">[ADMIN] ${actionTxt}</h2>
      <p>User <strong>${order.userName || "User"}</strong> (${order.userEmail}) has requested to <strong>${type === "cancelRequested" ? "cancel" : "return"}</strong> order <b>${orderId}</b>.</p>
      <ul>
        <li><strong>Order Total:</strong> ₦${order.orderTotal}</li>
      </ul>
      <p>Check your dashboard for full details.</p>
    </div>
  `;
}

// API: Create new order (user must be authenticated)
// Update to prevent duplicate orders using clientOrderId
app.post('/order', authenticate, async (req, res) => {
  console.log('[POST /order] Raw incoming body:', req.body);
  console.log('[POST /order] Request received');
  const order = req.body;

  // Deduplication: Require clientOrderId from frontend (should be a UUID or unique hash)
  const clientOrderId = order.clientOrderId;
  if (!clientOrderId) {
    return res.status(400).json({ success: false, error: "Missing clientOrderId" });
  }

  order.items = order.items || order.cartItems || order.orderItems || [];

  try {
    // Attach authenticated user info for security
    order.userId = req.user.uid;
    order.userEmail = req.user.email;

    // Check for duplicate order by clientOrderId and userId
    const existing = await db.collection('orders')
      .where('userId', '==', req.user.uid)
      .where('clientOrderId', '==', clientOrderId)
      .limit(1)
      .get();

    if (!existing.empty) {
      // Duplicate found, return existing order ID
      const doc = existing.docs[0];
      console.log(`[POST /order] Duplicate order detected for clientOrderId ${clientOrderId}, returning existing order ${doc.id}`);
      return res.status(200).json({ success: true, orderId: doc.id });
    }

    // Add log for received data
    console.log('[POST /order] Order data:', order);

    // Save to Firestore (with clientOrderId)
    const docRef = await db.collection('orders').add({
      ...order,
      clientOrderId,
      timestamp: admin.firestore.Timestamp.now(),
    });

    console.log(`[POST /order] Order saved with ID: ${docRef.id}`);

    // Prepare customer email
    const mailOptions = {
      from: process.env.MAIL_USER || 'ogunyankinjohnson@gmail.com',
      to: order.userEmail,
      subject: 'Order Confirmation',
      text: `Hello ${order.userName},

Thank you so much for your order with iProEdge!

Order ID: ${docRef.id}
Order Total: ₦${order.orderTotal}
Payment Method: ${order.paymentMethod}
Delivery Type: ${order.deliveryType === "door" ? "Doorstep Delivery" : `Pickup at ${order.pickupStation || "N/A"}`}
Delivery Address: ${order.address || "N/A"}
${order.promo ? `Promo Applied: -₦${order.promo}` : ""}
We truly appreciate your trust in iProEdge. Your satisfaction is our highest priority, and we are committed to providing you with the best experience possible.

If you have any questions, simply reply to this email or contact our support team.

Thank you for choosing iProEdge!

Best regards,
The iProEdge Team
`,
      html: orderConfirmationHtml(order, docRef.id),
    };

    // Send confirmation email (does not block response)
    transporter.sendMail(mailOptions)
      .then(() => console.log(`[POST /order] Confirmation email sent to ${order.userEmail}`))
      .catch(e => console.log(`[POST /order] Email failed: ${e.message}`));

    // Prepare admin HTML notification
    const adminMailOptions = {
      from: process.env.MAIL_USER || 'ogunyankinjohnson@gmail.com',
      to: process.env.ADMIN_EMAIL || 'ogunyankinjohnson@gmail.com',
      subject: 'New Order Placed',
      text: `Hello Admin,

A new order (ID: ${docRef.id}) has been placed on iProEdge by ${order.userName} (${order.userEmail}).

Order Total: ₦${order.orderTotal}
Payment Method: ${order.paymentMethod}
Delivery Type: ${order.deliveryType === "door" ? "Doorstep Delivery" : `Pickup at ${order.pickupStation || "N/A"}`}
Delivery Address: ${order.address || "N/A"}
${order.promo ? `Promo Applied: -₦${order.promo}` : ""}
Please log in to your dashboard for full details.

Thank you for your continued support of iProEdge!

Best regards,
The iProEdge System
`,
      html: adminOrderNotificationHtml(order, docRef.id),
    };
    transporter.sendMail(adminMailOptions)
      .then(() => console.log('[POST /order] Admin email sent'))
      .catch(e => console.log('[POST /order] Admin email failed:', e.message));

    res.status(201).json({ success: true, orderId: docRef.id });

  } catch (error) {
    console.error(`[POST /order] Error creating order:`, error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

// API: Get order by ID (user must own order or be admin)
app.get('/order/:id', authenticate, async (req, res) => {
  try {
    const doc = await db.collection('orders').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    const order = { id: doc.id, ...doc.data() };
    if (order.userId !== req.user.uid && !req.user.admin) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error(`[GET /order/:id] Error fetching order:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: List all orders (user only sees own orders, admin sees all)
app.get('/orders', authenticate, async (req, res) => {
  const { userEmail, status } = req.query;
  try {
    let query = db.collection('orders');
    if (!req.user.admin) {
      query = query.where('userId', '==', req.user.uid);
    } else if (userEmail) {
      query = query.where('userEmail', '==', userEmail);
    }
    if (status) {
      query = query.where('status', '==', status);
    }
    const snapshot = await query.orderBy('timestamp', 'desc').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, orders });
  } catch (error) {
    console.error(`[GET /orders] Error fetching orders:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Update order status (only owner or admin can update)
// API: Update order status (only owner or admin can update)
app.patch('/order/:id', authenticate, async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ success: false, error: 'Missing status' });
  try {
    const orderDoc = db.collection('orders').doc(req.params.id);
    const doc = await orderDoc.get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    const order = doc.data();
    if (order.userId !== req.user.uid && !req.user.admin) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    // Status history logic
    const newHistoryEntry = { status, timestamp: Date.now() };
    const prevHistory = order.statusHistory || [];
    if (!prevHistory.length || prevHistory[prevHistory.length - 1].status !== status) {
      prevHistory.push(newHistoryEntry);
    }

    await orderDoc.update({ status, statusHistory: prevHistory });
    console.log(`[PATCH /order/:id] Order ${req.params.id} status updated to ${status}`);

    // --- EMAIL NOTIFICATION for cancel/return ---
    if (status === "cancelRequested" || status === "returnRequested") {
      const adminEmail = process.env.ADMIN_EMAIL || "ogunyankinjohnson@gmail.com";
      // User email
      const mailOptionsUser = {
        from: process.env.MAIL_USER || 'ogunyankinjohnson@gmail.com',
        to: order.userEmail,
        subject: status === "cancelRequested" ? "Order Cancellation Requested" : "Order Return Requested",
        text:
          status === "cancelRequested"
            ? `Hello ${order.userName},\n\nYour order cancellation request has been received and is being processed.\nOrder ID: ${req.params.id}\nOrder Total: ₦${order.orderTotal}\n\nWe will process your request promptly.\n\nThank you for choosing iProEdge!`
            : `Hello ${order.userName},\n\nYour return request has been received and is being processed.\nOrder ID: ${req.params.id}\nOrder Total: ₦${order.orderTotal}\n\nWe will contact you for the next steps.\n\nThank you for choosing iProEdge!`,
        html: actionEmailHtml(order, req.params.id, status),
      };
      // Admin email
      const mailOptionsAdmin = {
        from: process.env.MAIL_USER || 'ogunyankinjohnson@gmail.com',
        to: adminEmail,
        subject: status === "cancelRequested" ? "[ADMIN] Order Cancellation Requested" : "[ADMIN] Order Return Requested",
        text:
          status === "cancelRequested"
            ? `Admin,\n\n${order.userName || 'A user'} (${order.userEmail}) has requested to cancel their order.\nOrder ID: ${req.params.id}\nOrder Total: ₦${order.orderTotal}\n\nCheck your dashboard for more info.`
            : `Admin,\n\n${order.userName || 'A user'} (${order.userEmail}) has requested to return their order.\nOrder ID: ${req.params.id}\nOrder Total: ₦${order.orderTotal}\n\nCheck your dashboard for more info.`,
        html: actionAdminHtml(order, req.params.id, status),
      };

      // Send both emails in background
      Promise.all([
        transporter.sendMail(mailOptionsUser).catch(e => console.log(`[PATCH /order/:id] User cancel/return email failed:`, e.message)),
        transporter.sendMail(mailOptionsAdmin).catch(e => console.log(`[PATCH /order/:id] Admin cancel/return email failed:`, e.message)),
      ]);
    }

    res.json({ success: true });
  } catch (error) {
    console.error(`[PATCH /order/:id] Error updating order:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// API: Admin endpoint to list ALL orders with filtering (admin only)
app.get('/admin/orders', authenticate, requireAdmin, async (req, res) => {
  const { userEmail, status } = req.query;
  try {
    let query = db.collection('orders');
    if (userEmail) {
      query = query.where('userEmail', '==', userEmail);
    }
    if (status) {
      query = query.where('status', '==', status);
    }
    const snapshot = await query.orderBy('timestamp', 'desc').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, orders });
  } catch (error) {
    console.error(`[GET /admin/orders] Error fetching admin orders:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});