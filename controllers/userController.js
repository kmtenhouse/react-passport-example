//using bcrypt for hashing
const bcrypt = require("bcryptjs");

//Require our user model
const User = require("../models/user");

module.exports = {
    findAll: async function (req, res) {
        try {
            const results = await User.find({});
            res.status(200).json(results);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    findById: async function (req, res) {
        try {
            const result = await User.findById(req.params.id);
            if (!result) {
                return res.sendStatus(404); //we didn't actually find anybody!
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    create: async function (req, res) {
        try {
            //create a new user!
            //BUT FIRST!  validation (8
            const { email, password } = req.body;
            if (typeof email !== "string" || email === "") {
                return res.status(400).json({ error: "Must provide an email address!" });
            }

            if (typeof password !== "string" || password.length < 8 || password.length > 64) {
                return res.status(400).json({ error: "Must provide a password (8-64 characters)!" });
            }

            //Now that we have valid input, we have to protect our password
            //(Note: this work can also live in the user schema; it is shown here so that we can trace what's going on)
            const salt = await bcrypt.genSalt(10);
            const saltedAndHashedPwd = await bcrypt.hash(password, salt);

            //Finally, we create the new user:
            const newUser = await User.create({ email: email, password: saltedAndHashedPwd });
            
            //And now, we log them in!
            req.login(newUser, err => {
                if(err) { throw err };
                res.json(req.user); 
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};