const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//connect to the db
const db = require("../models");

passport.use(new LocalStrategy(
    function (email, password, done) {
        db.User.findOne({ email: email }).select('_id email +password')
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Email address not found.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password for that email.' });
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));

module.exports = passport;