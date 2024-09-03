// // firebaseConfig.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./beni-media-storage-firebase-adminsdk-5vwio-a96567ab4f.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'beni-media-storage.appspot.com',
// });

// const bucket = admin.storage().bucket();

// module.exports = { bucket };


require('dotenv').config();
const admin = require('firebase-admin');

// Retrieve environment variables
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newlines in private key
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'beni-media-storage.appspot.com',
});

// Your Firebase code here


const bucket = admin.storage().bucket();

module.exports = { bucket };
