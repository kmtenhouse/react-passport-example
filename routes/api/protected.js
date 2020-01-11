const router = require("express").Router();

// Matches with "/api/protected"
router.route("/")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            return res.json({ message: "Welcome to our secret clubhouse" });
        }
        res.sendStatus(401);
    });

module.exports = router;