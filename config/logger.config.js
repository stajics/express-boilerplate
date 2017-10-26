const util = require('util');
const { Logger, transports, config } = require('winston');
const WinMid = require('express-winston-middleware');
const appConfig = require('./');

// const LogglyTransport = require('winston-loggly-transport');

module.exports.logger = new Logger({
  level: appConfig.LOG_LEVEL || 'silly',
  transports: [
    new (transports.Console)({
      colorize: true,
      name: 'console',
      timestamp: () => new Date(),
      formatter: options => `${config.colorize(options.level, options.level.toUpperCase())}: ${(options.message ? options.message : '')} ${(options.meta && Object.keys(options.meta).length ? `\n\t ${util.inspect(options.meta)}` : '')}`,
    }),
    // new LogglyTransport({
    //   token: appConfig.LOGGLY_TOKEN,
    //   subdomain: appConfig.LOGGLY_SUBDOMAIN,
    //   tags: [process.env.NODE_ENV],
    // }),
    // new (transports.File)({ filename: 'somefile.log' }),
  ],
});

module.exports.expressLogger = new WinMid.request({ // eslint-disable-line
  transports: [
    new (transports.Console)({
      level: 'error',
      colorize: true,
    }),
  ],
});
