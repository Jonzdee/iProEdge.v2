// src/utils/createUserProfile.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createUserProfile(uid, userData) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  // Only create the profile if it doesn't exist yet
  if (!snap.exists()) {
    const referralCode = `IPRO${uid.substring(0, 6)}`;
    await setDoc(userRef, {
      ...userData,
      referralCode,
        referredBy: referredBy || null, // update later if they used a referral
        createdAt: new Date(),
    });
    console.log("✅ User profile created with referral code:", referralCode);
  } else {
    console.log("ℹ️ User profile already exists");
  }
}
