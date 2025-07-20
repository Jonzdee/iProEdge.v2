import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function createUserProfile(uid, userData) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const referralCode = `IPRO${uid.substring(0, 6)}`;

    // ✅ Create the user profile
    await setDoc(userRef, {
      ...userData,
      referralCode,
      walletBalance: 0,
      createdAt: serverTimestamp(),
    });

    // ✅ ALSO create a safe public record for referral lookup
    const referralRef = doc(db, "referralCodes", referralCode);
    await setDoc(referralRef, {
      ownerUid: uid,
      createdAt: serverTimestamp(),
    });

    console.log("✅ User profile created with referral code:", referralCode);
  } else {
    console.log("ℹ️ User profile already exists");
  }
}
