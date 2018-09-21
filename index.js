const config = require('./config');
const {
  firebaseAdmin, firebaseAuth, firebaseDb, googleStorage,
} = require('./config/firebase.config');
const { logger } = require('./config/logger.config');

global.logger = logger;

global.firebaseAdmin = firebaseAdmin;
global.firebaseAuth = firebaseAuth;
global.firebaseDb = firebaseDb;
global.googleStorage = googleStorage;

const app = require('./config/express.config');

const httpServer = require('http').createServer(app);

const port = process.env.PORT || config.PORT;

// Start server
if (require.main === module) {
  httpServer.listen(port, () => {
    logger.info(`${process.env.APP_NAME} running on port ${port}.`);
  });
}

// Expose app
module.exports.expressApp = app;
module.exports.server = httpServer;
