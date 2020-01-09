const db = require("../models/index");

module.exports = {
    findAll: function (req, res) {
        db.User.find({})
            .then(results => res.status(200).json(results))
            .catch(err => res.status(500).json(err));
    },
    findById: function (req, res) {
        db.User.findById(req.params.id)
            .then(result => {
                if(!result) {
                    return res.sendStatus(404); //we didn't actually find anybody!
                }
                return res.status(200).json(result); //otherwise, send the person
            })
            .catch(err => res.status(500).json(err));
    }
};