var passport = require('passport');
var bcrypt = require('bcrypt');
var hash  = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
import User from '../app/models/user'
import Member from '../app/models/member'
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
        // role: 1,
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
                console.log(user);                                         
                return done(null, user);                
            });
        }
    )); 



    passport.deserializeUser(function(id, done) {
        Member.findById(id, function(err, user) {
            done(err, member);
        });
    });
    passport.use('comment', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
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
          return done(null, member);
        });
      }
    ));


};