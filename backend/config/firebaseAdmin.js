const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

// ✅ Load Firebase Admin Credentials
const serviceAccount = require("./firebaseConfig.json"); // Ensure the correct path

// ✅ Initialize Firebase Admin SDK (for backend operations)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "echolingo-b8e02.appspot.com", // ✅ Replace with your actual Firebase Storage bucket
  });
}

// ✅ Get Firebase Storage Bucket
const bucket = getStorage().bucket();

module.exports = { admin, bucket };