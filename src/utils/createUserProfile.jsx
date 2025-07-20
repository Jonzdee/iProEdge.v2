import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createUserProfile(uid, userData) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const referralCode = `IPRO${uid.substring(0, 6)}`;

    // ✅ Create the user profile in `/users/{uid}`
    await setDoc(userRef, {
      ...userData,
      referralCode: `IPRO${uid.substring(0, 6)}`,
      referredBy: userData.referredBy || null, // now a UID
      walletBalance: 0,
      createdAt: new Date(),
    });
    // ✅ Also create public referralCode mapping in `/referralCodes/{referralCode}`
    const referralRef = doc(db, "referralCodes", referralCode);
    await setDoc(referralRef, {
      ownerUid: uid,
      createdAt: new Date(),
    });

    console.log(
      "✅ User profile created with referral code:",
      referralCode,
      "referredBy:",
      userData.referredBy
    );
  } else {
    console.log("ℹ️ User profile already exists");
  }
}
