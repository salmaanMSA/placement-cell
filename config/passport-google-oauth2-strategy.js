const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
        clientID: "759440711652-stoud97ik1b44jmjpq4hcv6ukmobusrf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).then(function(user){

            if (user){
                return done(null, user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
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