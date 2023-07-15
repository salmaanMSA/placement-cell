const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


// authentication using passport js
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find the user and establish the identity
        User.findOne({email: email}).then(function(user){
            if(!user || user.password != password){
                req.flash('error', 'Invalid Email | Password');
                return done(null, false);
            }
            return done(null, user);
        }).catch(function(err){
            req.flash('error', "Error in finding the user ---> passport");
            return done(err);
        });
    }
));


// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserialize the user id from the cookie
passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        if (user){
            return done(null, user);
        }
        
    }).catch(function(err){
        console.log("Error in finding the user ---> passport")
        return done(err);
    });
});


//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signIn');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


// export module
module.exports = passport;
