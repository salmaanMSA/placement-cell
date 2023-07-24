const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// create new google strategy for oauth2 authentication
passport.use(new googleStrategy({
    // google credentials
        clientID: "759440711652-stoud97ik1b44jmjpq4hcv6ukmobusrf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).then(function(user){

            if (user){
                return done(null, user); // if user, then redirect to dahsboard
            }
            else{
                // create new user from the mail id
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') // generate password using crypto
                }).then(function(user){
                    if (user){
                        return done(null, user);
                    }
                }).catch(function(err){
                    console.log("Error creating a user, google passport strategy", err);
                    return;
                })
            }
        }).catch(function(err){
            console.log("Error in google strategy passport", err);
            return;
        });
    }
    
));

module.exports = passport;