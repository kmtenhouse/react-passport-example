const router = require("express").Router();

//Require our configured passport
const passport = require("../../config/passport");

// Login Route
// Matches with "/auth/login"

router
    .route("/login")
    .post(passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    });

// Logout Route
// Matches with "/auth/logout"
router.route("/logout")
    .get((req, res) => {
        req.logOut(); //destroy the current login info
        res.sendStatus(200);
    });

router.route("/whoami")
    .get((req, res)=> {
        res.json(req.user || null);
    });

module.exports = router;