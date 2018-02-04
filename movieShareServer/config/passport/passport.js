const passport = require('passport');
const localSignupStrategy = require('./local-signup');
const localLoginStrategy = require('./local-login');

module.exports = function() {
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
};