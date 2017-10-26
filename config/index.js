const dotenv = require('dotenv');

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
} else {
  throw new Error('NODE_ENV must be defined');
}

module.exports.HOST = process.env.HOST;
module.exports.PORT = process.env.PORT;
module.exports.PROTOCOL = process.env.SSL === true ? 'https' : 'http';

module.exports.LOG_LEVEL = process.env.LOG_LEVEL;
module.exports.LOGGLY_TOKEN = process.env.LOGGLY_TOKEN;
module.exports.LOGGLY_SUBDOMAIN = process.env.LOGGLY_SUBDOMAIN;

module.exports.APP_NAME = process.env.APP_NAME;
module.exports.MONGODB_URI = process.env.DB_MONGODB_URI;

module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
module.exports.JWT_PASSWORD_RESET_SECRET_KEY = process.env.JWT_PASSWORD_RESET_SECRET_KEY;

module.exports.VALID_ATTACHMENT_MODELS = ['Comment', 'Discussion', 'File', 'Document', 'Message', 'SubTask', 'Task', 'Milestone', 'Share'];
module.exports.VALID_FILE_ASSOCIATION_MODELS = ['User', 'Project', 'Comment', 'Discussion', 'File', 'Document', 'Message', 'SubTask', 'Task', 'Milestone', 'Share'];
