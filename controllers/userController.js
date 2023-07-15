const User = require("../models/user");


// render the signup page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('userSignUp', {title : "Placement Cell | SignUp"});
}

// render the signin page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('userSignIn', {title : "Placement Cell | SignIn"});
}

// create a user profile
module.exports.createUser = async function(req, res){
    // get input details
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let confirmPassword = req.body.repeatpswd;
    
    // check if user with same email already exists
    let isUserExists = await User.findOne({email: email});
    if (isUserExists){
        return res.redirect('/users/signIn'); // if exists, then redirect to signIn page
    }
    else if (password != confirmPassword){
        return res.redirect('back'); // if password deoesnot match with confirm password, redirect to same page
    }
    else{
        // create new user to db
        let addUser = await User.create({name: name, email: email, password: password});
        if (addUser){
            return res.redirect('/users/signIn'); // redirect to signIN page
        }
        else{
            return res.redirect('back');
        }
    }
}

// create session using passport js authentication
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}


module.exports.signOut = function(req, res){
    req.flash('success', 'Logged Out Successfully');
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/users/signIn');
    });
}

// render profile page with user details
module.exports.profile = function(req, res){
    if (req.isAuthenticated()){
        return res.render('profile', {title: "UserProfile", profileUser: req.user});
    }
    else{
        return res.redirect('/users/signIn');
    }
}

// update user profile
module.exports.updateProfile = async function(req, res){
    if(req.isAuthenticated()){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err){
                    console.log('MulterError', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){
                    if (user.avatar){
                        if (fs.existsSync(__dirname + '..' + user.avatar)){
                            fs.unlinkSync(__dirname + '..' + user.avatar);
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        return res.redirect('users/signIn');
    }
}