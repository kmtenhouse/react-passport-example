const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//grab our database user scheme
const User = require("../models/user");

//using bcrypt for hashing
const bcrypt = require("bcryptjs");

passport.use('local', new LocalStrategy(  // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email }).select('_id email +password');
            if (!user) { //if we didn't get any results, the person is not in our db!  we should not keep going
                return done(null, false, { message: 'Email address not found.' });
            }

            //otherwise, we wait to see if the password is valid:
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }
));

// Set up serialization
// This controls how the db will look up users
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const currentUser = await User.findById(id);
        done(null, currentUser);
    } catch (err) {
        done(err, false);
    }
});

module.exports = passport;