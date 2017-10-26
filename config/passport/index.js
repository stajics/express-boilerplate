const passport = require('passport');

const localLoginStrategy = require('./localLoginStrategy.passport');

passport.use('local-login', localLoginStrategy);
