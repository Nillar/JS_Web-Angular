const User = require('./../../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('./../../util/encryption');
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, password).trim();
    const hashedRepeatPass = encryption.generateHashedPassword(salt,password).trim();
    const user = {
        username: username.trim(),
        email: req.body.email.trim(),
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        hashedPass: hashedPass,
        repeatPass: hashedRepeatPass,
        likedPosts: [],
        salt
    };

    User.create(user)
        .then((user) => {
            const payload = {
                sub: user._id
            };

            const token = jwt.sign(payload, process.env.SECRET_STRING);
            const data = {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                friendsArr: user.friendsArr,
                userId: user._id,
                likedPosts: [],
                isAdmin: user.isAdmin
            };
            return done(null, token, data);
        })
        .catch(err => {
            if (err['message'].includes('email')) {
                return done('Email already exist!');
            }

            if (err['message'].includes('username')) {
                return done('Userame already exist!');
            }

        })
})