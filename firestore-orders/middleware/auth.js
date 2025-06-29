const {admin} = require("../firebase"); // Do NOT call initializeApp again!

async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}

function requireAdmin(req, res, next) {
  // Adjust your admin logic as needed
  if (req.user?.admin || req.user?.email === "ogunyankinjohnson@email.com") return next();
  return res.status(403).json({ error: "Admin only" });
}

module.exports = { authenticate, requireAdmin };