var passport = require('passport');
var bcrypt = require('bcrypt');
var hash = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
import User from '../app/models/user'
import Member from '../app/models/member'
module.exports = function(passport) {

    passport.serializeUser(function(data, done) {
        done(null, data);
    });

    passport.deserializeUser(function(data, done) {
        if (data.role == 'admin') {
            User.findById(data.user._id, function(err, member) {
                done(err, {
                    admin: member
                });
            })
        }
        if (data.role == 'customer') {
            Member.findById(data.user._id, function(err, member) {
                done(err, {
                    customer: member
                });
            })
        }
    });

    // admin login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        // role: 1,
        passReqToCallback: true
    }, function(email, password, done) {
        User.findOne({
            email: email
        }).then((user) => {
            if (!user) {
                return done(null, false, 'email khong chinh xac');
            }
            if (!hash.verify(password, user.password)) {
                return done(null, 'failed');
            }
            return done(null, {
                role: 'admin',
                user: user
            });
        });
    }));

    // customer login
    passport.use('customer', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        Member.findOne({
            email: email
        }, function(err, member) {
            if (err) return done(err);
            if (!member) {
                return done(null, false, {
                    message: 'This email is not registered.'
                });
            }
            if (member.password != password) {
                return done(null, false, {
                    message: 'This password is not correct.'
                });
            }
            return done(null, {
                role: 'customer',
                user: member
            });
        });
    }));
};