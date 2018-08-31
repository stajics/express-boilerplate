const util = require('util');
const { Logger, transports, config } = require('winston');
const appConfig = require('./');

// const LogglyTransport = require('winston-loggly-transport');

const logger = new Logger({
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

if (process.env.SILENCE_ERRORS === 'true') logger.error = () => {};
module.exports.logger = logger;
