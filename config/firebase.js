require('dotenv').config();
const admin = require('firebase-admin');

const rawCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS; // This will help you debug if the format is correct

let credentials;
try {
  credentials = JSON.parse(rawCredentials);
} catch (error) {
  throw new Error('Error parsing GOOGLE_APPLICATION_CREDENTIALS: ' + error.message);
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: 'https://aerator-33835-default-rtdb.firebaseio.com/'
});

const db = admin.firestore();

module.exports = db;
