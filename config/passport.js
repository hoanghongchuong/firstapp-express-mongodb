var passport = require('passport');
var bcrypt = require('bcrypt');
var hash  = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
// var User = require('../app/models/user');
import User from '../app/models/user'
module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });   

    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
        function(req,email, password, done) {            
            User.findOne({email: email}).then((user) => {
                if(!user){
                    return done(null, false, 'email khong chinh xac');
                }
                if (!hash.verify(password, user.password)) {
                    return done(null, 'failed');
                }                
                return done(null, user);                
            });
        }
    )); 

};