const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');


router.get('/signUp', userController.signUp); // render signup page
router.get('/signIn', userController.signIn); // render signin page
router.post('/create_user', userController.createUser); // creating a new user

// create session router for passport js authentication
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'} 
),userController.createSession);

// google oauth2 routes
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate(
    'google', {failureRedirect: '/users/SignIn'}), userController.createSession);

router.get('/signOut', userController.signOut); // signout user
router.get('/profile', userController.profile); // render user profile page
router.post('/update/:id', userController.updateProfile); // update user profile


module.exports = router;