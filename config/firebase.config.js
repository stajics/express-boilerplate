const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const config = require('./index');

const serviceAccount = require(`./${config.FIREBASE_SERVICE_ACCOUNT_FILENAME}`); // eslint-disable-line

const projectId = config.FIREBASE_PROJECT_ID;
const googleStorage = new Storage({
  projectId,
  keyFilename: `./config/${config.FIREBASE_SERVICE_ACCOUNT_FILENAME}`,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_FIREBASE_URI,
});

module.exports = {
  firebaseAdmin: admin,
  firebaseAuth: admin.auth(),
  firebaseDb: admin.database(),
  googleStorage,
};
