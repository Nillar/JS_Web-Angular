const encryption = require('../util/encryption');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const User = require('mongoose').model('User');
const passport = require('passport');
const authValidation = require('./../util/authValidation');

module.exports = {
    registerPost: (req, res, next) => {
        const validationResult = authValidation.validateSignupForm(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        return passport.authenticate('local-signup', (err, token, userData) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: false,
                    message: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'You have successfully registered',
                token,
                user: userData
            })
        })(req, res, next)
    },
    loginPost: (req, res, next) => {
        const validationResult = authValidation.validateLoginForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                console.log(err);

                return res.status(200).json({
                    success: false,
                    message: err.message
                })

            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            })
        })(req, res, next)
    },
    logoutGet: (req, res) => {
        req.logout();

        return res.status(200).json({
            success: true,
            message: 'You have successfully logged out'
        })
    },
    getCurrentUser: (req, res) => {
        let userId = req.params.id;
        User.findOne({resetPasswordToken: userId}).then(user => {
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                user
            })
        }).catch(err => {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        })
    },
    getCurrentUserByUsername: (req, res) => {
        let username = req.params.username.toString();
        User.findOne({username: username}).then(user => {
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                user
            })
        }).catch(err => {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        })
    },
    forgottenPassword: (req, res) => {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, (err, buf) => {
                    let token = buf.toString('hex');
                    done(err, token);
                })
            },
            function (token, done) {
                User.findOne({email: req.body.email}).then(user => {
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            message: 'No account with that email address exists.'
                        })
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; //60 min in milliseconds

                    user.save(function (err) {
                        done(err, token, user);
                    });
                })
            },

            function (token, user, done) {
                let smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.EMAIl,
                        pass: process.env.PASSWORD
                    }
                });

                let mailOptions = {
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + 'localhost:4200' + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };

                smtpTransport.sendMail(mailOptions, (err) => {
                    done(err, 'done');
                    res.json({
                        success: true,
                        message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
                    })
                })
            }
        ], function (err) {
            if (err) {
                console.log(err);
                return;
            }
        })
    },
    resetPassword: (req, res) => {
        let token = req.body.token;

        async.waterfall([
            function (done) {
                User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}})
                    .then(user => {
                        console.log(user);
                        if (!user) {
                            return res.json({
                                success: false,
                                message: 'Password reset token is invalid or expired.'
                            });
                        }

                        let validatedPass = passwordValidation(req.body.password, req.body.repeatPass);

                        if (validatedPass.success) {
                            let newSalt = encryption.generateSalt();
                            let newHashedPass = encryption.generateHashedPassword(newSalt, req.body.password).trim();

                            user.hashedPass = newHashedPass;
                            user.repeatPass = newHashedPass;
                            user.salt = newSalt;
                            user.resetPasswordExpires = undefined;
                            user.resetPasswordToken = undefined;

                            user.save(function (err) {
                                done(err, user);
                                res.json({
                                    success: true,
                                    message: 'Password has been change successfully.'
                                })
                            });
                        } else {
                            res.json({
                                success: false,
                                message: 'Invalid input'
                            })
                        }
                    })
            }, function (user, done) {
                let smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                let mailOptions = {
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: 'Changed password',
                    text: 'This is a confirmation email that your password for your account ' + user.email + ' has been changed.\n'
                };

                smtpTransport.sendMail(mailOptions, (err) => {
                    done(err, 'done');
                    res.json({
                        success: true,
                        message: 'Mail has been sent.'
                    })
                })
            }
        ], function (err) {
            if (err) {
                console.log(err);
                return;
            }
        })
    }
};

function passwordValidation(password, repeatPassword) {
    let success = true;
    let message = '';

    if (password.length < 4) {
        success = false;
        message = 'Passowrd must be at least 4 characters long!'
    }

    if (password !== repeatPassword) {
        success = false;
        message = 'Passowrds must match!'
    }

    return {
        success,
        message
    }
}